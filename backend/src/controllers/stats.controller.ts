import type { Request, Response } from "express";
import { statsService } from "../services/stats.service.ts";

export async function getStats(_req: Request, res: Response) {
  try {
    const data = await statsService.getStats();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
