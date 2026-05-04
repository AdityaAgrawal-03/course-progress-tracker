export function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function formatRemainingTime(
  totalMinutes: number,
  completedMinutes: number
): string {
  const remaining = Math.max(0, totalMinutes - completedMinutes);
  if (remaining >= 60) {
    const hours = Math.floor(remaining / 60);
    const mins = remaining % 60;
    return mins > 0 ? `${hours}h ${mins}m remaining` : `${hours}h remaining`;
  }
  return `${remaining}m remaining`;
}
