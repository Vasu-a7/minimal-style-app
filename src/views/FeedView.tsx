import { useEffect, useState } from "react";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type Challenge = Tables<"challenges">;

const statusStyles: Record<Challenge["status"], string> = {
  open: "bg-emerald-100 text-emerald-800",
  assigned: "bg-sky-100 text-sky-800",
  under_review: "bg-amber-100 text-amber-800",
  active: "bg-indigo-100 text-indigo-800",
  resolved: "bg-slate-100 text-slate-700",
};

function formatStatus(status: Challenge["status"]) {
  return status.replaceAll("_", " ");
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {challenge.category}
          </span>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-card-foreground">
            {challenge.title}
          </h2>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[challenge.status]}`}
        >
          {formatStatus(challenge.status)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{challenge.description}</p>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="size-2 rounded-full bg-primary" aria-hidden />
        {challenge.location_text ?? "Location to be confirmed"}
      </p>
    </article>
  );
}

function ChallengeCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-5">
      <div className="h-6 w-24 rounded-full bg-muted" />
      <div className="mt-5 h-6 w-3/4 rounded bg-muted" />
      <div className="mt-3 h-4 w-full rounded bg-muted" />
      <div className="mt-2 h-4 w-5/6 rounded bg-muted" />
      <div className="mt-5 h-4 w-32 rounded bg-muted" />
    </div>
  );
}

export function FeedView() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadChallenges() {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isCurrent) return;

      if (error) {
        setErrorMessage("We couldn't load the challenges right now. Please try again.");
      } else {
        setChallenges(data ?? []);
      }
      setIsLoading(false);
    }

    void loadChallenges();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Community feed
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Current challenges
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          See what your community is working on and find a way to contribute.
        </p>
      </header>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2" aria-label="Loading challenges">
          <ChallengeCardSkeleton />
          <ChallengeCardSkeleton />
          <ChallengeCardSkeleton />
          <ChallengeCardSkeleton />
        </div>
      )}

      {!isLoading && errorMessage && (
        <div
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
        >
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && challenges.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <h2 className="font-semibold text-foreground">No challenges yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New community challenges will appear here.
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && challenges.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </section>
  );
}
