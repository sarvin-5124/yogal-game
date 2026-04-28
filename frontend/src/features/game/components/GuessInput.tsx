import { useState } from "react";
import { Button } from "../../../shared/components/Button";

type Props = {
  onGuess: (guess: string) => Promise<void>;
  onSkip: () => Promise<void>;
  disabled: boolean;
  attemptsLeft: number;
};

export function GuessInput({ onGuess, onSkip, disabled, attemptsLeft }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    setLoading(true);
    await onGuess(value.trim());
    setValue("");
    setLoading(false);
  }

  async function handleSkip() {
    setLoading(true);
    await onSkip();
    setValue("");
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled || loading}
          placeholder="Name the pose…"
          className="min-w-0 flex-1 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 disabled:opacity-50"
        />
        <Button type="submit" disabled={disabled || loading || !value.trim()}>
          Guess
        </Button>
      </form>

      <div className="flex items-center justify-between px-1">
        <button
          onClick={handleSkip}
          disabled={disabled || loading}
          className="text-xs text-stone-400 hover:text-stone-600 disabled:opacity-40"
        >
          Skip → show next clue
        </button>
        <span className="text-xs text-stone-400">
          {attemptsLeft} attempts left
        </span>
      </div>
    </div>
  );
}
