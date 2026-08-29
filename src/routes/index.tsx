import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { FeedView } from "@/views/FeedView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Civic Commons — Community Challenges" },
      {
        name: "description",
        content: "Discover and join community-led challenges making neighborhoods better.",
      },
      { property: "og:title", content: "Civic Commons — Community Challenges" },
      {
        property: "og:description",
        content: "Discover and join community-led challenges making neighborhoods better.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <AppHeader />
      <main id="main" className="mx-auto max-w-6xl px-5 pb-32 pt-8 lg:px-8 lg:pt-12">
        <section className="grid gap-6 lg:grid-cols-[1fr_310px] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Tuesday, September 24
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              Small actions.
              <br />
              <span className="text-primary">Visible change.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Find a challenge near you, lend your perspective, and help shape the places we share.
            </p>
          </div>
          <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-[0_16px_35px_-20px_var(--primary)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-primary-foreground/70">Your civic streak</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">12 days</p>
              </div>
              <span className="rounded-lg bg-white/15 px-2 py-1 text-xs font-semibold">
                +2 this week
              </span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-3/4 rounded-full bg-amber-300" />
            </div>
            <p className="mt-3 text-xs text-primary-foreground/70">
              You are 3 actions away from Community Builder.
            </p>
          </div>
        </section>

        <FeedView />
      </main>
    </>
  );
}
