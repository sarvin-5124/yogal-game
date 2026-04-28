type Props = {
  clue: string;
  index: number;
  isLatest: boolean;
};

export function ClueCard({ clue, index, isLatest }: Props) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 transition-all ${
        isLatest
          ? "border-green-200 bg-green-50 shadow-sm animate-fade-in"
          : "border-stone-100 bg-white text-stone-500"
      }`}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">
        Clue {index + 1}
      </p>
      <p
        className={`text-sm leading-relaxed ${isLatest ? "text-stone-800" : "text-stone-500"}`}
      >
        {clue}
      </p>
    </div>
  );
}
