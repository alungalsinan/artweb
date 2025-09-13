// Sports domain types

export type Sport =
  | "Football"
  | "Basketball"
  | "Cricket"
  | "Volleyball"
  | "Badminton"
  | "Table Tennis"
  | "Athletics"
  | string

export type MatchStatus = "upcoming" | "ongoing" | "paused" | "completed"

export interface Team {
  id: string
  name: string
  slug: string
  logoUrl?: string
  bio?: string
  achievements?: string[]
}

export interface Score {
  team1: number
  team2: number
}

export interface Fixture {
  id: string
  sport: Sport
  category?: string
  team1Id: string
  team2Id: string
  scheduledAt: string // ISO datetime
  venue: string
  status: MatchStatus
  score?: Score
  startedAt?: string // ISO datetime
  completedAt?: string // ISO datetime
  notes?: string
}

export interface ScoreUpdate {
  matchId: string
  timestamp: string // ISO datetime
  team: "team1" | "team2"
  delta: number
  by?: string // admin identifier/name (optional)
}

export interface LeaderboardEntry {
  teamId: string
  teamName: string
  points: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}


