import { useEffect, useMemo, useRef, useState, type ReactNode, type CSSProperties } from "react";

/* ============================================================
   Global overlays: film grain, vignette, dust
   ============================================================ */

export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden />;
}

export function Vignette() {
  return <div className="vignette" aria-hidden />;
}

export function DustField({ count = 26, className = "" }: { count?: number; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        top: 40 + Math.random() * 60,
        size: 1 + Math.random() * 2.5,
        delay: -Math.random() * 12,
        duration: 10 + Math.random() * 14,
        dx: (Math.random() - 0.5) * 120,
        dy: -80 - Math.random() * 200,
        opacity: 0.3 + Math.random() * 0.5,
        i,
      })),
    [count]
  );
  if (!mounted) return <div className={`pointer-events-none absolute inset-0 z-30 ${className}`} aria-hidden />;
  return (
    <div className={`pointer-events-none absolute inset-0 z-30 overflow-hidden ${className}`} aria-hidden>
      {motes.map((m) => (
        <span
          key={m.i}
          className="absolute rounded-full bg-paper"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            opacity: m.opacity,
            boxShadow: "0 0 4px rgba(239,228,201,0.6)",
            animation: `dust-drift ${m.duration}s linear ${m.delay}s infinite`,
            ["--dx" as any]: `${m.dx}px`,
            ["--dy" as any]: `${m.dy}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Brass button — engraved metal control
   ============================================================ */

export function BrassButton({
  children,
  onClick,
  className = "",
  title,
  ariaLabel,
  as = "button",
  href,
  small = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  ariaLabel?: string;
  as?: "button" | "a";
  href?: string;
  small?: boolean;
}) {
  const cls = `brass-button rounded-sm font-display uppercase tracking-[0.2em] text-paper transition-all hover:brightness-110 hover:-translate-y-px active:translate-y-0 ${
    small ? "px-3 py-1.5 text-[10px]" : "px-5 py-2.5 text-xs"
  } ${className}`;
  if (as === "a") {
    return (
      <a href={href} title={title} aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} title={title} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

/* ============================================================
   Paint stroke — SVG brush shape behind headings/labels
   ============================================================ */

export function PaintStroke({
  color = "var(--color-ember)",
  className = "",
  seed = 1,
}: {
  color?: string;
  className?: string;
  seed?: number;
}) {
  // A few variants, quick pseudo-random by seed
  const paths = [
    "M8,42 C60,10 220,8 330,30 C420,48 480,20 520,32 C400,54 200,60 40,58 C22,58 12,52 8,42 Z",
    "M10,36 C80,60 240,60 340,42 C440,26 500,50 528,38 C420,20 220,14 60,26 C30,30 14,30 10,36 Z",
    "M6,40 C100,18 260,18 360,32 C440,42 500,28 530,40 C440,58 240,64 80,54 C40,52 14,48 6,40 Z",
  ];
  const d = paths[seed % paths.length];
  return (
    <svg
      viewBox="0 0 540 72"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
      aria-hidden
    >
      <path d={d} fill={color} opacity="0.9" />
    </svg>
  );
}

/* ============================================================
   Torn paper top/bottom edge
   ============================================================ */

export function TornEdge({
  position = "bottom",
  color = "var(--color-paper)",
  className = "",
}: {
  position?: "top" | "bottom";
  color?: string;
  className?: string;
}) {
  const d =
    position === "bottom"
      ? "M0,0 L0,10 C40,4 90,16 140,10 C200,2 260,18 320,10 C380,2 440,20 500,12 C560,4 620,18 700,10 L700,0 Z"
      : "M0,20 C60,8 120,22 190,14 C260,6 330,22 400,14 C470,6 540,20 620,12 C660,8 690,14 700,10 L700,20 Z";
  return (
    <svg
      viewBox="0 0 700 20"
      preserveAspectRatio="none"
      className={`absolute left-0 w-full h-4 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      aria-hidden
    >
      <path d={d} fill={color} />
    </svg>
  );
}

/* ============================================================
   Hidden reveal — click a hotspot to unveil content
   ============================================================ */

export function HiddenReveal({
  hint,
  children,
  className = "",
  onReveal,
}: {
  hint: ReactNode;
  children: ReactNode;
  className?: string;
  onReveal?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`group relative text-left transition-transform ${className}`}
      onClick={() => {
        setOpen((v) => !v);
        if (!open) onReveal?.();
      }}
      aria-expanded={open}
    >
      <span className={`block transition-opacity ${open ? "opacity-0" : "opacity-100"}`}>
        {hint}
      </span>
      {open && (
        <span
          className="absolute inset-0 flex items-center justify-center animate-[fade-up_0.4s_ease-out]"
          style={{ animationFillMode: "both" }}
        >
          {children}
        </span>
      )}
    </button>
  );
}

/* ============================================================
   Parallax layer container — moves layers on mouse
   ============================================================ */

export function ParallaxScene({
  children,
  className = "",
  strength = 20,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tx = nx;
      ty = ny;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--px", String(tx));
          el.style.setProperty("--py", String(ty));
        });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ["--px" as any]: 0, ["--py" as any]: 0, ["--parallax" as any]: strength }}
    >
      {children}
    </div>
  );
}

export function ParallaxLayer({
  depth = 1,
  children,
  className = "",
}: {
  depth?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        transform:
          "translate3d(calc(var(--px, 0) * var(--parallax, 20px) * " +
          depth +
          " * -1px), calc(var(--py, 0) * var(--parallax, 20px) * " +
          depth +
          " * -1px), 0)",
        transition: "transform 120ms ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
