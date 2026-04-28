import { useEffect, useState } from "react";
import { useGame } from "./features/game/hooks/useGame";
import { getStreak } from "./features/game/hooks/useStreak";
import { ClueCard } from "./features/game/components/ClueCard";
import { GuessInput } from "./features/game/components/GuessInput";
import { ResultScreen } from "./features/game/components/ResultScreen";
import { PoseGuideCard } from "./features/pose-guide/components/PoseGuideCard";
import { StreakGate } from "./features/signup/components/StreakGate";
import { StatsDashboard } from "./features/stats/components/StatsDashboard";
import { getTodayIST } from "./shared/utils/date";

export default function App() {
  if (window.location.pathname === "/data") {
    return <StatsDashboard />;
  }
  return <GameApp />;
}

function GameApp() {
  const { state, handleGuess, handleSkip, handleShare } = useGame();
  const [showGuide, setShowGuide] = useState(false);
  const [showStreakGate, setShowStreakGate] = useState(false);

  const isGameOver = state.status === "solved" || state.status === "failed";

  useEffect(() => {
    if (!isGameOver) return;
    const guideTimer = setTimeout(() => setShowGuide(true), 1500);
    return () => clearTimeout(guideTimer);
  }, [isGameOver]);

  useEffect(() => {
    if (!isGameOver) return;
    const streak = getStreak().currentStreak;
    const gateKey = `yogal_streak_gate_${getTodayIST()}`;
    const alreadyShown = !!localStorage.getItem(gateKey);
    const alreadySigned = !!localStorage.getItem("yogal_signed_up");
    if (streak >= 3 && !alreadyShown && !alreadySigned) {
      const t = setTimeout(() => setShowStreakGate(true), 3000);
      return () => clearTimeout(t);
    }
  }, [isGameOver]);

  const attemptsLeft = 5 - state.attempts;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <h1 className="font-serif text-xl font-semibold text-stone-800">
            🧘 Yogal
          </h1>
          {state.puzzle && (
            <span className="text-xs text-stone-400">
              #{state.puzzle.dayIndex}
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-4 px-4 py-6">
        {state.status === "loading" && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          </div>
        )}

        {state.error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </div>
        )}

        {state.status === "playing" && (
          <>
            <p className="text-center text-sm text-stone-500">
              Guess today's yoga pose from the clues below
            </p>
            <div className="space-y-2">
              {state.clues.map((clue, i) => (
                <ClueCard
                  key={i}
                  clue={clue}
                  index={i}
                  isLatest={i === state.clues.length - 1}
                />
              ))}
            </div>
            <GuessInput
              onGuess={handleGuess}
              onSkip={handleSkip}
              disabled={false}
              attemptsLeft={attemptsLeft}
            />
          </>
        )}

        {isGameOver && state.poseGuide && (
          <>
            <ResultScreen
              solved={state.status === "solved"}
              attempts={state.attempts}
              poseName={state.poseGuide.nameEnglish}
              onShare={handleShare}
            />
            {showGuide && (
              <div className="animate-fade-in">
                <PoseGuideCard
                  guide={state.poseGuide}
                  poseId={state.puzzle!.poseId}
                  cluesUsed={state.attempts}
                />
              </div>
            )}
          </>
        )}
      </main>

      {showStreakGate && state.puzzle && state.poseGuide && (
        <StreakGate
          streak={getStreak().currentStreak}
          poseId={state.puzzle.poseId}
          cluesUsed={state.attempts}
          onDismiss={() => setShowStreakGate(false)}
        />
      )}
    </div>
  );
}
