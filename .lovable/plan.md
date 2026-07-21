
# The Ink & Ember Codex — Interactive Painterly Book

An immersive digital book that opens on an artist's desk in a fantasy-industrial city, unfolds through 3 hand-illustrated chapters, and rewards curiosity with hidden sketches, annotations, and ambient sound.

## The story I'll write (placeholder — swappable later)

**Title:** *The Ink & Ember Codex*
**Tagline:** "Found in a workshop above the Copperline, half-finished, still warm."

The recovered sketchbook of Vess Marlow — a young paint-runner in the smog-lit district of Copperline — who tags forbidden murals across factory walls and one night discovers her ink starts moving on its own.

- **Chapter I — Copperline After Dark** — the city, her crew, the first living mural
- **Chapter II — The Machinist's Debt** — a bargain with the clockwork underground
- **Chapter III — What the Ink Remembers** — the confrontation, an unfinished ending

3 chapters × ~3 spreads each + cover, title, TOC, gallery, credits ≈ 12 spreads.

## Experience flow

```text
  Homepage (desk scene)
        │  click "Open the Book"
        ▼
  Cover ─► Title ─► TOC ─► Ch I ─► Ch II ─► Ch III ─► Gallery ─► Credits
                            ▲                                        │
                            └──── tabs / arrow keys / swipe / TOC ───┘
```

## Homepage (the desk)

Fixed cinematic scene, no scroll.
- Centered closed hardcover with visible spine, gilded corners, worn leather, torn ribbon
- Desk: charcoal wood, ring-stained; scattered painted objects — brass compass, snapped charcoal, folded letter, enamel mug, a moth
- Parallax layers on mouse-move: desk (deep) / book (mid) / dust + god-rays (front)
- Ambient loop: distant machinery + rain (off by default, toggle in corner)
- CTA: "Open the Book" — engraved brass plate, hover ignites a small ember
- Click → camera pushes in, cover lifts with paper-curl, crossfade into Chapter I opener

## The book reader

- **Desktop**: two-page spread, gutter shadow, corner curls on hover, edge shading suggests thickness
- **Tablet**: same spread, tighter margins
- **Mobile**: single page, swipe nav; textures & typography preserved

**Turn controls:**
- Click/drag outer corner (curl follows pointer, snaps past midpoint)
- ← / → arrow keys
- Touch swipe
- Painted paper chapter tabs down the right edge
- Bottom brass progress slider (spread N of total)
- Bookmark ribbon marks current spread
- `localStorage` remembers last spread; reopening resumes

**Chrome** (engraved-metal, corners of viewport):
- TOC button (top-left) → inked contents overlay
- Sound + music toggles (top-right)
- Fullscreen toggle
- Current spread / chapter indicator (bottom-left)

## The spreads

Each mixes a generated hero illustration + CSS/SVG texture layers + typography + 1–3 hidden interactions.

| # | Spread | Composition | Interaction |
|---|--------|-------------|-------------|
| 0 | Cover | Full-bleed painted cover, embossed title, ribbon | Opens on click |
| 1 | Title + colophon | Off-white paper, ink title, small vignette | Moth flickers on hover |
| 2 | Table of contents | Handwritten list, torn edge | Row click → animated jump |
| 3 | Ch I opener | Copperline skyline at dusk (full spread) | Parallax on cursor, neon sign flickers |
| 4 | Ch I text | L: Vess character sketch + notes / R: serif body copy on paper | Sketch labels reveal on hover; ember behind paint splash reveals a memory card |
| 5 | Ch I dialogue | Two vertical comic panels w/ painted speech shapes | Click to advance dialogue |
| 6 | Ch II opener | Underground workshop, brass machinery | Slow gears; hidden pull-chain plays a clank |
| 7 | Ch II scrapbook | Photograph, blueprint, receipt, pinned note | Drag pinned items; one hides a sketch collectible |
| 8 | Ch II character | Machinist portrait + stats-style annotations | Portrait breathes; annotations reveal on hover |
| 9 | Ch III opener | Rain, murals waking up on a factory wall | SVG stroke-dashoffset animates ink on entry |
| 10 | Ch III climax | Wide landscape panel, dramatic light | Lightning strike on view; final line typewrites |
| 11 | Ch III closing | Torn page, unfinished sketch, "…" | Reader "signs" the margin (localStorage) |
| 12 | Gallery | Grid of concept sketches | Locked/unlocked; click to view large in paper frame |
| 13 | Credits | Painted end-plate | Slow zoom back out to the desk |

Collectibles: 3 hidden sketch fragments (one per chapter), tracked in Gallery.

## Art direction system

