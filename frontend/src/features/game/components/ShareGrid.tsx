type Props = {
  attempts: number;
  solved: boolean;
};

export function ShareGrid({ attempts, solved }: Props) {
  const squares = Array(5)
    .fill(null)
    .map((_, i) => {
      if (i < attempts - 1) return "yellow";
      if (i === attempts - 1 && solved) return "green";
      if (i < attempts) return "red";
      return "empty";
    });

  const colors = {
    green: "bg-green-500",
    yellow: "bg-amber-400",
    red: "bg-red-400",
    empty: "bg-stone-200",
  };

  return (
    <div className="flex justify-center gap-2">
      {squares.map((color, i) => (
        <div
          key={i}
          className={`h-8 w-8 rounded-md ${colors[color as keyof typeof colors]}`}
        />
      ))}
    </div>
  );
}
