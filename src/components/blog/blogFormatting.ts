export function formatPostDate(input: string | Date | undefined): string {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatReadingTime(minutes: number | undefined): string {
  if (!minutes || minutes <= 0) return "";
  return `${Math.ceil(minutes)} min read`;
}
