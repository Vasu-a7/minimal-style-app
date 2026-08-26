import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ItemCard } from "@/components/ItemCard";
import { items } from "@/lib/items";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved — Aesthet." },
      { name: "description", content: "Your saved curations and objects." },
      { property: "og:title", content: "Saved — Aesthet." },
      { property: "og:description", content: "Your saved curations and objects." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const savedItems = items.slice(0, 2);

  return (
    <>
      <AppHeader title="Saved" />
      <main id="main" className="mx-auto max-w-md px-6 pb-32 pt-8">
        <p className="mb-8 text-sm text-muted-foreground">
          {savedItems.length} pieces in your collection
        </p>
        <div className="space-y-12">
          {savedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}
