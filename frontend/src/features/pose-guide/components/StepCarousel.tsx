import { useState, useRef } from "react";
import { StepImage } from "./StepImage";
import type { PoseStep } from "../types/pose.types";

type Props = { steps: PoseStep[] };

export function StepCarousel({ steps }: Props) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  function next() {
    setCurrent((c) => Math.min(steps.length - 1, c + 1));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  }

  const step = steps[current];
  if (!step) return null;

  return (
    <div className="space-y-3">
      <div
        className="select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <StepImage src={step.imageUrl} alt={step.instruction} />
      </div>

      <div className="flex items-start justify-between gap-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="mt-0.5 text-stone-400 disabled:opacity-20 hover:text-stone-700"
          aria-label="Previous step"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Step {current + 1} of {steps.length}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-700">
            {step.instruction}
          </p>
        </div>

        <button
          onClick={next}
          disabled={current === steps.length - 1}
          className="mt-0.5 text-stone-400 disabled:opacity-20 hover:text-stone-700"
          aria-label="Next step"
        >
          →
        </button>
      </div>

      <div className="flex justify-center gap-1.5">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-4 bg-green-600" : "w-1.5 bg-stone-300"}`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
