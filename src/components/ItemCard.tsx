import { useState } from "react";
import { Heart } from "lucide-react";
import type { FeedItem } from "@/lib/items";

export function ItemCard({ item }: { item: FeedItem }) {
  const [saved, setSaved] = useState(false);

  return (
    <article>
      <div
        className={`mb-4 overflow-hidden rounded-2xl bg-muted ${
          item.aspect === "portrait" ? "aspect-[4/5]" : "aspect-square"
        }`}
      >
        <img
          src={item.image}
          alt={item.title}
          width={item.width}
          height={item.height}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {item.category}
          </span>
          <h3 className="mt-1 text-lg font-medium tracking-tight">{item.title}</h3>
          <p className="text-sm text-muted-foreground">
            {item.creator} &bull; ${item.price}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border transition-colors"
        >
          <Heart
            className={`size-4 ${saved ? "fill-foreground text-foreground" : "text-foreground"}`}
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </div>
    </article>
  );
}
