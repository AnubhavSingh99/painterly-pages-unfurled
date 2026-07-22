import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import deskBook from "@/assets/aarvi/first-character.png";
import {
  DustField,
  GrainOverlay,
  ParallaxLayer,
  ParallaxScene,
  Vignette,
} from "@/components/atoms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The World in Her Margins - complete creation archive" },
      {
        name: "description",
        content:
          "Open Aarvi's complete interactive creation archive: style studies, character sheets, lore, anime pages, webtoon pages, game comics, and book downloads.",
      },
      { property: "og:title", content: "The World in Her Margins - complete creation archive" },
      {
        property: "og:description",
        content:
          "Move through Aarvi's full creation order, from first character studies to the finished comic and book archive.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeskPage,
});

function DeskPage() {
  const [opening, setOpening] = useState(false);

  return (
    <main className="fixed inset-0 overflow-hidden bg-ink-black text-paper">
      {/* Deep atmosphere background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 55%, #372139 0%, #121425 45%, #05070d 100%)",
        }}
      />

      <ParallaxScene className="relative h-full w-full" strength={18}>
        {/* Back layer — soft god-rays */}
        <ParallaxLayer depth={0.3} className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[110%] h-[80%] opacity-25"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(214,58,143,0.28) 10deg, transparent 30deg, transparent 330deg, rgba(184,137,47,0.35) 350deg, transparent 360deg)",
              filter: "blur(30px)",
            }}
          />
        </ParallaxLayer>

        {/* Desk + book image */}
        <ParallaxLayer depth={0.7} className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative transition-all duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
              opening ? "scale-[1.6] blur-[1px] opacity-40" : "scale-100"
            }`}
            style={{ transformOrigin: "50% 55%" }}
          >
            <img
              src={deskBook}
              alt="Aarvi character illustration"
              width={1600}
              height={1008}
              className="max-h-[78vh] w-auto rounded-sm border border-paper/20 object-contain ink-drop-shadow"
              draggable={false}
            />
          </div>
        </ParallaxLayer>

        {/* Dust in front */}
        <ParallaxLayer depth={1.6} className="absolute inset-0 pointer-events-none">
          <DustField count={38} />
        </ParallaxLayer>

        {/* Title, top */}
        <div className="pointer-events-none absolute top-8 md:top-12 left-1/2 -translate-x-1/2 text-center z-20">
          <div className="font-display text-[10px] md:text-xs tracking-[0.6em] text-gold/80">
            VOLUME · I
          </div>
          <h1 className="mt-2 font-display font-black text-paper text-3xl md:text-5xl leading-none drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]">
            THE WORLD IN HER MARGINS
          </h1>
          <div className="mt-2 font-hand text-xl md:text-2xl text-paper/80">
            the complete character archive, from first sketch to comic universe.
          </div>
        </div>

        {/* CTA, bottom */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-700 ${
            opening ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link
            to="/read"
            onClick={() => {
              setOpening(true);
            }}
            className="brass-button group rounded-sm px-6 py-3 font-display text-xs md:text-sm tracking-[0.5em] uppercase text-paper flex items-center gap-3"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-ember"
              style={{
                animation: "ember-flicker 1.6s ease-in-out infinite",
                boxShadow: "0 0 12px var(--color-ember)",
              }}
            />
            Open the Archive
            <span
              className="inline-block h-2 w-2 rounded-full bg-ember"
              style={{
                animation: "ember-flicker 1.4s ease-in-out infinite",
                boxShadow: "0 0 12px var(--color-ember)",
              }}
            />
          </Link>
          <div className="mt-4 font-hand text-lg text-paper/60">
            (or press <span className="text-gold">→</span> to turn a page inside)
          </div>
        </div>
      </ParallaxScene>

      <Vignette />
      <GrainOverlay />

      {/* Corner ambient hints */}
      <div className="pointer-events-none absolute bottom-3 left-4 font-display text-[10px] tracking-[0.4em] text-paper/40">
        COMPLETE CREATION ARCHIVE
      </div>
      <div className="pointer-events-none absolute bottom-3 right-4 font-hand text-sm text-paper/50">
        Aarvi, mmxxvi
      </div>
    </main>
  );
}