**Palette (tokens in `styles.css`):**
- `--ink-navy` #0e1424, `--ink-black` #0a0a0f, `--dusk-purple` #3b2a4a, `--teal-muted` #2e5a5a, `--ember` #c1502a, `--crimson` #7a1e2a, `--gold-antique` #b8892f, `--paper-cream` #efe4c9, `--paper-warm` #d8c69a
- Accents (sparingly): `--cyan-arc` #4fd6e6, `--magenta-arc` #d63a8f

**Typography** (loaded via `<link>` in `__root.tsx`, referenced via `--font-*` in `@theme`):
- Display: Cinzel Decorative + Uncial Antiqua (oversized numerals)
- Body serif: Fraunces
- Handwritten: Caveat + Reenie Beanie
- Marker labels: Permanent Marker

**Texture stack (per page, layered):**
1. Base paper — SVG grain + warm gradient
2. Ink bleed — SVG turbulence around text blocks
3. Paint stroke masks behind headings
4. Global film grain — fixed overlay, `mix-blend-mode: overlay`, ~12fps
5. Soft vignette
6. Dust particles — 20–30 motes drifting; pauses on `prefers-reduced-motion`

## Illustrations (mix strategy — per your choice)

Generate ~10 hero assets (agent-side, premium painterly, no franchise refs):
Cover / Desk book / Copperline skyline / Vess portrait / Ch I dialogue backdrop / Workshop / Machinist portrait / Factory wall in rain / Climax landscape / Gallery concept sheet.

Everything else — paper tabs, brass buttons, splashes, torn edges, dust, gears, ribbon, ink drips — SVG + CSS. Per-chapter lazy-load with blurred placeholder.

## Motion & interactions

- Framer Motion for page-turn (rotateY around gutter, curved with CSS 3D perspective + gradient shadow during turn)
- Parallax: damped `transform` on layers, cursor/tilt driven
- Hover reveals: annotation fade + slight ink-bleed grow
- Chapter transitions: 600ms crossfade with an animated SVG mask wipe
- Ambient audio: one loop per chapter (rain / machinery / wind), muted by default
- `prefers-reduced-motion`: page-turn becomes fade, dust off, breathing off, no parallax

## Persistence (`localStorage`, `codex:v1:*`)

`currentSpread`, `unlockedFragments`, `signature`, `soundEnabled`, `musicEnabled`

## Component architecture

```text
src/routes/
  __root.tsx           fonts + global grain/vignette overlays
  index.tsx            Desk / homepage
  read.tsx             Book reader shell
  read.$spread.tsx     Deep-linkable spread

src/components/book/
  BookShell, PageSpread, ChapterTabs, ProgressRibbon,
  BookmarkRibbon, TocOverlay, SoundControls, Collectibles

src/components/spreads/
  CoverSpread, TitleSpread, TocSpread,
  Ch1Opener, Ch1Text, Ch1Dialogue,
  Ch2Opener, Ch2Scrapbook, Ch2Character,
  Ch3Opener, Ch3Climax, Ch3Closing,
  GallerySpread, CreditsSpread

src/components/atoms/
  PaintStroke, TornEdge, InkBleed, DustField,
  BrassButton, PaperTab, AnnotationCallout, HiddenReveal

src/components/scene/
  DeskScene

src/lib/
  bookState.ts (localStorage store)
  spreads.ts (ordered spread metadata)
  useKeyboardNav, useSwipeNav, usePageTurn
  audio.ts (single AudioContext, per-chapter swap)
```

## SEO / metadata

- `/` — "The Ink & Ember Codex — an interactive painterly book", og:image = cover art URL
- `/read` — "Read — The Ink & Ember Codex", og:image = Ch I opener
- `/read/$spread` — per-spread title/description from `spreads.ts`, og:image = that spread's hero
- Root gets no og:image (leaf-only rule)

## Accessibility

- Every hidden interaction has a TOC equivalent ("View all annotations for this spread")
- WCAG AA body text (dark ink on cream)
- Reduced motion: static crossfades, no dust/breathing/parallax
- Sound off by default; controls always visible

## Build order

1. Tokens, fonts, texture atoms (PaintStroke, TornEdge, DustField, BrassButton, PaperTab)
2. Generate 10 hero illustrations in parallel
3. `DeskScene` homepage with parallax + Open-the-Book transition
4. `BookShell` + `PageSpread` (page-turn, keyboard/swipe/tabs, ribbon, bookmark)
5. Cover / Title / TOC
6. Ch I spreads + collectible #1
7. Ch II spreads + collectible #2
8. Ch III spreads + collectible #3 + signature input
9. Gallery + Credits
10. Ambience audio, sound controls, reduced-motion pass, persistence, per-route SEO
11. Mobile pass (single-page reader, swipe tuning)

## Out of scope for v1

- Multi-language
- User accounts / cloud sync
- 3rd-party page-flip physics library
- Voice-over narration
