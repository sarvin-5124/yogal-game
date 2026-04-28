import { useState, useEffect, useCallback } from "react";
import { gameApi } from "../api/game.api";
import { getTodayIST } from "../../../shared/utils/date";
import { generateShareGrid } from "../../../shared/utils/emoji-grid";
import { updateStreak } from "./useStreak";
import type { GameState, SavedResult } from "../types/game.types";

function savedResultKey() {
  return `yogal_result_${getTodayIST()}`;
}

function loadSavedResult(): SavedResult | null {
  try {
    const raw = localStorage.getItem(savedResultKey());
    return raw ? (JSON.parse(raw) as SavedResult) : null;
  } catch {
    return null;
  }
}

function saveResult(result: SavedResult) {
  localStorage.setItem(savedResultKey(), JSON.stringify(result));
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    puzzle: null,
    status: "loading",
    clues: [],
    attempts: 0,
    poseGuide: null,
    error: null,
  });

  useEffect(() => {
    const saved = loadSavedResult();
    if (saved) {
      setState({
        puzzle: {
          poseId: saved.poseId,
          dayIndex: saved.dayIndex,
          firstClue: saved.clues[0]!,
        },
        status: saved.status,
        clues: saved.clues,
        attempts: saved.attempts,
        poseGuide: saved.poseGuide,
        error: null,
      });
      return;
    }

    gameApi
      .getToday()
      .then((puzzle) => {
        setState((s) => ({
          ...s,
          puzzle,
          status: "playing",
          clues: [puzzle.firstClue],
        }));
      })
      .catch(() => {
        setState((s) => ({
          ...s,
          status: "playing",
          error: "Could not load today’s puzzle.",
        }));
      });
  }, []);

  const handleGuess = useCallback(
    async (guess: string) => {
      if (!state.puzzle || state.status !== "playing") return;
      const cluesRevealed = state.clues.length;
      const res = await gameApi.guess(
        state.puzzle.poseId,
        guess,
        cluesRevealed,
      );

      setState((s) => {
        const newAttempts = s.attempts + 1;
        if (res.solved || res.failed) {
          const newStatus = res.solved ? "solved" : "failed";
          updateStreak();
          saveResult({
            status: newStatus,
            clues: s.clues,
            attempts: newAttempts,
            poseGuide: res.poseGuide!,
            dayIndex: s.puzzle!.dayIndex,
            poseId: s.puzzle!.poseId,
          });
          return {
            ...s,
            status: newStatus,
            attempts: newAttempts,
            poseGuide: res.poseGuide!,
          };
        }
        const newClues = res.nextClue ? [...s.clues, res.nextClue] : s.clues;
        return { ...s, attempts: newAttempts, clues: newClues };
      });
    },
    [state.puzzle, state.status, state.clues, state.attempts],
  );

  const handleSkip = useCallback(async () => {
    if (!state.puzzle || state.status !== "playing") return;
    const cluesRevealed = state.clues.length;
    const res = await gameApi.skip(state.puzzle.poseId, cluesRevealed);

    setState((s) => {
      const newAttempts = s.attempts + 1;
      if (res.failed) {
        updateStreak();
        saveResult({
          status: "failed",
          clues: s.clues,
          attempts: newAttempts,
          poseGuide: res.poseGuide!,
          dayIndex: s.puzzle!.dayIndex,
          poseId: s.puzzle!.poseId,
        });
        return {
          ...s,
          status: "failed",
          attempts: newAttempts,
          poseGuide: res.poseGuide!,
        };
      }
      const newClues = res.nextClue ? [...s.clues, res.nextClue] : s.clues;
      return { ...s, attempts: newAttempts, clues: newClues };
    });
  }, [state.puzzle, state.status, state.clues, state.attempts]);

  const handleShare = useCallback(() => {
    if (!state.puzzle) return;
    const text = generateShareGrid(
      state.attempts,
      state.status === "solved",
      state.puzzle.dayIndex,
    );
    navigator.clipboard.writeText(text).catch(() => {});
    gameApi
      .share(state.puzzle.poseId, state.attempts, state.status === "solved")
      .catch(() => {});
  }, [state.puzzle, state.attempts, state.status]);

  return { state, handleGuess, handleSkip, handleShare };
}
