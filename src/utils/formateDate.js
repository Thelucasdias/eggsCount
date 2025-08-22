/**
 * @param {string} dateStr - Date string in the format "YYYY-MM-DD"
 * @returns {string} - Date formatted as "DD/MM/YYYY"
 */

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}
