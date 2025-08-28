import { OvitrapData } from "../types/ovitrap";

export function sortOvitrapData(data: OvitrapData[]): OvitrapData[] {
  return data.sort((a, b) => {
    const [prefixA, numA] = a.ovitrap_id.split("/");
    const [prefixB, numB] = b.ovitrap_id.split("/");
    if (prefixA !== prefixB) {
      return prefixA.localeCompare(prefixB);
    }
    return Number(numA) - Number(numB);
  });
}
