import { useEffect, useState, useCallback } from "react";

const KEY = "codex:v1";

export type BookState = {
  currentSpread: number;
  unlockedFragments: boolean[]; // 3 slots
  signature: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
};

const defaultState: BookState = {
  currentSpread: 0,
  unlockedFragments: [false, false, false],
  signature: "",
  soundEnabled: false,
  musicEnabled: false,
};

function load(): BookState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function save(s: BookState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

export function useBookState() {
  // SSR-safe: initialize with default, hydrate from localStorage after mount.
  const [state, setState] = useState<BookState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const setSpread = useCallback((n: number) => {
    setState((s) => ({ ...s, currentSpread: n }));
  }, []);
  const unlock = useCallback((idx: number) => {
    setState((s) => {
      if (s.unlockedFragments[idx]) return s;
      const next = [...s.unlockedFragments];
      next[idx] = true;
      return { ...s, unlockedFragments: next };
    });
  }, []);
  const setSignature = useCallback((sig: string) => {
    setState((s) => ({ ...s, signature: sig }));
  }, []);
  const toggleSound = useCallback(() => {
    setState((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
  }, []);
  const toggleMusic = useCallback(() => {
    setState((s) => ({ ...s, musicEnabled: !s.musicEnabled }));
  }, []);

  return { state, hydrated, setSpread, unlock, setSignature, toggleSound, toggleMusic };
}

export type SpreadMeta = {
  id: string;
  chapter: 0 | 1 | 2 | 3 | 4; // 0 front matter, 1-3 chapters, 4 back matter
  chapterTitle: string;
  title: string;
};

export const SPREADS: SpreadMeta[] = [
  { id: "cover", chapter: 0, chapterTitle: "Front", title: "Cover" },
  { id: "title", chapter: 0, chapterTitle: "Front", title: "Title Page" },
  { id: "toc", chapter: 0, chapterTitle: "Front", title: "Contents" },
  { id: "ch1-opener", chapter: 1, chapterTitle: "I · Copperline After Dark", title: "Copperline After Dark" },
  { id: "ch1-text", chapter: 1, chapterTitle: "I · Copperline After Dark", title: "The Paint-Runner" },
  { id: "ch1-dialogue", chapter: 1, chapterTitle: "I · Copperline After Dark", title: "On the Roof" },
  { id: "ch2-opener", chapter: 2, chapterTitle: "II · The Machinist's Debt", title: "Down the Copper Stair" },
  { id: "ch2-scrapbook", chapter: 2, chapterTitle: "II · The Machinist's Debt", title: "Pinned Evidence" },
  { id: "ch2-character", chapter: 2, chapterTitle: "II · The Machinist's Debt", title: "The Machinist" },
  { id: "ch3-opener", chapter: 3, chapterTitle: "III · What the Ink Remembers", title: "The Walls Wake Up" },
  { id: "ch3-climax", chapter: 3, chapterTitle: "III · What the Ink Remembers", title: "Lightning on the Rooftop" },
  { id: "ch3-closing", chapter: 3, chapterTitle: "III · What the Ink Remembers", title: "Unfinished" },
  { id: "gallery", chapter: 4, chapterTitle: "Extras", title: "Gallery" },
  { id: "credits", chapter: 4, chapterTitle: "Extras", title: "Credits" },
];

export const CHAPTERS = [
  { n: 1, title: "Copperline After Dark", firstSpread: 3 },
  { n: 2, title: "The Machinist's Debt", firstSpread: 6 },
  { n: 3, title: "What the Ink Remembers", firstSpread: 9 },
];
