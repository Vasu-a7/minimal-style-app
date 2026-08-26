import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import avatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Elena Rossi — Aesthet." },
      {
        name: "description",
        content: "Profile of Elena Rossi, independent curator of sculptural forms.",
      },
      { property: "og:title", content: "Elena Rossi — Aesthet." },
      {
        property: "og:description",
        content: "Profile of Elena Rossi, independent curator of sculptural forms.",
      },
    ],
  }),
  component: ProfilePage,
});

const settings = [
  "Collection Preferences",
  "Notifications",
  "Interface Language",
  "Accessibility",
  "Privacy",
];

function ProfilePage() {
  return (
    <>
      <AppHeader title="Profile" />
      <main id="main" className="mx-auto max-w-md px-6 pb-32 pt-10">
        <div className="flex flex-col items-center text-center">
          <img
            src={avatar}
            alt="Portrait of Elena Rossi"
            width={512}
            height={512}
            className="mb-6 size-24 rounded-full object-cover outline-1 -outline-offset-1 outline-border"
          />
          <h1 className="font-serif text-2xl tracking-tight">Elena Rossi</h1>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Independent curator focusing on sculptural forms and architectural
            photography.
          </p>
          <div className="mt-8 flex gap-8">
            <div className="text-center">
              <span className="block font-serif text-xl">1.2k</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Followers
              </span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-xl">48</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Curations
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-12 space-y-1 border-t border-border">
          {settings.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between border-b border-border py-4 text-left"
              >
                <span className="text-sm font-medium">{label}</span>
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex min-h-11 w-full items-center py-4 text-left text-destructive"
            >
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </li>
        </ul>
      </main>
    </>
  );
}
