import type { Request, Response } from "express";
import { gameService } from "../services/game.service.ts";

export async function getToday(_req: Request, res: Response) {
  try {
    const data = await gameService.getTodaysPose();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function submitGuess(req: Request, res: Response) {
  const { poseId, guess, cluesRevealed } = req.body as {
    poseId: number;
    guess: string;
    cluesRevealed: number;
  };

  if (!poseId || guess === undefined || cluesRevealed === undefined) {
    res
      .status(400)
      .json({ error: "poseId, guess, and cluesRevealed are required." });
    return;
  }

  try {
    const result = await gameService.processGuess(poseId, guess, cluesRevealed);
    if (result.solved || result.failed) {
      await gameService.logGameSession(poseId, cluesRevealed, result.solved);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function skipClue(req: Request, res: Response) {
  const { poseId, cluesRevealed } = req.body as {
    poseId: number;
    cluesRevealed: number;
  };

  if (!poseId || cluesRevealed === undefined) {
    res.status(400).json({ error: "poseId and cluesRevealed are required." });
    return;
  }

  try {
    const result = await gameService.processSkip(poseId, cluesRevealed);
    if (result.failed) {
      await gameService.logGameSession(poseId, cluesRevealed, false);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function shareResult(req: Request, res: Response) {
  const { poseId, cluesUsed, solved } = req.body as {
    poseId: number;
    cluesUsed: number;
    solved: boolean;
  };

  if (!poseId || cluesUsed === undefined || solved === undefined) {
    res
      .status(400)
      .json({ error: "poseId, cluesUsed, and solved are required." });
    return;
  }

  try {
    await gameService.logGameSession(poseId, cluesUsed, solved, true);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
