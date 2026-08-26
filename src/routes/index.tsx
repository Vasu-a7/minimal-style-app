import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ItemCard } from "@/components/ItemCard";
import { items } from "@/lib/items";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aesthet. — Curated Collection" },
      {
        name: "description",
        content:
          "Browse a curated collection of minimalist objects, artwork, and furniture from independent makers.",
      },
      { property: "og:title", content: "Aesthet. — Curated Collection" },
      {
        property: "og:description",
        content:
          "Browse a curated collection of minimalist objects, artwork, and furniture from independent makers.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <AppHeader />
      <main id="main" className="mx-auto max-w-md px-6 pb-32 pt-8">
        <div className="mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Discover
          </span>
          <h1 className="mt-2 font-serif text-4xl">
            Curated
            <br />
            Collection
          </h1>
        </div>
        <div className="space-y-12">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}
