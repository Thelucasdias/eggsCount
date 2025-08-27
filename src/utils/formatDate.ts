/**
 * Format a date string to "DD/MM/YYYY".
 * Accepts "YYYY-MM-DD" or ISO strings like "YYYY-MM-DDTHH:mm:ss[.sss]Z".
 */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";

  // Normalize: extract leading YYYY-MM-DD if an ISO string is passed
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr);
  if (!match) return "";

  const [, year, month, day] = match;

  // Basic range check to avoid obviously invalid dates
  const y = Number(year),
    m = Number(month),
    d = Number(day);
  if (y < 1900 || m < 1 || m > 12 || d < 1 || d > 31) return "";

  // Always return "DD/MM/YYYY"
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${y}`;
}
