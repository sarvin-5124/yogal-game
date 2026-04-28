export function getTodayIST(): string {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET);
  return nowIST.toISOString().split("T")[0]!;
}

export function getYesterdayIST(): string {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET - 86400000);
  return nowIST.toISOString().split("T")[0]!;
}
