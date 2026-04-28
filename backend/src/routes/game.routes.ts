import { Router } from "express";
import {
  getToday,
  submitGuess,
  skipClue,
  shareResult,
} from "../controllers/game.controller.ts";

const router = Router();

router.get("/today", getToday);
router.post("/guess", submitGuess);
router.post("/skip", skipClue);
router.post("/share", shareResult);

export default router;
