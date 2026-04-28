import axios from "axios";
import type { StatsResponse } from "../types/stats.types";

export const statsApi = {
  get: (): Promise<StatsResponse> =>
    axios.get("https://yogal-game.onrender.com/data").then((r) => r.data),
};
