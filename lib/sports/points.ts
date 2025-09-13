import type { Score } from "./types"

export const POINTS_SYSTEM = {
  win: 3,
  draw: 1,
  loss: 0,
}

export type MatchOutcome = "team1" | "team2" | "draw"

export function determineOutcome(score: Score): MatchOutcome {
  if (score.team1 > score.team2) return "team1"
  if (score.team2 > score.team1) return "team2"
  return "draw"
}

export function pointsForTeam(score: Score, team: "team1" | "team2"): number {
  const outcome = determineOutcome(score)
  if (outcome === "draw") return POINTS_SYSTEM.draw
  return outcome === team ? POINTS_SYSTEM.win : POINTS_SYSTEM.loss
}


