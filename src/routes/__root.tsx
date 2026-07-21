import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 paper-dark">
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-8xl font-display text-ember">404</h1>
        <h2 className="mt-4 text-xl font-serif text-paper">This page is torn out</h2>
        <p className="mt-2 text-sm text-muted-foreground font-hand text-lg">
          The Codex has no record of it. Return to the desk.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="brass-button hover:[filter:brightness(1.15)] inline-flex items-center justify-center rounded-sm px-5 py-2 text-sm font-display tracking-widest uppercase"
          >
            Back to the Desk
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 paper-dark">
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-2xl font-display tracking-widest uppercase text-ember">
          The ink smudged
        </h1>
        <p className="mt-3 text-sm text-muted-foreground font-hand text-lg">
          Something went wrong turning this page. Try again, or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="brass-button rounded-sm px-5 py-2 text-sm font-display tracking-widest uppercase"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-sm border border-gold/40 bg-transparent px-5 py-2 text-sm font-display tracking-widest uppercase text-paper hover:bg-gold/10"
          >
            The Desk
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#08090f" },
      { title: "The Ink & Ember Codex — an interactive painterly book" },
      { property: "og:title", content: "The Ink & Ember Codex — an interactive painterly book" },
      { name: "twitter:title", content: "The Ink & Ember Codex — an interactive painterly book" },
      { name: "description", content: "Open a hand-painted digital sketchbook found in a fantasy-industrial workshop. Turn pages, uncover hidden ink, and read Vess Marlow's story in three illustrated chapters." },
      { property: "og:description", content: "Open a hand-painted digital sketchbook found in a fantasy-industrial workshop. Turn pages, uncover hidden ink, and read Vess Marlow's story in three illustrated chapters." },
      { name: "twitter:description", content: "Open a hand-painted digital sketchbook found in a fantasy-industrial workshop. Turn pages, uncover hidden ink, and read Vess Marlow's story in three illustrated chapters." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f4b6a43f-c0a4-4594-bf4c-90bba0bea748/id-preview-2ec50111--308df762-5f13-4368-8b90-ae28798de06e.lovable.app-1784650039664.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f4b6a43f-c0a4-4594-bf4c-90bba0bea748/id-preview-2ec50111--308df762-5f13-4368-8b90-ae28798de06e.lovable.app-1784650039664.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Uncial+Antiqua&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Caveat:wght@400;600;700&family=Reenie+Beanie&family=Permanent+Marker&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
