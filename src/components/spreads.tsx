/* eslint-disable react-refresh/only-export-components */
import { type ReactNode } from "react";
import { DustField, TornEdge } from "./atoms";
import { SPREADS } from "@/lib/book";

import animeOne from "@/assets/aarvi/anime-1.png";
import animeTwo from "@/assets/aarvi/anime-2.png";
import animeThree from "@/assets/aarvi/anime-3.png";
import animeFour from "@/assets/aarvi/anime-4.png";
import animeFive from "@/assets/aarvi/anime-5.png";
import artistJourney from "@/assets/aarvi/artist-journey.png";
import characterDesign from "@/assets/aarvi/character-design.png";
import essenceSheet from "@/assets/aarvi/essence-sheet.png";
import expressions from "@/assets/aarvi/expressions.png";
import faceConstruction from "@/assets/aarvi/face-construction.png";
import firstCharacter from "@/assets/aarvi/first-character.png";
import gameOne from "@/assets/aarvi/game-1.png";
import gameTwo from "@/assets/aarvi/game-2.png";
import gameThree from "@/assets/aarvi/game-3.png";
import gameFour from "@/assets/aarvi/game-4.png";
import gameFive from "@/assets/aarvi/game-5.png";
import hairDevelopment from "@/assets/aarvi/hair-development.png";
import handStudies from "@/assets/aarvi/hand-studies.png";
import inkmageOutfit from "@/assets/aarvi/inkmage-outfit.png";
import journey from "@/assets/aarvi/journey.png";
import mascotSheet from "@/assets/aarvi/mascot-sheet.png";
import outfitBreakdown from "@/assets/aarvi/outfit-breakdown.png";
import outfitVariations from "@/assets/aarvi/outfit-variations.png";
import profileSheet from "@/assets/aarvi/profile-sheet.png";
import silhouetteExploration from "@/assets/aarvi/silhouette-exploration.png";
import socialTemplates from "@/assets/aarvi/social-templates.png";
import studio from "@/assets/aarvi/studio.png";
import webtoonOne from "@/assets/aarvi/webtoon-1.png";
import webtoonTwo from "@/assets/aarvi/webtoon-2.png";
import webtoonThree from "@/assets/aarvi/webtoon-3.png";
import webtoonFour from "@/assets/aarvi/webtoon-4.png";
import webtoonFive from "@/assets/aarvi/webtoon-5.png";
import worldStory from "@/assets/aarvi/world-story.png";

type Plate = {
  src: string;
  title: string;
  note: string;
  fit?: "cover" | "contain";
  landscape?: boolean;
};

