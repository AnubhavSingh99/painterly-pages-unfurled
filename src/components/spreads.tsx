import { useState, type ReactNode } from "react";
import { HiddenReveal, PaintStroke, TornEdge, ParallaxScene, ParallaxLayer, DustField } from "./atoms";
import { SPREADS } from "@/lib/book";

import coverArt from "@/assets/cover-art.jpg";
import skyline from "@/assets/ch1-skyline.jpg";
import vessPortrait from "@/assets/vess-portrait.jpg";
import ch1Dialogue from "@/assets/ch1-dialogue.jpg";
import workshop from "@/assets/ch2-workshop.jpg";
import machinist from "@/assets/machinist-portrait.jpg";
import ch3Wall from "@/assets/ch3-wall.jpg";
import ch3Climax from "@/assets/ch3-climax.jpg";
import gallerySheet from "@/assets/gallery-sheet.jpg";

/* Shared page wrapper */
function Page({
  children,
  tone = "paper",
  className = "",
}: {
  children: ReactNode;
  tone?: "paper" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        tone === "paper" ? "paper-surface" : "paper-dark"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function InkAnnotation({
  children,
  className = "",
  rotate = -3,
  color = "var(--color-crimson)",
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
}) {
  return (
    <span
      className={`font-hand text-lg leading-tight ${className}`}
      style={{ color, transform: `rotate(${rotate}deg)`, display: "inline-block" }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   0. COVER
   ============================================================ */
export function CoverSpread() {
  return (
    <Page tone="dark" className="!bg-ink-black">
      <img
        src={coverArt}
        alt="The Ink & Ember Codex — cover"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
        width={1200}
        height={1600}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      {/* Embossed title plate */}
      <div className="absolute inset-x-0 top-[6%] flex flex-col items-center px-6 text-center">
        <div className="text-[10px] tracking-[0.6em] font-display text-gold/90">VOLUME I</div>
        <h1 className="mt-3 font-display font-black text-paper text-4xl md:text-6xl leading-[0.95] drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]">
          THE INK &<br />EMBER CODEX
        </h1>
        <div className="mt-4 h-px w-40 bg-gold/60" />
        <div className="mt-3 font-scrawl text-xl text-paper/85">a recovered sketchbook</div>
      </div>
      <div className="absolute inset-x-0 bottom-[6%] flex flex-col items-center px-6 text-center">
        <div className="font-hand text-lg text-paper/80">
          "Found in a workshop above the Copperline —<br />half-finished, still warm."
        </div>
        <div className="mt-4 font-display text-[10px] tracking-[0.5em] text-gold/80">
          MARLOW · ANONYMOUS
        </div>
      </div>
      {/* Bookmark ribbon */}
      <div
        className="absolute top-0 right-[14%] w-6 h-[110%] bg-crimson origin-top"
        style={{
          boxShadow: "inset -2px 0 0 rgba(0,0,0,0.35), 2px 0 6px rgba(0,0,0,0.4)",
          animation: "ribbon-sway 6s ease-in-out infinite",
        }}
      />
    </Page>
  );
}

/* ============================================================
   1. TITLE PAGE
   ============================================================ */
export function TitleSpread() {
  return (
    <Page tone="paper">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 md:px-16 text-center">
        <div className="font-scrawl text-2xl text-crimson mb-4">Vess Marlow · property of</div>
        <h1 className="font-display font-black text-ink-black text-4xl md:text-6xl leading-[0.95]">
          THE INK &<br />EMBER CODEX
        </h1>
        <div className="mt-6 font-hand text-2xl text-teal">— being a private record —</div>
        <div className="mt-14 max-w-md font-serif text-sm md:text-base text-ink-black/85 italic">
          "If you're reading this, I'm probably in trouble.
          Turn the page anyway."
        </div>
        <div className="mt-16 flex items-center gap-6">
          <div className="h-px w-24 bg-ink-black/40" />
          <span className="font-display text-xs tracking-[0.5em] text-ink-black/70">MMXXVI</span>
          <div className="h-px w-24 bg-ink-black/40" />
        </div>
        {/* The moth — flickers on hover */}
        <div className="mt-10 group cursor-help" title="something small moves on the page">
          <svg viewBox="0 0 60 60" width="52" height="52" className="text-ink-black/70">
            <g style={{ transformOrigin: "center", animation: "moth-flutter 3s ease-in-out infinite" }}>
              <ellipse cx="30" cy="34" rx="4" ry="10" fill="currentColor" />
              <path d="M30,30 C10,20 6,32 14,40 C22,46 28,38 30,34 Z" fill="currentColor" opacity="0.85" />
              <path d="M30,30 C50,20 54,32 46,40 C38,46 32,38 30,34 Z" fill="currentColor" opacity="0.85" />
              <circle cx="27" cy="24" r="1.2" fill="currentColor" />
              <circle cx="33" cy="24" r="1.2" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
      <TornEdge position="top" color="rgba(0,0,0,0.08)" />
      <TornEdge position="bottom" color="rgba(0,0,0,0.08)" />
    </Page>
  );
}

/* ============================================================
   2. TOC
   ============================================================ */
export function TocSpread({ onJump }: { onJump: (n: number) => void }) {
  const chapters = [
    { n: "I", title: "Copperline After Dark", spread: 3 },
    { n: "II", title: "The Machinist's Debt", spread: 6 },
    { n: "III", title: "What the Ink Remembers", spread: 9 },
    { n: "—", title: "Gallery", spread: 12 },
    { n: "—", title: "Credits", spread: 13 },
  ];
  return (
    <Page tone="paper">
      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20">
        <div className="font-display text-xs tracking-[0.5em] text-crimson">CONTENTS</div>
        <h2 className="mt-2 font-display font-black text-ink-black text-3xl md:text-5xl">
          What's in the book
        </h2>
        <div className="mt-8 space-y-4">
          {chapters.map((c) => (
            <button
              key={c.spread}
              type="button"
              onClick={() => onJump(c.spread)}
              className="group flex w-full items-baseline gap-4 text-left transition-transform hover:translate-x-1"
            >
              <span className="font-numeral text-3xl md:text-4xl text-ember w-14 shrink-0">
                {c.n}
              </span>
              <span className="font-serif text-lg md:text-2xl text-ink-black group-hover:text-crimson">
                {c.title}
              </span>
              <span className="flex-1 border-b border-dashed border-ink-black/30 mx-2 mb-1" />
              <span className="font-hand text-lg text-ink-black/60">p. {c.spread * 2 + 1}</span>
            </button>
          ))}
        </div>
        <div className="mt-12 max-w-md font-hand text-lg text-teal">
          "Read it in any order — the ink remembers."
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   3. CH1 OPENER — full spread skyline
   ============================================================ */
export function Ch1Opener() {
  return (
    <Page tone="dark" className="!bg-ink-black">
      <ParallaxScene className="absolute inset-0" strength={16}>
        <ParallaxLayer depth={0.4} className="absolute inset-0">
          <img
            src={skyline}
            alt="Copperline skyline at dusk"
            className="h-full w-full object-cover"
            width={1920}
            height={1088}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black/40" />
        </ParallaxLayer>
        <ParallaxLayer depth={1.4} className="absolute inset-0">
          <DustField count={20} />
        </ParallaxLayer>
      </ParallaxScene>
      <div className="absolute left-6 md:left-14 bottom-10 max-w-md z-20">
        <div className="font-display text-xs tracking-[0.5em] text-cyan-arc">CHAPTER</div>
        <div className="font-numeral text-6xl md:text-8xl text-ember leading-none mt-1"
             style={{ animation: "ember-flicker 3s ease-in-out infinite" }}>
          I
        </div>
        <h2 className="mt-2 font-display font-black text-paper text-3xl md:text-5xl leading-tight">
          COPPERLINE<br />AFTER DARK
        </h2>
        <div className="mt-4 font-hand text-xl text-paper/85">
          smoke, sirens, and a wet paintbrush
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   4. CH1 TEXT — Vess sketch left, story right, hidden ember
   ============================================================ */
export function Ch1Text({ onUnlock }: { onUnlock: (i: number) => void }) {
  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: sketch page */}
      <div className="relative paper-surface overflow-hidden">
        <img
          src={vessPortrait}
          alt="Vess Marlow character study"
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
          width={1008}
          height={1408}
        />
        {/* Annotations */}
        <InkAnnotation className="absolute top-[8%] left-[6%]" rotate={-8}>
          Vess Marlow, 17.<br/>bites her thumb when nervous
        </InkAnnotation>
        <InkAnnotation className="absolute top-[38%] right-[4%]" rotate={6} color="var(--color-teal)">
          → magenta streak. never natural.
        </InkAnnotation>
        <InkAnnotation className="absolute bottom-[8%] left-[8%]" rotate={-2} color="var(--color-ember)">
          "she'd paint on the sun if she could reach"
        </InkAnnotation>
      </div>

      {/* RIGHT: text page */}
      <div className="relative paper-surface overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 py-10">
          <div className="relative w-fit">
            <PaintStroke color="var(--color-ember)" className="absolute -inset-x-4 top-1 h-10 -z-10" seed={0} />
            <h3 className="font-display font-black text-2xl md:text-3xl text-paper mix-blend-difference">
              THE PAINT-RUNNER
            </h3>
          </div>
          <div className="mt-6 font-serif text-[15px] leading-relaxed text-ink-black/90 max-w-md space-y-4">
            <p>
              Copperline was never quiet. The pipes drank all night — hot brass groaning
              under a sky the colour of a bruise. Vess ran three streets over with a can
              of ember-red under her jacket and the sound of the foundry bell chasing her.
            </p>
            <p>
              She stopped at the wall behind Halloran's. Wet brick. Perfect surface. She
              opened the can, and the paint — the paint <em>looked at her</em>.
            </p>
            <p className="font-hand text-lg text-crimson pt-2">
              And then it moved.
            </p>
          </div>

          {/* Hidden ember reveal */}
          <div className="mt-8">
            <HiddenReveal
              hint={
                <span className="inline-flex items-center gap-2 font-hand text-lg text-teal underline decoration-dotted underline-offset-4">
                  <span
                    className="inline-block w-3 h-3 rounded-full bg-ember"
                    style={{ animation: "ember-flicker 1.4s ease-in-out infinite", boxShadow: "0 0 12px var(--color-ember)" }}
                  />
                  something's glowing under this splash…
                </span>
              }
              onReveal={() => onUnlock(0)}
            >
              <span className="block max-w-xs rounded-sm border border-ember/60 bg-ink-black/90 px-4 py-3 text-paper font-hand text-lg">
                ✦ Fragment I unlocked · <em>the moth on the title page had her mother's eyes.</em>
              </span>
            </HiddenReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5. CH1 DIALOGUE — two panels, click to advance
   ============================================================ */
export function Ch1Dialogue() {
  const lines = [
    { who: "VESS", text: "It moved, Rell. I'm telling you it moved." },
    { who: "RELL", text: "Everything moves down here when you haven't slept." },
    { who: "VESS", text: "Not like this. It looked back." },
    { who: "RELL", text: "Then paint it something worth looking at." },
  ];
  const [step, setStep] = useState(1);
  return (
    <Page tone="dark" className="!bg-ink-navy">
      <img
        src={ch1Dialogue}
        alt="Two figures on a rooftop"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        width={1600}
        height={1200}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-black/60 via-transparent to-ink-black/80" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-10 gap-3">
        {lines.slice(0, step).map((l, i) => (
          <div
            key={i}
            className="max-w-md animate-[fade-up_0.5s_ease-out] rounded-sm border border-gold/40 bg-ink-black/70 backdrop-blur-sm px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            style={{ marginLeft: i % 2 ? "auto" : 0, marginRight: i % 2 ? 0 : "auto" }}
          >
            <div className="font-display text-[10px] tracking-[0.4em] text-ember">{l.who}</div>
            <div className="mt-1 font-serif text-paper text-[15px] leading-snug">{l.text}</div>
          </div>
        ))}
        {step < lines.length && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(lines.length, s + 1))}
            className="self-center mt-2 font-hand text-lg text-gold underline decoration-dotted underline-offset-4 hover:text-ember"
          >
            (click for the next line)
          </button>
        )}
      </div>
    </Page>
  );
}

/* ============================================================
   6. CH2 OPENER — workshop
   ============================================================ */
export function Ch2Opener() {
  return (
    <Page tone="dark" className="!bg-ink-black">
      <ParallaxScene className="absolute inset-0" strength={12}>
        <ParallaxLayer depth={0.5} className="absolute inset-0">
          <img
            src={workshop}
            alt="Underground clockwork workshop"
            className="h-full w-full object-cover"
            width={1920}
            height={1088}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black/30" />
        </ParallaxLayer>
        {/* Slow rotating gear overlay */}
        <ParallaxLayer depth={1.1} className="absolute inset-0 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="absolute top-4 right-6 w-24 h-24 text-gold/60"
            style={{ animation: "spin 40s linear infinite" }}
          >
            <g fill="currentColor">
              <circle cx="100" cy="100" r="38" fill="none" stroke="currentColor" strokeWidth="12" />
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="94" y="6" width="12" height="26"
                  transform={`rotate(${(360 / 12) * i} 100 100)`}
                />
              ))}
              <circle cx="100" cy="100" r="14" />
            </g>
          </svg>
        </ParallaxLayer>
      </ParallaxScene>

      <div className="absolute left-6 md:left-14 bottom-10 max-w-md z-20">
        <div className="font-display text-xs tracking-[0.5em] text-gold">CHAPTER</div>
        <div className="font-numeral text-6xl md:text-8xl text-gold leading-none mt-1">II</div>
        <h2 className="mt-2 font-display font-black text-paper text-3xl md:text-5xl leading-tight">
          THE MACHINIST'S<br />DEBT
        </h2>
        <div className="mt-4 font-hand text-xl text-paper/85">
          a bargain made in gear-grease and promises
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   7. CH2 SCRAPBOOK — pinned items, one hides a collectible
   ============================================================ */
export function Ch2Scrapbook({ onUnlock }: { onUnlock: (i: number) => void }) {
  return (
    <Page tone="paper">
      <div className="relative z-10 h-full p-6 md:p-10">
        <div className="font-display text-xs tracking-[0.5em] text-crimson">EVIDENCE PINNED</div>
        <h3 className="mt-1 font-display font-black text-ink-black text-2xl md:text-3xl">
          What Vess kept
        </h3>

        <div className="mt-4 relative h-[calc(100%-4rem)]">
          {/* photograph */}
          <div
            className="absolute top-2 left-4 md:left-8 w-40 md:w-52 rotate-[-6deg] bg-paper-warm p-2 shadow-[6px_10px_20px_rgba(0,0,0,0.4)]"
          >
            <div className="h-32 md:h-40 bg-ink-navy/80 flex items-center justify-center text-paper/60 font-hand text-sm">
              [photograph: crew, factory roof]
            </div>
            <div className="pt-2 font-hand text-sm text-ink-black/70">us, before</div>
          </div>

          {/* blueprint */}
          <div className="absolute top-4 right-6 md:right-16 w-48 md:w-64 rotate-[4deg] p-3 shadow-[8px_12px_24px_rgba(0,0,0,0.35)]"
               style={{ background: "linear-gradient(135deg, #1e3a5a, #14263f)" }}>
            <svg viewBox="0 0 200 120" className="w-full h-24 text-cyan-arc/80">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="10" y="10" width="180" height="100" />
                <line x1="10" y1="60" x2="190" y2="60" />
                <line x1="100" y1="10" x2="100" y2="110" />
                <circle cx="60" cy="35" r="14" />
                <circle cx="140" cy="85" r="10" />
              </g>
            </svg>
            <div className="pt-1 font-marker text-xs text-cyan-arc">GEAR-BOX BLUEPRINT · rev.3</div>
          </div>

          {/* receipt */}
          <div className="absolute bottom-6 left-10 md:left-24 w-44 rotate-[3deg] bg-paper-warm p-3 shadow-[4px_8px_16px_rgba(0,0,0,0.35)] font-hand text-sm text-ink-black">
            <div className="text-ember font-display text-[10px] tracking-widest">RECEIPT</div>
            <div className="mt-1">1 × copper spool</div>
            <div>1 × silence</div>
            <div className="mt-1 border-t border-ink-black/30 pt-1 flex justify-between">
              <span>total</span>
              <span className="text-crimson">one favour</span>
            </div>
          </div>

          {/* pinned note w/ hidden collectible */}
          <div className="absolute bottom-4 right-6 md:right-20 w-48 rotate-[-4deg]">
            <div className="bg-paper-warm p-3 shadow-[6px_10px_20px_rgba(0,0,0,0.4)] relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-crimson shadow-[0_2px_2px_rgba(0,0,0,0.4)]" />
              <HiddenReveal
                onReveal={() => onUnlock(1)}
                hint={
                  <span className="font-hand text-base text-ink-black/85 block">
                    "if you're reading this, don't take the deal. — R"
                  </span>
                }
              >
                <span className="block font-hand text-base text-crimson">
                  ✦ Fragment II unlocked · <em>Rell tried to warn her.</em>
                </span>
              </HiddenReveal>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   8. CH2 CHARACTER — the Machinist portrait + stats
   ============================================================ */
export function Ch2Character() {
  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
      <div className="relative paper-surface overflow-hidden">
        <img
          src={machinist}
          alt="The Machinist"
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
          style={{ animation: "breathe 6s ease-in-out infinite" }}
          width={1008}
          height={1408}
        />
        <InkAnnotation className="absolute top-[8%] right-[4%]" rotate={-4}>
          brass arm — replaces the one<br/>he lost in the '38 boiler
        </InkAnnotation>
      </div>
      <div className="relative paper-surface overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 py-10">
          <div className="font-display text-xs tracking-[0.5em] text-crimson">DOSSIER</div>
          <h3 className="mt-1 font-display font-black text-ink-black text-3xl md:text-4xl leading-none">
            THE MACHINIST
          </h3>
          <div className="mt-4 font-hand text-2xl text-teal">a.k.a. "Old Grease"</div>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 font-serif text-sm text-ink-black">
            {[
              ["age", "somewhere north of 60"],
              ["trade", "clockwork · cursed metals"],
              ["debts owed", "many"],
              ["debts paid", "few"],
              ["temper", "slow, then loud"],
              ["asks for", "your ink, not your money"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-dashed border-ink-black/30 pb-1">
                <dt className="font-display text-[10px] uppercase tracking-widest text-crimson/80">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-6 border-l-2 border-ember pl-4 font-serif italic text-ink-black/85 text-[15px] max-w-sm">
            "Everyone thinks they want the miracle. Nobody wants the invoice."
          </blockquote>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   9. CH3 OPENER — factory wall with SVG stroke-in ink
   ============================================================ */
export function Ch3Opener() {
  return (
    <Page tone="dark" className="!bg-ink-black">
      <img
        src={ch3Wall}
        alt="Rain-slick factory wall with living murals"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent" />
      {/* Ink stroke animating on entry */}
      <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full pointer-events-none z-20" preserveAspectRatio="none">
        <path
          d="M60,540 C220,420 320,520 480,380 C620,260 700,320 780,220"
          fill="none"
          stroke="var(--color-cyan-arc)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1200"
          style={{ animation: "ink-stroke 3.6s ease-out forwards" }}
          opacity="0.85"
        />
        <path
          d="M40,300 C160,240 260,340 380,260 C500,180 620,240 760,160"
          fill="none"
          stroke="var(--color-magenta-arc)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1200"
          style={{ animation: "ink-stroke 4.5s ease-out forwards" }}
          opacity="0.7"
        />
      </svg>
      <div className="absolute left-6 md:left-14 bottom-10 max-w-md z-30">
        <div className="font-display text-xs tracking-[0.5em] text-magenta-arc">CHAPTER</div>
        <div className="font-numeral text-6xl md:text-8xl text-cyan-arc leading-none mt-1">III</div>
        <h2 className="mt-2 font-display font-black text-paper text-3xl md:text-5xl leading-tight">
          WHAT THE INK<br />REMEMBERS
        </h2>
        <div className="mt-4 font-hand text-xl text-paper/85">
          the walls have been listening
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   10. CH3 CLIMAX
   ============================================================ */
export function Ch3Climax() {
  return (
    <Page tone="dark" className="!bg-ink-black">
      <img
        src={ch3Climax}
        alt="Lightning-struck rooftop confrontation"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 40%, rgba(220,240,255,0.4) 47%, transparent 55%)",
          mixBlendMode: "screen",
          animation: "ember-flicker 4s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-transparent to-ink-black/40" />
      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-14 pb-12">
        <div className="max-w-xl">
          <div className="font-display text-[10px] tracking-[0.5em] text-crimson">CLIMAX · 03:04 A.M.</div>
          <h3 className="mt-2 font-display font-black text-paper text-2xl md:text-4xl leading-tight drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]">
            SHE LOOKED UP AND THE WALL LOOKED DOWN.
          </h3>
          <p className="mt-4 font-serif text-paper/85 text-[15px] leading-relaxed">
            The rain hit sideways. The mural stepped forward. Vess did not run.
            She uncapped the can — and offered it the last of her red.
          </p>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   11. CH3 CLOSING — unfinished, sign the margin
   ============================================================ */
export function Ch3Closing({
  signature,
  onSign,
  onUnlock,
}: {
  signature: string;
  onSign: (s: string) => void;
  onUnlock: (i: number) => void;
}) {
  const [draft, setDraft] = useState(signature);
  return (
    <Page tone="paper">
      <TornEdge position="top" color="rgba(122,30,42,0.15)" />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="font-display text-xs tracking-[0.5em] text-crimson">END OF FIRST DRAFT</div>
          <h3 className="mt-2 font-display font-black text-ink-black text-3xl md:text-4xl">
            The next page is blank.
          </h3>
          <p className="mt-4 font-serif text-ink-black/85 leading-relaxed">
            She was going to finish it. The story stops here because
            the story stopped here.
          </p>
          <div className="mt-8 font-hand text-2xl text-teal">
            …<br />…<br />…
          </div>

          {/* Unfinished sketch */}
          <svg viewBox="0 0 200 100" className="mx-auto mt-6 h-20 w-64 text-ink-black/60">
            <path d="M10,80 C40,20 80,90 120,40 C140,20 160,60 180,30"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeDasharray="4 4" />
          </svg>

          {/* Sign the margin */}
          <div className="mt-10 border-t border-dashed border-ink-black/30 pt-6">
            <label className="font-hand text-lg text-crimson block">
              If you're going to finish it, sign your name in the margin:
            </label>
            <div className="mt-3 flex flex-col sm:flex-row gap-2 items-center justify-center">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 40))}
                placeholder="your name"
                className="w-64 bg-transparent border-b-2 border-ink-black/40 font-hand text-2xl text-ink-black text-center focus:outline-none focus:border-ember"
              />
              <button
                type="button"
                onClick={() => {
                  onSign(draft.trim());
                  if (draft.trim()) onUnlock(2);
                }}
                className="brass-button rounded-sm px-4 py-2 text-[10px] font-display uppercase tracking-widest"
              >
                Sign
              </button>
            </div>
            {signature && (
              <div className="mt-4 font-scrawl text-2xl text-crimson">
                — signed, {signature}. ✦ Fragment III unlocked.
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   12. GALLERY
   ============================================================ */
export function GallerySpread({ unlocked }: { unlocked: boolean[] }) {
  const fragments = [
    { i: 0, label: "The Moth's Eye", note: "hidden in Chapter I" },
    { i: 1, label: "Rell's Warning", note: "hidden in Chapter II" },
    { i: 2, label: "The Signature", note: "hidden in Chapter III" },
  ];
  return (
    <Page tone="paper">
      <div className="relative z-10 h-full p-6 md:p-10 overflow-auto">
        <div className="font-display text-xs tracking-[0.5em] text-crimson">EXTRAS</div>
        <h3 className="mt-1 font-display font-black text-ink-black text-3xl md:text-4xl">
          Gallery & Fragments
        </h3>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {fragments.map((f) => (
            <div
              key={f.i}
              className={`aspect-[3/4] p-3 border-2 relative overflow-hidden ${
                unlocked[f.i]
                  ? "border-ember bg-paper-warm"
                  : "border-dashed border-ink-black/30 bg-ink-black/5"
              }`}
            >
              <div className="font-display text-[10px] tracking-widest text-crimson">
                FRAGMENT {["I", "II", "III"][f.i]}
              </div>
              <div className="mt-1 font-hand text-lg text-ink-black">
                {unlocked[f.i] ? f.label : "— locked —"}
              </div>
              <div className="mt-2 font-serif text-[11px] text-ink-black/60">{f.note}</div>
              {!unlocked[f.i] && (
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-ink-black/20">?</div>
              )}
            </div>
          ))}
        </div>

        <h4 className="mt-8 font-display text-sm tracking-[0.4em] text-ink-black/70">CONCEPT SHEET</h4>
        <div className="mt-2 border-2 border-ink-black/20">
          <img
            src={gallerySheet}
            alt="Concept sheet"
            className="w-full h-auto"
            width={1600}
            height={1200}
            loading="lazy"
          />
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   13. CREDITS
   ============================================================ */
export function CreditsSpread() {
  return (
    <Page tone="dark">
      <div className="absolute inset-0 bg-gradient-radial from-dusk/30 via-transparent to-ink-black" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="font-display text-xs tracking-[0.5em] text-gold">END PLATE</div>
        <h3 className="mt-2 font-display font-black text-paper text-3xl md:text-5xl">
          THANK YOU FOR<br />READING
        </h3>
        <div className="mt-6 h-px w-40 bg-gold/60" />
        <div className="mt-6 font-serif text-paper/85 max-w-md leading-relaxed">
          The Ink & Ember Codex was found, transcribed, and reassembled from
          Vess Marlow's private sketchbook. Any resemblance to a real Copperline
          is intentional.
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-2 font-serif text-sm text-paper/80">
          <div className="text-right font-display text-[10px] tracking-widest text-crimson">STORY</div>
          <div className="text-left font-hand text-xl">— you, now</div>
          <div className="text-right font-display text-[10px] tracking-widest text-crimson">INK</div>
          <div className="text-left font-hand text-xl">— everyone who read this far</div>
          <div className="text-right font-display text-[10px] tracking-widest text-crimson">CITY</div>
          <div className="text-left font-hand text-xl">— Copperline, unfinished</div>
        </div>
        <div className="mt-10 font-numeral text-3xl text-ember"
             style={{ animation: "ember-flicker 3s ease-in-out infinite" }}>
          ✦ END OF VOLUME I ✦
        </div>
      </div>
    </Page>
  );
}

/* Registry */
export function renderSpread(
  index: number,
  ctx: {
    onJump: (n: number) => void;
    onUnlock: (i: number) => void;
    signature: string;
    onSign: (s: string) => void;
    unlocked: boolean[];
  }
) {
  const id = SPREADS[index]?.id;
  switch (id) {
    case "cover": return <CoverSpread />;
    case "title": return <TitleSpread />;
    case "toc": return <TocSpread onJump={ctx.onJump} />;
    case "ch1-opener": return <Ch1Opener />;
    case "ch1-text": return <Ch1Text onUnlock={ctx.onUnlock} />;
    case "ch1-dialogue": return <Ch1Dialogue />;
    case "ch2-opener": return <Ch2Opener />;
    case "ch2-scrapbook": return <Ch2Scrapbook onUnlock={ctx.onUnlock} />;
    case "ch2-character": return <Ch2Character />;
    case "ch3-opener": return <Ch3Opener />;
    case "ch3-climax": return <Ch3Climax />;
    case "ch3-closing":
      return <Ch3Closing signature={ctx.signature} onSign={ctx.onSign} onUnlock={ctx.onUnlock} />;
    case "gallery": return <GallerySpread unlocked={ctx.unlocked} />;
    case "credits": return <CreditsSpread />;
    default: return <Page tone="paper"><div /></Page>;
  }
}
