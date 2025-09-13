import { promises as fs } from "fs"
import path from "path"
import type { Fixture, LeaderboardEntry, Score, Team } from "./types"
import { POINTS_SYSTEM, determineOutcome } from "./points"

type JsonArray<T> = T[]

const ENV_DATA_DIR = process.env.FEST_DATA_DIR
const DATA_DIR = ENV_DATA_DIR && ENV_DATA_DIR.trim().length > 0 ? ENV_DATA_DIR : path.join(process.cwd(), "data")

const TEAMS_FILE = path.join(DATA_DIR, "teams.json")
const FIXTURES_FILE = path.join(DATA_DIR, "sports-fixtures.json")
const RESULTS_FILE = path.join(DATA_DIR, "sports-results.json")

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data) as T
  } catch (err: any) {
    if (err && (err.code === "ENOENT" || err.name === "NotFoundError")) {
      return fallback
    }
    throw err
  }
}

async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  await ensureDir(path.dirname(filePath))
  const tmpPath = `${filePath}.tmp-${Date.now()}`
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile(tmpPath, json, { encoding: "utf8" })
  await fs.rename(tmpPath, filePath)
}

export class SportsStore {
  // Teams
  static async listTeams(): Promise<JsonArray<Team>> {
    return readJson<JsonArray<Team>>(TEAMS_FILE, [])
  }

  static async getTeamById(teamId: string): Promise<Team | undefined> {
    const teams = await this.listTeams()
    return teams.find((t) => t.id === teamId)
  }

  static async upsertTeam(team: Team): Promise<Team> {
    const teams = await this.listTeams()
    const existingIndex = teams.findIndex((t) => t.id === team.id)
    if (existingIndex >= 0) {
      teams[existingIndex] = team
    } else {
      teams.push(team)
    }
    await writeJsonAtomic(TEAMS_FILE, teams)
    return team
  }

  static async deleteTeam(teamId: string): Promise<boolean> {
    const teams = await this.listTeams()
    const filtered = teams.filter((t) => t.id !== teamId)
    await writeJsonAtomic(TEAMS_FILE, filtered)
    return filtered.length !== teams.length
  }

  // Fixtures
  static async listFixtures(): Promise<JsonArray<Fixture>> {
    return readJson<JsonArray<Fixture>>(FIXTURES_FILE, [])
  }

  static async getFixtureById(id: string): Promise<Fixture | undefined> {
    const fixtures = await this.listFixtures()
    return fixtures.find((f) => f.id === id)
  }

  static async createFixture(input: Omit<Fixture, "status" | "score" | "startedAt" | "completedAt"> & { status?: Fixture["status"] }): Promise<Fixture> {
    const fixtures = await this.listFixtures()
    const fixture: Fixture = {
      ...input,
      status: input.status ?? "upcoming",
      score: input.status === "completed" ? input["score" as never] ?? { team1: 0, team2: 0 } : undefined,
    }
    fixtures.push(fixture)
    await writeJsonAtomic(FIXTURES_FILE, fixtures)
    return fixture
  }

  static async updateFixture(id: string, updates: Partial<Fixture>): Promise<Fixture | undefined> {
    const fixtures = await this.listFixtures()
    const idx = fixtures.findIndex((f) => f.id === id)
    if (idx === -1) return undefined
    const updated: Fixture = { ...fixtures[idx], ...updates }
    fixtures[idx] = updated
    await writeJsonAtomic(FIXTURES_FILE, fixtures)
    return updated
  }

  static async deleteFixture(id: string): Promise<boolean> {
    const fixtures = await this.listFixtures()
    const filtered = fixtures.filter((f) => f.id !== id)
    await writeJsonAtomic(FIXTURES_FILE, filtered)
    return filtered.length !== fixtures.length
  }

  // Match lifecycle
  static async startMatch(id: string): Promise<Fixture | undefined> {
    const fixture = await this.getFixtureById(id)
    if (!fixture) return undefined
    if (fixture.status !== "upcoming" && fixture.status !== "paused") return fixture
    const now = new Date().toISOString()
    return this.updateFixture(id, { status: "ongoing", startedAt: fixture.startedAt ?? now })
  }

  static async pauseMatch(id: string): Promise<Fixture | undefined> {
    const fixture = await this.getFixtureById(id)
    if (!fixture) return undefined
    if (fixture.status !== "ongoing") return fixture
    return this.updateFixture(id, { status: "paused" })
  }

  static async updateScore(id: string, score: Score): Promise<Fixture | undefined> {
    const fixture = await this.getFixtureById(id)
    if (!fixture) return undefined
    if (fixture.status !== "ongoing" && fixture.status !== "paused") return fixture
    return this.updateFixture(id, { score })
  }

  static async completeMatch(id: string): Promise<Fixture | undefined> {
    const fixture = await this.getFixtureById(id)
    if (!fixture) return undefined
    if (fixture.status !== "ongoing" && fixture.status !== "paused") return fixture
    const completedAt = new Date().toISOString()
    const score: Score = fixture.score ?? { team1: 0, team2: 0 }

    // Persist result snapshot
    const results = await readJson<any[]>(RESULTS_FILE, [])
    results.push({
      id,
      team1Id: fixture.team1Id,
      team2Id: fixture.team2Id,
      score,
      sport: fixture.sport,
      completedAt,
      category: fixture.category,
      venue: fixture.venue,
      scheduledAt: fixture.scheduledAt,
    })
    await writeJsonAtomic(RESULTS_FILE, results)

    return this.updateFixture(id, { status: "completed", completedAt })
  }

  static async listResults(): Promise<any[]> {
    return readJson<any[]>(RESULTS_FILE, [])
  }

  // Leaderboard
  static async computeLeaderboard(): Promise<LeaderboardEntry[]> {
    const [teams, results] = await Promise.all([this.listTeams(), this.listResults()])

    const byTeam: Record<string, LeaderboardEntry> = Object.fromEntries(
      teams.map((t) => [t.id, { teamId: t.id, teamName: t.name, points: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 }]),
    )

    for (const r of results) {
      const score: Score = r.score ?? { team1: 0, team2: 0 }
      const team1 = byTeam[r.team1Id]
      const team2 = byTeam[r.team2Id]
      if (!team1 || !team2) continue

      team1.goalsFor += score.team1
      team1.goalsAgainst += score.team2
      team1.goalDifference = team1.goalsFor - team1.goalsAgainst

      team2.goalsFor += score.team2
      team2.goalsAgainst += score.team1
      team2.goalDifference = team2.goalsFor - team2.goalsAgainst

      const outcome = determineOutcome(score)
      if (outcome === "team1") {
        team1.points += POINTS_SYSTEM.win
        team1.wins += 1
        team2.points += POINTS_SYSTEM.loss
        team2.losses += 1
      } else if (outcome === "team2") {
        team2.points += POINTS_SYSTEM.win
        team2.wins += 1
        team1.points += POINTS_SYSTEM.loss
        team1.losses += 1
      } else {
        team1.points += POINTS_SYSTEM.draw
        team2.points += POINTS_SYSTEM.draw
        team1.draws += 1
        team2.draws += 1
      }
    }

    // Return sorted entries
    return Object.values(byTeam).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
      return a.teamName.localeCompare(b.teamName)
    })
  }
}


