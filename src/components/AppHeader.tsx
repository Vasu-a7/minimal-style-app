import { Link } from "@tanstack/react-router";
import avatar from "@/assets/avatar.jpg";

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between px-6 py-4">
        {title ? (
          <span className="font-serif text-2xl tracking-tight">{title}</span>
        ) : (
          <Link to="/" className="font-serif text-2xl italic tracking-tight">
            Aesthet.
          </Link>
        )}
        <Link
          to="/profile"
          aria-label="Open your profile"
          className="size-10 overflow-hidden rounded-full border border-border bg-muted"
        >
          <img
            src={avatar}
            alt=""
            width={512}
            height={512}
            className="size-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
