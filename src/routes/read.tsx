import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPREADS, CHAPTERS, useBookState } from "@/lib/book";
import { renderSpread } from "@/components/spreads";
import { BrassButton, GrainOverlay, Vignette } from "@/components/atoms";

export const Route = createFileRoute("/read")({
  head: () => ({
    meta: [
      { title: "Read - The World in Her Margins" },
      {
        name: "description",
        content:
          "Turn the pages of Aarvi's illustrated sketchbook: classroom, margins, inner worlds, and the dream of an artist's life in New York.",
      },
      { property: "og:title", content: "Read - The World in Her Margins" },
      {
        property: "og:description",
        content: "An interactive sketchbook you can turn page by page.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReadPage,
});

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.matchMedia("(max-width: 820px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

function playPageTurn(ctx: AudioContext) {
  const now = ctx.currentTime;
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = noiseBuffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(900, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + 0.2);
}

function useBookAudio(soundEnabled: boolean, musicEnabled: boolean, pageIndex: number) {
  const audioRef = useRef<AudioContext | null>(null);
  const pageRef = useRef(pageIndex);
  const musicRef = useRef<{ osc: OscillatorNode; lfo: OscillatorNode; gain: GainNode } | null>(
    null,
  );

  const ensureAudio = useCallback(() => {
    const AudioCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) throw new Error("Web Audio is not supported in this browser.");
    if (!audioRef.current) audioRef.current = new AudioCtor();
    if (audioRef.current.state === "suspended") void audioRef.current.resume();
    return audioRef.current;
  }, []);

  useEffect(() => {
    if (!soundEnabled || pageRef.current === pageIndex) {
      pageRef.current = pageIndex;
      return;
    }
    playPageTurn(ensureAudio());
    pageRef.current = pageIndex;
  }, [ensureAudio, pageIndex, soundEnabled]);

  useEffect(() => {
    if (!musicEnabled) {
      musicRef.current?.osc.stop();
      musicRef.current?.lfo.stop();
      musicRef.current = null;
      return;
    }

    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(146.83, now);
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.08, now);
    lfoGain.gain.setValueAtTime(18, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 1.2);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(850, now);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    lfo.start(now);
    musicRef.current = { osc, lfo, gain };

    return () => {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.stop(ctx.currentTime + 0.14);
      lfo.stop(ctx.currentTime + 0.14);
      musicRef.current = null;
    };
  }, [ensureAudio, musicEnabled]);

  return ensureAudio;
}

function ReadPage() {
  const { state, hydrated, setSpread, unlock, setSignature, toggleSound, toggleMusic } =
    useBookState();
  const isMobile = useIsMobile();

  const [tocOpen, setTocOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = SPREADS.length;
  const fragmentLabels = ["Lore", "Visual Bible", "Comic Run"];
  const extrasSpread = useMemo(
    () =>
      Math.max(
        0,
        SPREADS.findIndex((spread) => spread.id === "final-archive"),
      ),
    [],
  );

  // Only start from stored spread once hydrated
  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    if (hydrated) setPageIndex(state.currentSpread);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const goto = useCallback(
    (n: number, dir?: 1 | -1) => {
      const clamped = Math.max(0, Math.min(total - 1, n));
      setDirection(dir ?? (clamped > pageIndex ? 1 : -1));
      setPageIndex(clamped);
      setSpread(clamped);
    },
    [pageIndex, setSpread, total],
  );

  const next = useCallback(() => goto(pageIndex + 1, 1), [pageIndex, goto]);
  const prev = useCallback(() => goto(pageIndex - 1, -1), [pageIndex, goto]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Swipe nav
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 60) {
      if (dx < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  const meta = SPREADS[pageIndex];
  useEffect(() => {
    if (!hydrated || !meta) return;

    if (meta.id.startsWith("lore")) unlock(0);
    else if (
      [
        "identity",
        "official-profile",
        "wardrobe",
        "visual-development-one",
        "visual-development-two",
        "worlds",
      ].includes(meta.id)
    ) {
      unlock(1);
    } else if (meta.chapter === 5) {
      unlock(2);
    }
  }, [hydrated, meta, unlock]);

  const ctx = useMemo(
    () => ({
      onJump: (n: number) => goto(n),
      onUnlock: (i: number) => unlock(i),
      signature: state.signature,
      onSign: (s: string) => setSignature(s),
      unlocked: state.unlockedFragments,
    }),
    [goto, unlock, setSignature, state.signature, state.unlockedFragments],
  );

  // Book-open intro animation
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 900);
    return () => clearTimeout(t);
  }, []);

  const fullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  const ensureAudio = useBookAudio(state.soundEnabled, state.musicEnabled, pageIndex);
  const toggleSoundWithAudio = useCallback(() => {
    ensureAudio();
    toggleSound();
  }, [ensureAudio, toggleSound]);
  const toggleMusicWithAudio = useCallback(() => {
    ensureAudio();
    toggleMusic();
  }, [ensureAudio, toggleMusic]);
  const openImage = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("button, a, input")) return;

    if (target instanceof HTMLImageElement) {
      setLightbox({
        src: target.currentSrc || target.src,
        alt: target.alt || "Aarvi archive image",
      });
      return;
    }

    const opener = target.closest<HTMLElement>("[data-open-image-src]");
    const src = opener?.dataset.openImageSrc;
    if (!src) return;
    setLightbox({ src, alt: opener.dataset.openImageAlt || "Aarvi archive image" });
  }, []);

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-ink-black text-paper"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClickCapture={openImage}
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #241832 0%, #0d1220 55%, #05060b 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-8%] top-[12%] h-20 w-[42%] rotate-[-11deg] border-y border-gold/15 bg-crimson/10 blur-[1px]"
        style={{ clipPath: "polygon(0 48%, 88% 0, 100% 18%, 12% 100%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[-10%] h-24 w-[48%] rotate-[9deg] border-y border-teal/15 bg-teal/10 blur-[1px]"
        style={{ clipPath: "polygon(8% 0, 100% 34%, 84% 100%, 0 60%)" }}
      />

      {/* Book stage */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-16 py-14">
        <div
          className={`relative w-full max-w-6xl transition-all duration-[900ms] ease-out ${
            intro ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
          style={{ perspective: "2400px" }}
        >
          {/* Book shell */}
          <div
            className="relative mx-auto"
            style={{
              aspectRatio: isMobile ? "3/4" : "16/10",
              maxHeight: "calc(100vh - 8rem)",
            }}
          >
            {/* Book thickness / edge shading */}
            <div className="absolute -inset-3 rounded-sm bg-ink-navy shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]" />
            <div
              className="absolute -inset-2 rounded-sm"
              style={{
                background: "linear-gradient(180deg, #221a2e 0%, #16121c 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(184,137,47,0.15), inset 0 30px 60px rgba(0,0,0,0.55)",
              }}
            />
            {/* Gutter shadow */}
            {!isMobile && (
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-24 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.5) 55%, transparent 100%)",
                }}
              />
            )}

            {/* Page content with animated transition */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={pageIndex}
                  custom={direction}
                  initial={{
                    rotateY: direction === 1 ? 90 : -90,
                    x: direction === 1 ? "8%" : "-8%",
                    opacity: 0,
                  }}
                  animate={{ rotateY: 0, x: 0, opacity: 1 }}
                  exit={{
                    rotateY: direction === 1 ? -90 : 90,
                    x: direction === 1 ? "-8%" : "8%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: direction === 1 ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {renderSpread(pageIndex, ctx)}
                  {/* Page turn shadow sweep */}
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.55), transparent 30%, transparent 70%, rgba(0,0,0,0.55))",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bookmark ribbon */}
            <div
              className="absolute -top-2 right-[8%] w-3 h-16 md:h-24 bg-crimson z-30"
              style={{
                boxShadow: "inset -1px 0 0 rgba(0,0,0,0.4), 2px 4px 8px rgba(0,0,0,0.5)",
                animation: "ribbon-sway 5s ease-in-out infinite",
              }}
              aria-hidden
            />

            {/* Corner turn hotspots (desktop) */}
            {!isMobile && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous page"
                  className="group absolute left-0 top-0 bottom-0 w-20 z-30 focus:outline-none"
                >
                  <span
                    className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-tr from-ink-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
                  />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next page"
                  className="group absolute right-0 top-0 bottom-0 w-20 z-30 focus:outline-none"
                >
                  <span
                    className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-tl from-ink-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chapter tabs, right edge */}
      <nav className="absolute right-1 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {CHAPTERS.map((c) => {
          const active = meta?.chapter === c.n;
          return (
            <button
              key={c.n}
              type="button"
              onClick={() => goto(c.firstSpread)}
              className={`group relative px-3 py-4 text-[10px] font-display tracking-[0.3em] uppercase transition-all ${
                active
                  ? "text-ink-black bg-paper-warm translate-x-0"
                  : "text-paper bg-ink-navy/80 -translate-x-2 hover:translate-x-0"
              }`}
              style={{
                writingMode: "vertical-rl",
                clipPath: "polygon(0 8px, 8px 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                boxShadow: "-2px 2px 6px rgba(0,0,0,0.5)",
              }}
              title={c.title}
            >
              Ch. {c.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => goto(extrasSpread)}
          className="group relative px-3 py-3 text-[10px] font-display tracking-[0.3em] uppercase bg-gold/80 text-ink-black -translate-x-2 hover:translate-x-0 transition-all"
          style={{
            writingMode: "vertical-rl",
            clipPath: "polygon(0 8px, 8px 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            boxShadow: "-2px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          Extras
        </button>
      </nav>

      {/* Chrome — top-left TOC / back */}
      <div className="absolute top-4 left-4 z-40 flex gap-2">
        <Link
          to="/"
          className="brass-button rounded-sm px-3 py-2 text-[10px] font-display tracking-[0.3em] uppercase inline-flex items-center gap-2"
        >
          ← Desk
        </Link>
        <BrassButton small onClick={() => setTocOpen(true)}>
          Contents
        </BrassButton>
      </div>

      {/* Chrome — top-right controls */}
      <div className="absolute right-4 top-14 z-40 flex gap-2 sm:top-4">
        <BrassButton small onClick={toggleSoundWithAudio} ariaLabel="Toggle sound">
          {state.soundEnabled ? "Sound ●" : "Sound ○"}
        </BrassButton>
        <BrassButton small onClick={toggleMusicWithAudio} ariaLabel="Toggle music">
          {state.musicEnabled ? "Music ●" : "Music ○"}
        </BrassButton>
        <BrassButton small onClick={fullscreen} ariaLabel="Fullscreen">
          ⛶
        </BrassButton>
      </div>

      {/* Chrome — bottom: progress + indicator */}
      <div className="absolute bottom-4 left-0 right-0 z-40 flex flex-col items-center gap-2 px-6">
        <div className="font-display text-[10px] tracking-[0.4em] uppercase text-paper/70">
          {meta?.chapterTitle} — <span className="text-ember">{meta?.title}</span>
        </div>
        <div className="w-full max-w-2xl flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="brass-button rounded-sm w-8 h-8 flex items-center justify-center text-sm"
            aria-label="Previous"
          >
            ‹
          </button>
          <input
            type="range"
            min={0}
            max={total - 1}
            value={pageIndex}
            onChange={(e) => goto(parseInt(e.target.value, 10))}
            className="flex-1 accent-ember"
            aria-label="Page slider"
          />
          <div className="font-numeral text-sm text-gold w-16 text-center">
            {pageIndex + 1} / {total}
          </div>
          <button
            type="button"
            onClick={next}
            className="brass-button rounded-sm w-8 h-8 flex items-center justify-center text-sm"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      {/* Progress fragments HUD */}
      <div className="absolute top-20 left-4 z-40 flex flex-col gap-1">
        {state.unlockedFragments.map((u, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-[10px] font-display tracking-[0.3em] uppercase ${
              u ? "text-ember" : "text-paper/40"
            }`}
            title={u ? `${fragmentLabels[i]} unlocked` : `${fragmentLabels[i]} locked`}
          >
            <span
              className={`h-2 w-2 rounded-full ${u ? "bg-ember" : "bg-paper/20"}`}
              style={u ? { boxShadow: "0 0 8px var(--color-ember)" } : {}}
            />
            {fragmentLabels[i]}
          </div>
        ))}
      </div>

      {/* TOC overlay */}
      <AnimatePresence>
        {tocOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 bg-ink-black/85 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setTocOpen(false)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
              className="relative max-w-2xl w-full paper-surface p-8 md:p-12 rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-display text-xs tracking-[0.5em] text-crimson">CONTENTS</div>
              <h2 className="mt-1 font-display font-black text-ink-black text-2xl md:text-4xl">
                Where do you want to go?
              </h2>
              <div className="mt-6 space-y-1 max-h-[60vh] overflow-auto pr-2">
                {SPREADS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      goto(i);
                      setTocOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-baseline gap-3 rounded-sm hover:bg-ember/10 ${
                      i === pageIndex ? "bg-ember/15" : ""
                    }`}
                  >
                    <span className="font-numeral text-lg text-ember w-10 shrink-0">{i + 1}</span>
                    <span className="font-serif text-ink-black text-base flex-1">{s.title}</span>
                    <span className="font-hand text-sm text-ink-black/60">{s.chapterTitle}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                className="absolute top-3 right-3 font-display text-xs tracking-[0.3em] text-ink-black/70 hover:text-crimson"
              >
                CLOSE ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Vignette />
      <GrainOverlay />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] flex items-center justify-center bg-ink-black/92 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 brass-button rounded-sm px-3 py-2 font-display text-[10px] uppercase tracking-[0.3em]"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[92vh] max-w-[94vw] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
