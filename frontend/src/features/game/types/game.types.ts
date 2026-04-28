import type { PoseGuide } from "../../pose-guide/types/pose.types";

export type GameStatus = "loading" | "playing" | "solved" | "failed";

export type DailyPuzzle = {
  poseId: number;
  dayIndex: number;
  firstClue: string;
};

export type GuessResponse = {
  correct: boolean;
  solved: boolean;
  failed: boolean;
  nextClue?: string;
  poseGuide?: PoseGuide;
};

export type SkipResponse = {
  failed: boolean;
  nextClue?: string;
  poseGuide?: PoseGuide;
};

export type GameState = {
  puzzle: DailyPuzzle | null;
  status: GameStatus;
  clues: string[];
  attempts: number;
  poseGuide: PoseGuide | null;
  error: string | null;
};

export type SavedResult = {
  status: "solved" | "failed";
  clues: string[];
  attempts: number;
  poseGuide: PoseGuide;
  dayIndex: number;
  poseId: number;
};
