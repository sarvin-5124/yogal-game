export function generateShareGrid(
  attempts: number,
  solved: boolean,
  dayIndex: number,
): string {
  const grid = Array(5).fill("🟥");
  for (let i = 0; i < attempts - 1; i++) grid[i] = "🟨";
  if (solved) grid[attempts - 1] = "🟩";

  return [
    `🧘 YOGAL #${dayIndex}`,
    grid.join(""),
    solved ? `Guessed in ${attempts}/5 clues` : "Better luck tomorrow!",
    `${window.location.origin}${window.location.pathname}`,
  ].join("\n");
}
