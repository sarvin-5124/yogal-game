import axios from "axios";
import type {
  DailyPuzzle,
  GuessResponse,
  SkipResponse,
} from "../types/game.types";

const BASE = "https://yogal-game.onrender.com/api/game";

export const gameApi = {
  getToday: (): Promise<DailyPuzzle> =>
    axios.get(`${BASE}/today`).then((r) => r.data),

  guess: (
    poseId: number,
    guess: string,
    cluesRevealed: number,
  ): Promise<GuessResponse> =>
    axios
      .post(`${BASE}/guess`, { poseId, guess, cluesRevealed })
      .then((r) => r.data),

  skip: (poseId: number, cluesRevealed: number): Promise<SkipResponse> =>
    axios.post(`${BASE}/skip`, { poseId, cluesRevealed }).then((r) => r.data),

  share: (
    poseId: number,
    cluesUsed: number,
    solved: boolean,
  ): Promise<{ ok: boolean }> =>
    axios
      .post(`${BASE}/share`, { poseId, cluesUsed, solved })
      .then((r) => r.data),
};
