/**
 * Journey entries: localStorage array for "My Journey" dashboard.
 * Schema: one entry per saved reflection (feeling + ritual snapshot + reflection text).
 */

export interface RitualSnapshot {
  meditation: string;
  selfcare: string;
  prompt: string;
  spotify?: string;
}

export interface JourneyEntry {
  id: string;
  date: string;
  feeling: string;
  reflection: string;
  ritual: RitualSnapshot;
}

const STORAGE_KEY = "remember_journey_entries";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getJourneyEntries(): JourneyEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const list = safeParse<JourneyEntry[]>(raw, []);
  return Array.isArray(list) ? list : [];
}

export function addJourneyEntry(entry: Omit<JourneyEntry, "id">): void {
  const entries = getJourneyEntries();
  const newEntry: JourneyEntry = {
    ...entry,
    id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  };
  entries.unshift(newEntry);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore quota or other errors
  }
}

export function hasAnyJourneyEntries(): boolean {
  return getJourneyEntries().length > 0;
}
