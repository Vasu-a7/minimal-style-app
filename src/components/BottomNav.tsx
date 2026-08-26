import { Link } from "@tanstack/react-router";
import { Home, Compass, Bookmark, User, Plus } from "lucide-react";

const linkClass =
  "flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 transition-opacity";

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-8">
        <Link
          to="/"
          aria-label="Home"
          className={linkClass}
          activeOptions={{ exact: true }}
          activeProps={{ className: `${linkClass} text-foreground` }}
          inactiveProps={{ className: `${linkClass} text-foreground/40 hover:text-foreground/70` }}
        >
          <Home className="size-5" strokeWidth={1.75} aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <Link
          to="/explore"
          aria-label="Explore"
          className={linkClass}
          activeProps={{ className: `${linkClass} text-foreground` }}
          inactiveProps={{ className: `${linkClass} text-foreground/40 hover:text-foreground/70` }}
        >
          <Compass className="size-5" strokeWidth={1.75} aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Explore</span>
        </Link>
        <Link
          to="/profile"
          aria-label="Create a new curation"
          className="flex min-h-11 items-center rounded-full bg-primary px-5 text-primary-foreground"
        >
          <Plus className="mr-1 size-4" strokeWidth={2} aria-hidden />
          <span className="text-xs font-semibold tracking-wide">Create</span>
        </Link>
        <Link
          to="/saved"
          aria-label="Saved items"
          className={linkClass}
          activeProps={{ className: `${linkClass} text-foreground` }}
          inactiveProps={{ className: `${linkClass} text-foreground/40 hover:text-foreground/70` }}
        >
          <Bookmark className="size-5" strokeWidth={1.75} aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Saved</span>
        </Link>
        <Link
          to="/profile"
          aria-label="Profile"
          className={linkClass}
          activeProps={{ className: `${linkClass} text-foreground` }}
          inactiveProps={{ className: `${linkClass} text-foreground/40 hover:text-foreground/70` }}
        >
          <User className="size-5" strokeWidth={1.75} aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
