import { Link } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import avatar from "@/assets/avatar.jpg";

export function AppHeader({ title }: { title?: string }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        {title ? (
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              CC
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Civic Commons</span>
            <span className="font-serif text-xl tracking-tight sm:hidden">{title}</span>
          </Link>
        ) : (
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              CC
            </span>
            <span className="text-sm font-semibold tracking-tight">Civic Commons</span>
          </Link>
        )}
        <div className="flex items-center gap-2">
          {searchOpen && (
            <input
              autoFocus
              type="search"
              placeholder="Search challenges"
              aria-label="Search challenges"
              className="hidden h-10 w-48 rounded-xl border border-border bg-card px-3 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-4 sm:block"
            />
          )}
          <button
            type="button"
            aria-label="Search challenges"
            onClick={() => setSearchOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="size-[18px]" strokeWidth={1.8} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="View notifications"
            className="relative hidden size-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
          >
            <Bell className="size-[18px]" strokeWidth={1.8} aria-hidden />
            <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-amber-500" />
          </button>
          <Link
            to="/profile"
            aria-label="Open your profile"
            className="size-10 overflow-hidden rounded-full border border-border bg-muted"
          >
            <img src={avatar} alt="" width={512} height={512} className="size-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
}
