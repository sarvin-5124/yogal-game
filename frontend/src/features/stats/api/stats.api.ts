import axios from "axios";
import type { StatsResponse } from "../types/stats.types";

export const statsApi = {
  get: (): Promise<StatsResponse> =>
    axios.get("http://localhost:3000/data").then((r) => r.data),
};
