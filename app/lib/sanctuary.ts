/**
 * Sanctuary: mood → color, time mode, dominant feeling, poetic remix.
 * All client-side; uses journey entries from localStorage.
 */

import type { JourneyEntry } from "./journey";

export type TimeMode = "morning" | "evening";

/** Muted sage (calm), pale indigo (reflective), soft terracotta (grounded) — low opacity in UI */
const MOOD_COLORS: Record<string, string> = {
  calm: "rgba(167, 190, 174, 0.6)",
  peaceful: "rgba(167, 190, 174, 0.6)",
  content: "rgba(167, 190, 174, 0.55)",
  happy: "rgba(167, 190, 174, 0.5)",
  grateful: "rgba(167, 190, 174, 0.55)",
  hopeful: "rgba(180, 170, 200, 0.5)",
  motivated: "rgba(180, 170, 200, 0.45)",
  energized: "rgba(180, 170, 200, 0.5)",
  stressed: "rgba(180, 170, 200, 0.55)",
  anxious: "rgba(180, 170, 200, 0.55)",
  sad: "rgba(180, 170, 200, 0.6)",
  lonely: "rgba(180, 170, 200, 0.6)",
  overwhelmed: "rgba(180, 170, 200, 0.5)",
  tired: "rgba(190, 155, 140, 0.5)",
  exhausted: "rgba(190, 155, 140, 0.55)",
  angry: "rgba(190, 155, 140, 0.45)",
  frustrated: "rgba(190, 155, 140, 0.5)",
  unfocused: "rgba(167, 190, 174, 0.4)",
  numb: "rgba(180, 170, 200, 0.45)",
  restless: "rgba(190, 155, 140, 0.5)",
};

const DEFAULT_COLOR = "rgba(167, 190, 174, 0.5)";

export function moodToColor(feeling: string): string {
  const key = feeling.toLowerCase().trim();
  return MOOD_COLORS[key] ?? DEFAULT_COLOR;
}

export function getTimeMode(): TimeMode {
  if (typeof window === "undefined") return "morning";
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 17 || h < 5) return "evening";
  return h >= 12 && h < 17 ? "evening" : "morning";
}

/** Dominant feeling from last 7–14 entries */
export function getDominantFeeling(entries: JourneyEntry[]): string {
  const slice = entries.slice(0, 14);
  if (slice.length === 0) return "calm";
  const counts: Record<string, number> = {};
  slice.forEach((e) => {
    const f = e.feeling.toLowerCase();
    counts[f] = (counts[f] ?? 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "calm";
}

/** Short poetic excerpt for a date (e.g. "A breath returned on Feb 3") */
export function getPoeticExcerpt(entry: JourneyEntry): string {
  const d = new Date(entry.date);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  const ref = entry.reflection.trim();
  if (ref && ref !== "(no words)") {
    const first = ref.slice(0, 40).trim();
    return `${first}${ref.length > 40 ? "…" : ""} — ${month} ${day}`;
  }
  return `A moment of ${entry.feeling} — ${month} ${day}`;
}

/** Remix 3–5 past rituals into 1–2 gentle suggestions */
export function getRemixSuggestions(entries: JourneyEntry[]): { line: string; source?: string }[] {
  const recent = entries.slice(0, 7);
  if (recent.length === 0) return [];
  const byFeeling: Record<string, JourneyEntry[]> = {};
  recent.forEach((e) => {
    const f = e.feeling;
    if (!byFeeling[f]) byFeeling[f] = [];
    byFeeling[f].push(e);
  });
  const suggestions: { line: string; source?: string }[] = [];
  const calm = byFeeling["calm"] ?? byFeeling["peaceful"] ?? byFeeling["content"];
  if (calm?.[0]) {
    suggestions.push({
      line: `From your calm days: revisit a 3‑min breath and ${calm[0].ritual.selfcare.toLowerCase()}.`,
      source: calm[0].date,
    });
  }
  const low = byFeeling["sad"] ?? byFeeling["lonely"];
  if (low?.[0]) {
    suggestions.push({
      line: `When heaviness visited: pair with this prompt — "${(low[0].ritual.prompt ?? "").slice(0, 50)}…"`,
      source: low[0].date,
    });
  }
  const tense = byFeeling["stressed"] ?? byFeeling["anxious"];
  if (tense?.[0] && suggestions.length < 2) {
    suggestions.push({
      line: `From a restless moment: ${tense[0].ritual.meditation.slice(0, 60)}…`,
      source: tense[0].date,
    });
  }
  if (suggestions.length === 0 && recent[0]) {
    suggestions.push({
      line: `Today, return to: ${recent[0].ritual.meditation.slice(0, 55)}…`,
      source: recent[0].date,
    });
  }
  return suggestions.slice(0, 2);
}

/** One-sentence narrative thread (e.g. "Calm returns after each storm — a quiet strength") */
const NARRATIVE_TEMPLATES: Record<string, string> = {
  calm: "Calm returns again and again — a quiet strength.",
  peaceful: "Peace threads through your moments like a slow river.",
  stressed: "After each storm, you return to breath — steady.",
  sad: "You meet sadness with gentleness; that is courage.",
  grateful: "Gratitude runs through your days like a soft light.",
  tired: "Rest is part of the path — you allow it.",
  hopeful: "Hope visits when you pause to notice it.",
  lonely: "Even in solitude, you have shown up for yourself.",
  overwhelmed: "One step at a time — you have done this before.",
  motivated: "Your intentions have carried you here.",
};

export function getNarrativeThread(entries: JourneyEntry[]): string {
  const dominant = getDominantFeeling(entries);
  const key = Object.keys(NARRATIVE_TEMPLATES).find((k) => dominant.includes(k));
  return key ? NARRATIVE_TEMPLATES[key] : "Your path is yours alone — gentle and true.";
}
