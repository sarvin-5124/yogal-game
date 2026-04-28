import { useState } from "react";
import { ShareGrid } from "./ShareGrid";
import { Button } from "../../../shared/components/Button";
import { getStreak } from "../hooks/useStreak";

type Props = {
  solved: boolean;
  attempts: number;
  poseName: string;
  onShare: () => void;
};

export function ResultScreen({ solved, attempts, poseName, onShare }: Props) {
  const [copied, setCopied] = useState(false);
  const streak = getStreak().currentStreak;

  function handleShare() {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
      <div className="text-center">
        {solved ? (
          <>
            <p className="text-2xl">🎉</p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-stone-800">
              You got it!
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Guessed in{" "}
              <span className="font-semibold text-green-700">{attempts}</span>{" "}
              of 5 clues
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl">🧘</p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-stone-800">
              Not today!
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              The pose was{" "}
              <span className="font-semibold text-stone-700">{poseName}</span>
            </p>
          </>
        )}
      </div>

      <ShareGrid attempts={attempts} solved={solved} />

      {streak > 0 && (
        <p className="text-center text-sm font-medium text-amber-600">
          🔥 {streak}-day streak
        </p>
      )}

      <Button
        variant="primary"
        onClick={handleShare}
        className="w-full justify-center"
      >
        {copied ? "✓ Copied!" : "Share Result"}
      </Button>
    </div>
  );
}
