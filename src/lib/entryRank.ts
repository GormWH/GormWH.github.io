/**
 * Display ordering shared by every work/writing surface (homepage sections,
 * listing pages, detail-page sidebars/pager): important entries first, then
 * newest first, then id as a stable tiebreaker.
 */
export interface RankableEntry {
  id: string;
  data: {
    important: boolean;
    date: Date;
  };
}

export function compareEntryPriority(a: RankableEntry, b: RankableEntry): number {
  const imp = Number(b.data.important) - Number(a.data.important);
  if (imp !== 0) return imp;
  const dateDiff = b.data.date.getTime() - a.data.date.getTime();
  if (dateDiff !== 0) return dateDiff;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}