function Page({
  children,
  tone = "paper",
  className = "",
  openImage,
}: {
  children: ReactNode;
  tone?: "paper" | "dark";
  className?: string;
  openImage?: { src: string; alt: string };
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        tone === "paper" ? "paper-surface" : "paper-dark"
      } ${className}`}
      data-open-image-src={openImage?.src}
      data-open-image-alt={openImage?.alt}
    >
      {children}
    </div>
  );
}

function ImagePanel({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full cursor-zoom-in ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
      draggable={false}
      title="Open image"
    />
  );
}

function ArchiveLabel({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={light ? "text-paper" : "text-ink-black"}>
      <div
        className={`font-display text-[10px] uppercase tracking-[0.45em] ${
          light ? "text-gold" : "text-crimson"
        }`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-3xl font-black leading-none md:text-5xl">{title}</h2>
      {children ? (
        <div
          className={`mt-4 max-w-lg font-serif text-sm leading-relaxed md:text-base ${light ? "text-paper/82" : "text-ink-black/78"}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function FramedPlate({
  plate,
  index,
  className = "",
}: {
  plate: Plate;
  index: number;
  className?: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden border border-ink-black/15 bg-paper/45 p-2 shadow-xl transition-transform duration-500 hover:-rotate-1 hover:scale-[1.015] ${className}`}
      data-open-image-src={plate.src}
      data-open-image-alt={plate.title}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(184,137,47,0.22),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(31,139,142,0.14),transparent_28%)] opacity-70 mix-blend-multiply" />
      <div className="relative h-full min-h-0 overflow-hidden border border-ink-black/10 bg-ink-black/5 shadow-inner">
        <ImagePanel src={plate.src} alt={plate.title} fit={plate.fit ?? "contain"} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22),transparent_24%,transparent_70%,rgba(0,0,0,0.18))] opacity-70" />
      </div>
      <figcaption className="absolute bottom-3 left-3 max-w-[78%] border-l-2 border-crimson/70 bg-paper/78 px-3 py-2 shadow-lg backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-95">
        <div className="font-display text-[8px] uppercase tracking-[0.28em] text-crimson">
          Archive {String(index + 1).padStart(2, "0")}
        </div>
        <div className="font-serif text-xs font-semibold leading-tight text-ink-black md:text-sm">
          {plate.title}
        </div>
        <div className="mt-0.5 font-hand text-sm leading-none text-teal md:text-base">
          {plate.note}
        </div>
      </figcaption>
      <div className="absolute right-3 top-3 bg-ink-black/65 px-2 py-1 font-display text-[8px] uppercase tracking-[0.26em] text-paper/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        Open
      </div>
    </figure>
  );
}

function FullBleedArt({
  plate,
  eyebrow,
  title,
  body,
  fit = "cover",
}: {
  plate: Plate;
  eyebrow: string;
  title: string;
  body: string;
  fit?: "cover" | "contain";
}) {
  return (
    <Page tone="dark" className="!bg-ink-black" openImage={{ src: plate.src, alt: plate.title }}>
      <ImagePanel src={plate.src} alt={plate.title} fit={fit} className="opacity-88" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black/90 via-ink-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/85 via-transparent to-ink-black/30" />
      <DustField count={18} />
      <div className="absolute bottom-8 left-6 right-6 z-10 max-w-xl md:bottom-12 md:left-12">
        <ArchiveLabel eyebrow={eyebrow} title={title} light>
          {body}
        </ArchiveLabel>
      </div>
    </Page>
  );
}

function PlateSpread({
  eyebrow,
  title,
  body,
  plates,
}: {
  eyebrow: string;
  title: string;
  body: string;
  plates: Plate[];
}) {
  const allLandscape = plates.every((plate) => plate.landscape);

  return (
    <Page tone="paper" className={allLandscape ? "bg-paper-warm" : ""}>
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute left-[8%] top-[9%] h-px w-[74%] rotate-[-2deg] bg-crimson/25" />
        <div className="absolute bottom-[10%] right-[6%] h-px w-[68%] rotate-[3deg] bg-teal/20" />
        <div className="absolute left-[16%] top-[18%] h-20 w-20 rounded-full border border-gold/15" />
      </div>
      <div
        className={`relative z-10 grid h-full grid-cols-1 gap-4 p-4 md:p-8 ${
          allLandscape ? "md:grid-cols-[0.62fr_1.7fr]" : "md:grid-cols-[0.9fr_1.35fr]"
        }`}
      >
        <div className={`flex flex-col justify-center ${allLandscape ? "max-md:hidden" : ""}`}>
          <ArchiveLabel eyebrow={eyebrow} title={title}>
            {body}
          </ArchiveLabel>
          <div className="mt-7 grid gap-3 font-hand text-lg leading-tight text-teal">
            <span>created from reference, then softened into story.</span>
            <span>every version keeps one thing: the sketchbook as survival.</span>
          </div>
        </div>
        <div
          className={`grid min-h-0 gap-3 ${
            allLandscape || plates.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {plates.map((plate, index) => (
            <FramedPlate key={plate.title} plate={plate} index={index} className="min-h-0" />
          ))}
        </div>
      </div>
      <TornEdge position="top" color="rgba(0,0,0,0.08)" />
      <TornEdge position="bottom" color="rgba(0,0,0,0.08)" />
    </Page>
  );
}

function SectionDivider({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}) {
  return (
    <Page tone="dark" className="!bg-ink-black" openImage={{ src: image, alt: title }}>
      <ImagePanel src={image} alt={title} className="opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(184,137,47,0.22),transparent_34%),linear-gradient(90deg,rgba(5,6,11,0.96),rgba(5,6,11,0.45),rgba(5,6,11,0.88))]" />
      <DustField count={24} />
      <div className="absolute left-7 right-7 top-1/2 z-10 max-w-2xl -translate-y-1/2 md:left-16">
        <ArchiveLabel eyebrow={eyebrow} title={title} light>
          {body}
        </ArchiveLabel>
      </div>
    </Page>
  );
}

function CoverSpread() {
  return (
    <Page
      tone="dark"
      className="!bg-ink-black"
      openImage={{ src: characterDesign, alt: "Aarvi cover art" }}
    >
      <ImagePanel
        src={characterDesign}
        alt="Aarvi character design exploration"
        className="opacity-88"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-black/30 via-ink-black/5 to-ink-black/85" />
      <div className="absolute inset-x-0 top-[7%] z-10 px-6 text-center">
        <div className="font-display text-[10px] tracking-[0.6em] text-gold/90">
          COMPLETE CREATION ARCHIVE
        </div>
        <h1
          aria-label="The World in Her Margins"
          className="mt-4 font-display text-4xl font-black leading-[0.95] text-paper drop-shadow-[0_4px_0_rgba(0,0,0,0.65)] md:text-6xl"
        >
          THE WORLD IN
          <br />
          HER MARGINS
        </h1>
        <div className="mx-auto mt-4 h-px w-44 bg-gold/60" />
        <div className="mt-4 font-hand text-2xl text-paper/85">
          Aarvi, from first sketch to comic universe
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[7%] z-10 px-6 text-center">
        <div className="font-scrawl text-2xl text-paper/90">Aarvi</div>
        <div className="mt-2 font-display text-[10px] tracking-[0.5em] text-gold/80">
          ARTIST · DREAMER · INKMAGE
        </div>
      </div>
      <div
        className="absolute right-[11%] top-0 h-[112%] w-5 origin-top bg-crimson"
        style={{
          boxShadow: "inset -2px 0 0 rgba(0,0,0,0.35), 2px 0 6px rgba(0,0,0,0.45)",
          animation: "ribbon-sway 6s ease-in-out infinite",
        }}
      />
    </Page>
  );
}

function TitleSpread() {
  return (
    <Page tone="paper">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
        <div className="font-scrawl text-3xl text-crimson">Aarvi's recovered process</div>
        <h1
          aria-label="The World in Her Margins"
          className="mt-3 font-display text-4xl font-black leading-[0.95] text-ink-black md:text-6xl"
        >
          THE WORLD IN
          <br />
          HER MARGINS
        </h1>
        <div className="mt-6 max-w-xl font-serif text-base italic leading-relaxed text-ink-black/85">
          A digital character bible built in the same order the project grew: style study, personal
          references, mascot design, lore, alternate worlds, comics, and the final book archive.
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3 font-display text-[10px] uppercase tracking-[0.28em] text-ink-black/60">
          <span>Process</span>
          <span>Story</span>
          <span>Comics</span>
        </div>
      </div>
      <TornEdge position="top" color="rgba(0,0,0,0.08)" />
      <TornEdge position="bottom" color="rgba(0,0,0,0.08)" />
    </Page>
  );
}

function TocSpread({ onJump }: { onJump: (n: number) => void }) {
  const chapters = [
    { n: "I", title: "Style and Mascot Creation", spread: 3 },
    { n: "II", title: "Character Bible", spread: 5 },
    { n: "III", title: "Visual Development", spread: 7 },
    { n: "IV", title: "Lore and Alternate Worlds", spread: 9 },
    { n: "V", title: "Comic Pages", spread: 14 },
    { n: "--", title: "Downloads and Credits", spread: 32 },
  ];

  return (
    <Page tone="paper">
      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20">
        <div className="font-display text-xs tracking-[0.5em] text-crimson">CONTENTS</div>
        <h2 className="mt-2 font-display text-3xl font-black text-ink-black md:text-5xl">
          The creation order
        </h2>
        <div className="mt-8 space-y-3">
          {chapters.map((c) => (
            <button
              key={c.spread}
              type="button"
              onClick={() => onJump(c.spread)}
              className="group flex w-full items-baseline gap-4 text-left transition-transform hover:translate-x-1"
            >
              <span className="font-numeral text-2xl text-ember md:text-4xl">{c.n}</span>
              <span className="font-serif text-base text-ink-black group-hover:text-crimson md:text-2xl">
                {c.title}
              </span>
              <span className="mx-2 mb-1 flex-1 border-b border-dashed border-ink-black/30" />
              <span className="font-hand text-lg text-ink-black/60">p. {c.spread * 2 + 1}</span>
            </button>
          ))}
        </div>
        <div className="mt-10 max-w-md font-hand text-lg text-teal">
          "I draw the life I want until I can finally live it."
        </div>
      </div>
    </Page>
  );
}

function LoreSpread({ onUnlock }: { onUnlock: (i: number) => void }) {
  return (
    <Page tone="paper">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[8%] top-[13%] h-24 w-24 rounded-full border border-crimson/20" />
        <div className="absolute bottom-[12%] right-[10%] h-px w-[58%] rotate-[-4deg] bg-gold/35" />
      </div>
      <div className="relative z-10 grid h-full grid-cols-1 gap-5 p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
        <div className="flex flex-col justify-center">
          <ArchiveLabel eyebrow="Phase 5" title="The Girl in the Wrong World">
            Aarvi lives between two architectures: the timetable built for her and the secret city
            she keeps sketching into existence. In one world she answers roll call. In the other,
            she answers herself.
          </ArchiveLabel>
          <div className="mt-6 max-w-md border-l-4 border-gold bg-paper-warm/80 p-4 font-hand text-2xl leading-tight text-teal shadow-lg">
            The sketchbook is not a hobby. It is the room where her real life breathes.
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onUnlock(0)}
              className="w-fit border border-crimson/30 bg-crimson px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-paper shadow-lg"
            >
              Mark Lore Fragment
            </button>
            <a
              href="/downloads/aarvi/character-lore.txt"
              className="w-fit border border-ink-black/20 bg-paper-warm px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-ink-black shadow-lg"
            >
              Open Character Lore Doc
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {[
            [
              "Want",
              "A studio with wide windows, paid art work, music low, and no one asking her to shrink.",
            ],
            ["Need", "To trust the dream before the world gives it permission."],
            ["Fear", "That the life in her head will stay more real than the one under her feet."],
            ["Truth", "Choosing herself is not betrayal. It is authorship."],
          ].map(([label, text]) => (
            <div
              key={label}
              className="relative overflow-hidden border-l-4 border-gold bg-paper-warm/75 p-4 shadow-md"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full border border-crimson/15" />
              <div className="font-display text-[10px] uppercase tracking-[0.35em] text-crimson">
                {label}
              </div>
              <div className="mt-2 font-serif text-base italic leading-relaxed text-ink-black/82">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function LoreProfileSpread() {
  const outward = ["shy", "soft-spoken", "reserved", "observant", "polite", "hard to read"];
  const inward = [
    "intensely imaginative",
    "emotionally deep",
    "dreamy",
    "secretly rebellious",
    "sensitive",
    "starving for freedom",
  ];
  const columns = [
    { title: "Outwardly", items: outward },
    { title: "Inwardly", items: inward },
  ];

  return (
    <Page tone="paper" className="bg-paper-warm">
      <div className="absolute inset-0 opacity-16">
        <ImagePanel src={studio} alt="Aarvi's inner studio world" fit="cover" />
      </div>
      <div className="absolute inset-0 bg-paper/88" />
      <div className="pointer-events-none absolute inset-5 border border-ink-black/10" />
      <div className="pointer-events-none absolute left-8 top-8 font-scrawl text-4xl text-crimson/25">
        character lore
      </div>
      <div className="relative z-10 grid h-full grid-cols-1 gap-5 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-10">
        <div className="flex flex-col justify-center">
          <div className="font-display text-[10px] uppercase tracking-[0.45em] text-crimson">
            Character Lore Doc
          </div>
          <h2 className="mt-2 font-display text-3xl font-black leading-none text-ink-black md:text-5xl">
            Quiet Outside.
            <br />
            Mythic Within.
          </h2>
          <div className="mt-5 max-w-xl space-y-3 font-serif text-sm leading-relaxed text-ink-black/82 md:text-base">
            <p>
              Aarvi moves through engineering college like a figure pencilled into the wrong panel:
              present, careful, almost transparent. The room has formulas, attendance, fluorescent
              light. Her margins have weather, faces, impossible cities.
            </p>
            <p>
              She speaks softly because most of her voice has learned another language: ink stains,
              unfinished character sheets, playlists under the noise, dance steps practiced where no
              one can watch.
            </p>
            <p>
              The lore names her gently: not a rebel with a raised voice, but a creator with a
              hidden pulse. Someone fragile-looking, but difficult to break.
            </p>
          </div>
          <div className="mt-6 border-l-4 border-crimson bg-paper-warm/90 p-4 font-hand text-2xl leading-tight text-teal shadow-lg">
            "I may look quiet, but my mind is louder than whole cities."
          </div>
          <a
            href="/downloads/aarvi/character-lore.txt"
            className="mt-5 w-fit border border-ink-black/20 bg-ink-black px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-paper shadow-lg"
          >
            Open Full Lore Doc
          </a>
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-3 self-center md:gap-4">
          {columns.map((column) => (
            <div
              key={column.title}
              className="border border-ink-black/10 bg-paper/82 p-4 shadow-xl backdrop-blur-sm"
            >
              <div className="font-display text-[10px] uppercase tracking-[0.35em] text-crimson">
                {column.title}
              </div>
              <div className="mt-4 grid gap-2">
                {column.items.map((item) => (
                  <div
                    key={item}
                    className="border-b border-ink-black/10 pb-1 font-serif text-sm text-ink-black/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function LoreSymbolsSpread() {
  const symbols = [
    ["Glasses", "a quiet lens; she notices what louder people miss"],
    ["Sketchbook", "not a notebook, but a doorway folded into paper"],
    ["Ink marks", "small stains of proof: she was here, she made something"],
    ["Dark layers", "cloth as armor, softness hidden under shadow"],
    ["Dance", "the body saying freedom before the mouth can"],
    ["NYC", "a distant window lit like a promise of self-authorship"],
  ];

  return (
    <Page tone="paper">
      <div className="absolute inset-0 opacity-35">
        <ImagePanel src={worldStory} alt="Aarvi symbolic world board" fit="cover" />
      </div>
      <div className="absolute inset-0 bg-paper/82" />
      <div className="relative z-10 grid h-full grid-cols-1 gap-5 p-6 md:grid-cols-[1fr_1.1fr] md:p-10">
        <div className="flex flex-col justify-center">
          <ArchiveLabel eyebrow="Visual Lore" title="A Girl Carrying Two Worlds">
            The design language keeps doubling her: student and artist, silence and storm, pressure
            and portal. Every prop is a clue to the life she is trying to author.
          </ArchiveLabel>
          <div className="mt-6 border-l-4 border-crimson bg-paper-warm/80 p-4 font-serif text-base italic leading-relaxed text-ink-black/78 shadow-lg">
            Every page is a possible life. Every drawing is a confession disguised as craft. Every
            character she creates carries one small piece of the girl who made them.
          </div>
        </div>
        <div className="grid content-center gap-3">
          {symbols.map(([label, text]) => (
            <div
              key={label}
              className="grid grid-cols-[0.45fr_1fr] gap-3 border border-ink-black/10 bg-paper/82 p-3 shadow-md"
            >
              <div className="font-display text-[10px] uppercase tracking-[0.28em] text-crimson">
                {label}
              </div>
              <div className="font-hand text-lg leading-tight text-teal">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function ComicPage({ plate, index, mode }: { plate: Plate; index: number; mode: string }) {
  return (
    <Page tone="dark" className="!bg-ink-black" openImage={{ src: plate.src, alt: plate.title }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(184,137,47,0.18),transparent_34%),#05060b]" />
      <div className="relative z-10 grid h-full grid-cols-1 gap-4 p-5 md:grid-cols-[0.7fr_1.3fr] md:p-8">
        <div className="flex flex-col justify-center text-paper">
          <div className="font-display text-[10px] uppercase tracking-[0.45em] text-gold">
            {mode} Page {index + 1}
          </div>
          <h2 className="mt-3 font-display text-3xl font-black leading-none md:text-5xl">
            {plate.title}
          </h2>
          <p className="mt-5 max-w-sm font-serif text-sm leading-relaxed text-paper/78 md:text-base">
            {plate.note}
          </p>
          <div className="mt-7 h-px w-36 bg-gold/60" />
        </div>
        <figure
          className="min-h-0 overflow-hidden border border-gold/30 bg-ink-black p-2 shadow-2xl"
          data-open-image-src={plate.src}
          data-open-image-alt={plate.title}
        >
          <ImagePanel src={plate.src} alt={plate.title} fit="contain" />
        </figure>
      </div>
    </Page>
  );
}

function DownloadsSpread({ unlocked }: { unlocked: boolean[] }) {
  const downloads = [
    {
      label: "Download PDF",
      href: "/downloads/aarvi/Aarvi_The_World_in_Her_Margins_Book.pdf",
      note: "the completed printable book",
    },
    {
      label: "Download DOCX",
      href: "/downloads/aarvi/Aarvi_The_World_in_Her_Margins_Book.docx",
      note: "editable source document",
    },
    {
      label: "Character Lore Doc",
      href: "/downloads/aarvi/character-lore.txt",
      note: "full source lore text from Drive",
    },
  ];

  return (
    <Page tone="paper">
      <div className="relative z-10 grid h-full grid-cols-1 gap-5 p-6 md:grid-cols-[1fr_1fr] md:p-10">
        <div className="flex flex-col justify-center">
          <ArchiveLabel eyebrow="Phase 8-9" title="The Book Archive">
            The original PDF, editable Word file, and lore notes are preserved as downloads. The
            interactive version reshapes those materials into a page-turning visual archive.
          </ArchiveLabel>
          <div className="mt-7 grid gap-3">
            {downloads.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group border border-ink-black/15 bg-paper-warm px-4 py-3 shadow-md transition-transform hover:-translate-y-0.5"
              >
                <div className="font-display text-[10px] uppercase tracking-[0.32em] text-crimson">
                  {item.label}
                </div>
                <div className="mt-1 font-hand text-lg text-teal">{item.note}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {["Lore", "Visual Bible", "Comic Run"].map((label, i) => (
            <div key={label} className="border border-ink-black/10 bg-paper/80 p-5 shadow-lg">
              <div className="font-display text-[10px] uppercase tracking-[0.35em] text-crimson">
                Fragment {i + 1}
              </div>
              <div className="mt-2 font-serif text-lg text-ink-black">
                {unlocked[i] ? `${label} marked in your reader.` : `${label} waiting to be marked.`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function CreditsSpread() {
  return (
    <Page tone="dark">
      <div className="absolute inset-0 bg-gradient-radial from-dusk/30 via-transparent to-ink-black" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="font-display text-xs tracking-[0.5em] text-gold">END PLATE</div>
        <h3
          aria-label="Thank you for reading"
          className="mt-2 font-display text-3xl font-black text-paper md:text-5xl"
        >
          THANK YOU FOR
          <br />
          READING
        </h3>
        <div className="mt-6 h-px w-40 bg-gold/60" />
        <div className="mt-6 max-w-md font-serif leading-relaxed text-paper/85">
          This volume now holds the full Drive archive: the early mascot tests, character bible,
          visual-development panels, lore, anime comic, webtoon comic, game comic, and original book
          downloads.
        </div>
        <div
          className="mt-10 font-numeral text-3xl text-ember"
          style={{ animation: "ember-flicker 3s ease-in-out infinite" }}
        >
          END OF VOLUME I
        </div>
      </div>
    </Page>
  );
}

const animePages: Plate[] = [
  {
    src: animeOne,
    title: "The Wrong Classroom",
    note: "the first anime page begins in engineering class",
  },
  { src: animeTwo, title: "Back Home", note: "her private world returns when the day goes quiet" },
  { src: animeThree, title: "The Sketchbook Awakens", note: "the margins start answering back" },
  { src: animeFour, title: "Choosing Herself", note: "the dream stops asking for permission" },
  {
    src: animeFive,
    title: "A New Beginning in New York",
    note: "the future becomes a place with windows",
  },
];

const webtoonPages: Plate[] = [
  {
    src: webtoonOne,
    title: "The Wrong Classroom",
    note: "the vertical comic starts with silence and formulas",
  },
  {
    src: webtoonTwo,
    title: "The World I Escape To",
    note: "her sketchbook opens a softer universe",
  },
  {
    src: webtoonThree,
    title: "Pieces of Me",
    note: "props, dreams, games, dance, and hidden selves gather",
  },
  {
    src: webtoonFour,
    title: "Dreams Have Addresses",
    note: "New York becomes the name of freedom",
  },
  { src: webtoonFive, title: "I'll Get There", note: "not arrival yet, but a promise kept" },
];

const gamePages: Plate[] = [
  {
    src: gameOne,
    title: "The Wrong Classroom",
    note: "game-comic chapter one: trapped in the wrong map",
  },
  { src: gameTwo, title: "The World I Escape To", note: "ink and imagination become her element" },
  { src: gameThree, title: "Pieces of Me", note: "loadout, memory, and identity fragments" },
  { src: gameFour, title: "Dreams Have Addresses", note: "the objective marker points outward" },
  { src: gameFive, title: "I'll Get There", note: "ultimate ability: Masterpiece" },
];

export function renderSpread(
  index: number,
  ctx: {
    onJump: (n: number) => void;
    onUnlock: (i: number) => void;
    signature: string;
    onSign: (s: string) => void;
    unlocked: boolean[];
  },
) {
  const id = SPREADS[index]?.id;

  const animeMatch = id?.match(/^anime-(\d+)$/);
  const webtoonMatch = id?.match(/^webtoon-(\d+)$/);
  const gameMatch = id?.match(/^game-(\d+)$/);

  if (animeMatch) {
    const pageIndex = Number(animeMatch[1]) - 1;
    return <ComicPage plate={animePages[pageIndex]} index={pageIndex} mode="Anime Comic" />;
  }

  if (webtoonMatch) {
    const pageIndex = Number(webtoonMatch[1]) - 1;
    return <ComicPage plate={webtoonPages[pageIndex]} index={pageIndex} mode="Webtoon Comic" />;
  }

  if (gameMatch) {
    const pageIndex = Number(gameMatch[1]) - 1;
    return <ComicPage plate={gamePages[pageIndex]} index={pageIndex} mode="Game Comic" />;
  }

  switch (id) {
    case "cover":
      return <CoverSpread />;
    case "title":
      return <TitleSpread />;
    case "toc":
      return <TocSpread onJump={ctx.onJump} />;
    case "style-tests":
      return (
        <PlateSpread
          eyebrow="Phases 1-3"
          title="Finding Aarvi"
          body="The project began by reading her art language: dark fantasy anime, gothic fashion, glitch/cyber-goth edges, expressive hands and eyes, and a palette of black, burgundy, purple, cyan, white, and gold."
          plates={[
            {
              src: firstCharacter,
              title: "First Personal Character",
              note: "the early clean full-body direction",
            },
            {
              src: mascotSheet,
              title: "Artist Mascot Sheet",
              note: "the first mascot identity pass",
            },
          ]}
        />
      );
    case "personalization":
      return (
        <PlateSpread
          eyebrow="Phase 4"
          title="Making Her Feel Real"
          body="The character became petite, bespectacled, soft-faced, artist-coded, and more hand-drawn. This section keeps the emotional range and outfit identity that made her feel less like a prompt and more like a person."
          plates={[
            {
              src: expressions,
              title: "Expressions of a Creative Soul",
              note: "eight moods and the chaotic artist mode",
              landscape: true,
            },
            {
              src: outfitVariations,
              title: "Outfit Variations",
              note: "casual, cozy, gothic, vintage, and fantasy",
              landscape: true,
            },
          ]}
        />
      );
    case "identity":
      return (
        <PlateSpread
          eyebrow="Phase 4"
          title="Character Bible"
          body="The profile sheets gather the working identity: her objects, posture, palette, references, and the private universe that lives behind her quiet expression."
          plates={[
            {
              src: profileSheet,
              title: "Full Character Profile",
              note: "front view, props, notes, and details",
              landscape: true,
            },
            {
              src: essenceSheet,
              title: "Her Essence",
              note: "the emotional reference board",
              landscape: true,
            },
          ]}
        />
      );
    case "wardrobe":
      return (
        <PlateSpread
          eyebrow="Phase 10"
          title="Outfit Construction"
          body="Her clothes carry the two worlds: practical student layers, cozy artist pieces, and the darker Inkmage shell she wears when imagination turns protective."
          plates={[
            {
              src: outfitBreakdown,
              title: "Outfit Design Breakdown",
              note: "separated garments, accessories, and purpose",
              landscape: true,
            },
            {
              src: inkmageOutfit,
              title: "Inkmage Character Study",
              note: "fantasy clothing, fabric, metal, and magical ink",
              landscape: true,
            },
          ]}
        />
      );
    case "visual-development-one":
      return (
        <PlateSpread
          eyebrow="Phase 10"
          title="Shape and Face"
          body="The visual bible adds professional development boards: silhouettes to test who she could become, then facial construction to keep the character consistent across styles."
          plates={[
            {
              src: silhouetteExploration,
              title: "Silhouette Exploration",
              note: "student, artist, streetwear, dance, and fantasy shapes",
              landscape: true,
            },
            {
              src: faceConstruction,
              title: "Face Construction",
              note: "front, side, three-quarter, glasses, and proportions",
              landscape: true,
            },
          ]}
        />
      );
    case "visual-development-two":
      return (
        <PlateSpread
          eyebrow="Phase 10"
          title="Hair and Hands"
          body="The most expressive details get their own studies: natural waves, tied hair, transformation hair, drawing hands, pencil hands, tablet hands, and spellcasting gestures."
          plates={[
            {
              src: hairDevelopment,
              title: "Hair Development",
              note: "waves, buns, tied hair, and Inkmage transformation",
              landscape: true,
            },
            {
              src: handStudies,
              title: "Hand and Gesture Studies",
              note: "the hands that draw, hide, cast, and choose",
              landscape: true,
            },
          ]}
        />
      );
    case "worlds":
      return (
        <PlateSpread
          eyebrow="Phases 6-7"
          title="Two Worlds"
          body="The lore split into real life and fantasy AU: engineering pressure on one side, magical sketchbook and Inkmage identity on the other."
          plates={[
            {
              src: worldStory,
              title: "Her Essentials, Her World, Her Story",
              note: "props, inner world, and future signals",
              landscape: true,
            },
            {
              src: characterDesign,
              title: "Character Design Exploration",
              note: "final reference language for Aarvi",
              landscape: true,
            },
          ]}
        />
      );
    case "studio-social":
      return (
        <PlateSpread
          eyebrow="Phase 4"
          title="Studio and Voice"
          body="The project expanded beyond the character into the life around her: the warm cluttered studio she wants, and the social templates that imagine her as a working artist."
          plates={[
            {
              src: studio,
              title: "Aarvi's Cozy Artistic Space",
              note: "desk, plants, canvases, notes, brushes, warm light",
              landscape: true,
            },
            {
              src: socialTemplates,
              title: "Artist Social Templates",
              note: "posts, updates, commissions, and art dumps",
              landscape: true,
            },
          ]}
        />
      );
    case "lore":
      return <LoreSpread onUnlock={ctx.onUnlock} />;
    case "lore-profile":
      return <LoreProfileSpread />;
    case "lore-symbols":
      return <LoreSymbolsSpread />;
    case "anime-divider":
      return (
        <SectionDivider
          eyebrow="Phase 7"
          title="Anime Comic"
          body="Five anime-style pages: classroom, home, awakening sketchbook, choosing herself, and the New York beginning."
          image={animeOne}
        />
      );
    case "webtoon-divider":
      return (
        <SectionDivider
          eyebrow="Phase 7"
          title="Webtoon Comic"
          body="The same emotional arc rebuilt as a vertical comic: a private rhythm of panels, inner worlds, fragments, address, and promise."
          image={webtoonTwo}
        />
      );
    case "game-divider":
      return (
        <SectionDivider
          eyebrow="Phase 7"
          title="Game-Style Comic"
          body="A Genshin and Valorant-inspired pass, where Aarvi becomes a playable-feeling creator with ink, control, and the ultimate ability Masterpiece."
          image={gameOne}
        />
      );
    case "final-archive":
      return (
        <PlateSpread
          eyebrow="Phases 8-10"
          title="Final Boards"
          body="The final boards turn the whole journey into a premium character-development archive: the creator's path, the book concept, and the next page of the visual bible."
          plates={[
            {
              src: artistJourney,
              title: "Aarvi: The Artist's Journey",
              note: "from quiet student to world-builder",
            },
            {
              src: journey,
              title: "The Journey of a Creator",
              note: "the broader arc of process and future",
              landscape: true,
            },
          ]}
        />
      );
    case "downloads":
      return <DownloadsSpread unlocked={ctx.unlocked} />;
    case "credits":
      return <CreditsSpread />;
    default:
      return (
        <Page tone="paper">
          <div />
        </Page>
      );
  }
}
