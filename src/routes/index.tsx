import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import deskBook from "@/assets/desk-book.jpg";
import { DustField, GrainOverlay, ParallaxLayer, ParallaxScene, Vignette } from "@/components/atoms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Ink & Ember Codex — an interactive painterly book" },
      {
        name: "description",
        content:
          "Open a hand-painted digital sketchbook found in a fantasy-industrial workshop. Turn pages, uncover hidden ink, and read Vess Marlow's story in three illustrated chapters.",
      },
      { property: "og:title", content: "The Ink & Ember Codex — an interactive painterly book" },
      {
        property: "og:description",
        content:
          "Open a hand-painted digital sketchbook found in a fantasy-industrial workshop. Turn pages, uncover hidden ink, and read Vess Marlow's story in three illustrated chapters.",
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
          background:
            "radial-gradient(ellipse at 50% 55%, #2a1e33 0%, #0e1424 45%, #05070d 100%)",
        }}
      />

      <ParallaxScene className="relative h-full w-full" strength={18}>
        {/* Back layer — soft god-rays */}
        <ParallaxLayer depth={0.3} className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[110%] h-[80%] opacity-25"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(193,80,42,0.35) 10deg, transparent 30deg, transparent 330deg, rgba(184,137,47,0.35) 350deg, transparent 360deg)",
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
              alt="Closed antique hardcover book resting on an artist's desk"
              width={1600}
              height={1008}
              className="max-h-[80vh] w-auto ink-drop-shadow"
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
            THE INK &amp; EMBER CODEX
          </h1>
          <div className="mt-2 font-hand text-xl md:text-2xl text-paper/80">
            found in a workshop above the Copperline — half-finished, still warm.
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
              style={{ animation: "ember-flicker 1.6s ease-in-out infinite", boxShadow: "0 0 12px var(--color-ember)" }}
            />
            Open the Book
            <span
              className="inline-block h-2 w-2 rounded-full bg-ember"
              style={{ animation: "ember-flicker 1.4s ease-in-out infinite", boxShadow: "0 0 12px var(--color-ember)" }}
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
        AN INTERACTIVE PAINTERLY BOOK
      </div>
      <div className="pointer-events-none absolute bottom-3 right-4 font-hand text-sm text-paper/50">
        est. Copperline, mmxxvi
      </div>
    </main>
  );
}
