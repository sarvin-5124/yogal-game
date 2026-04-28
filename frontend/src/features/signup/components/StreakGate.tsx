import { useState } from "react";
import { signupApi } from "../api/signup.api";
import { Button } from "../../../shared/components/Button";
import { getTodayIST } from "../../../shared/utils/date";

type Props = {
  streak: number;
  poseId: number;
  cluesUsed: number;
  onDismiss: () => void;
};

export function StreakGate({ streak, poseId, cluesUsed, onDismiss }: Props) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      await signupApi.submit({
        phone,
        poseId,
        cluesUsed,
        trigger: "STREAK_SAVE",
      });
    } catch {
      // silent
    }
    localStorage.setItem("yogal_signed_up", "1");
    localStorage.setItem(`yogal_streak_gate_${getTodayIST()}`, "1");
    setDone(true);
    setTimeout(onDismiss, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onDismiss} />
      <div className="relative w-full animate-slide-up rounded-t-2xl bg-white px-5 pb-8 pt-5 shadow-xl">
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600"
          aria-label="Close"
        >
          ✕
        </button>

        {done ? (
          <p className="py-4 text-center text-sm font-medium text-green-700">
            🙏 Streak saved! See you tomorrow.
          </p>
        ) : (
          <>
            <p className="mb-1 text-center text-2xl">🔥</p>
            <h3 className="text-center font-serif text-lg font-semibold text-stone-800">
              {streak}-day streak!
            </h3>
            <p className="mt-1 text-center text-sm text-stone-500">
              Save it before it resets tomorrow.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
              <input
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoFocus
                className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-green-400 focus:outline-none"
              />
              <Button
                type="submit"
                disabled={loading || !phone.trim()}
                className="w-full justify-center"
              >
                {loading ? "Saving…" : "Save my streak"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
