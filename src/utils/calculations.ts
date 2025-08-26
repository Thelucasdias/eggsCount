import { OvitrapData } from "../types/ovitrap";
/**
 * Calculates the positivity rate of traps.
 *
 * @param {Array<Object>} data - List of traps with their egg counts.
 * @param {number} data[].eggs - Number of eggs found in the trap.
 * @returns {number} - Percentage of traps that are positive (0–100).
 */

export function calculatePositivityRate(data: OvitrapData[]): number {
  const total = data.length;
  const positives = data.filter((trap) => trap.eggs > 0).length;
  return total > 0 ? (positives / total) * 100 : 0;
}
