import { useEffect, useState, useCallback } from "react";

const KEY = "aarvi-margins:v2";

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
  chapter: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 front matter, 1-5 chapters, 6 back matter
  chapterTitle: string;
  title: string;
};

export const SPREADS: SpreadMeta[] = [
  { id: "cover", chapter: 0, chapterTitle: "Front", title: "Cover" },
  { id: "title", chapter: 0, chapterTitle: "Front", title: "Title Page" },
  { id: "toc", chapter: 0, chapterTitle: "Front", title: "Contents" },
  {
    id: "style-tests",
    chapter: 1,
    chapterTitle: "I · Style and Mascot Creation",
    title: "Finding Aarvi",
  },
  {
    id: "personalization",
    chapter: 1,
    chapterTitle: "I · Style and Mascot Creation",
    title: "Making Her Feel Real",
  },
  {
    id: "identity",
    chapter: 2,
    chapterTitle: "II · Character Bible",
    title: "Character Bible",
  },
  {
    id: "wardrobe",
    chapter: 2,
    chapterTitle: "II · Character Bible",
    title: "Outfit Construction",
  },
  {
    id: "visual-development-one",
    chapter: 3,
    chapterTitle: "III · Visual Development",
    title: "Shape and Face",
  },
  {
    id: "visual-development-two",
    chapter: 3,
    chapterTitle: "III · Visual Development",
    title: "Hair and Hands",
  },
  {
    id: "worlds",
    chapter: 4,
    chapterTitle: "IV · Lore and Alternate Worlds",
    title: "Two Worlds",
  },
  {
    id: "studio-social",
    chapter: 4,
    chapterTitle: "IV · Lore and Alternate Worlds",
    title: "Studio and Voice",
  },
  {
    id: "lore",
    chapter: 4,
    chapterTitle: "IV · Lore and Alternate Worlds",
    title: "The Girl in the Wrong World",
  },
  {
    id: "lore-profile",
    chapter: 4,
    chapterTitle: "IV · Lore and Alternate Worlds",
    title: "Quiet Outside, Universe Inside",
  },
  {
    id: "lore-symbols",
    chapter: 4,
    chapterTitle: "IV · Lore and Alternate Worlds",
    title: "A Girl Carrying Two Worlds",
  },
  { id: "anime-divider", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime Comic" },
  { id: "anime-1", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime 1" },
  { id: "anime-2", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime 2" },
  { id: "anime-3", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime 3" },
  { id: "anime-4", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime 4" },
  { id: "anime-5", chapter: 5, chapterTitle: "V · Comic Pages", title: "Anime 5" },
  { id: "webtoon-divider", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon Comic" },
  { id: "webtoon-1", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon 1" },
  { id: "webtoon-2", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon 2" },
  { id: "webtoon-3", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon 3" },
  { id: "webtoon-4", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon 4" },
  { id: "webtoon-5", chapter: 5, chapterTitle: "V · Comic Pages", title: "Webtoon 5" },
  { id: "game-divider", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game-Style Comic" },
  { id: "game-1", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game 1" },
  { id: "game-2", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game 2" },
  { id: "game-3", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game 3" },
  { id: "game-4", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game 4" },
  { id: "game-5", chapter: 5, chapterTitle: "V · Comic Pages", title: "Game 5" },
  { id: "final-archive", chapter: 6, chapterTitle: "Archive", title: "Final Boards" },
  { id: "downloads", chapter: 6, chapterTitle: "Archive", title: "Downloads" },
  { id: "credits", chapter: 6, chapterTitle: "Archive", title: "Credits" },
];

export const CHAPTERS = [
  { n: 1, label: "I", title: "Style and Mascot Creation", firstSpread: 3 },
  { n: 2, label: "II", title: "Character Bible", firstSpread: 5 },
  { n: 3, label: "III", title: "Visual Development", firstSpread: 7 },
  { n: 4, label: "IV", title: "Lore and Alternate Worlds", firstSpread: 9 },
  { n: 5, label: "V", title: "Comic Pages", firstSpread: 14 },
];
