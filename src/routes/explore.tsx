import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { items } from "@/lib/items";

const categories = ["All", "Ceramics", "Artwork", "Furniture", "Photography"];

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Aesthet." },
      {
        name: "description",
        content: "Explore ceramics, artwork, furniture, and photography by category.",
      },
      { property: "og:title", content: "Explore — Aesthet." },
      {
        property: "og:description",
        content: "Explore ceramics, artwork, furniture, and photography by category.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  return (
    <>
      <AppHeader title="Explore" />
      <main id="main" className="mx-auto max-w-md px-6 pb-32 pt-6">
        <div
          role="group"
          aria-label="Categories"
          className="mb-8 flex gap-2 overflow-x-auto pb-1"
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              aria-pressed={i === 0}
              className={`min-h-11 whitespace-nowrap rounded-full px-4 text-xs font-medium ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              to="/"
              aria-label={`${item.title} by ${item.creator}`}
              className="group"
            >
              <div className="mb-2 aspect-square overflow-hidden rounded-2xl bg-muted">
                <img
                  src={item.image}
                  alt=""
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <h2 className="text-sm font-medium tracking-tight">{item.title}</h2>
              <p className="text-xs text-muted-foreground">${item.price}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
