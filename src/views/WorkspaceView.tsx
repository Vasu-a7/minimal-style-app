import { useEffect, useState } from "react";
import { ArrowRight, CircleDot, LoaderCircle } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type BoardStatus = "open" | "under_review" | "active";
type Challenge = Tables<"challenges">;

const boardColumns: Array<{
  status: BoardStatus;
  label: string;
  description: string;
}> = [
  { status: "open", label: "Open", description: "Newly reported by the community" },
  { status: "under_review", label: "Under review", description: "Being assessed by your team" },
  { status: "active", label: "Active", description: "Work is currently underway" },
];

const nextStatus: Partial<Record<BoardStatus, BoardStatus>> = {
  open: "under_review",
  under_review: "active",
};

function formatStatus(status: BoardStatus) {
  return status === "under_review" ? "Under review" : status[0].toUpperCase() + status.slice(1);
}

export function KanbanView() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadChallenges() {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .in(
          "status",
          boardColumns.map((column) => column.status),
        )
        .order("created_at", { ascending: false });

      if (!isCurrent) return;

      if (error) {
        setErrorMessage("We couldn't load the workspace challenges. Please try again.");
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

  async function moveChallenge(challenge: Challenge) {
    const targetStatus = nextStatus[challenge.status as BoardStatus];
    if (!targetStatus || updatingId) return;

    setErrorMessage(null);
    setUpdatingId(challenge.id);
    setChallenges((current) =>
      current.map((item) => (item.id === challenge.id ? { ...item, status: targetStatus } : item)),
    );

    const { error } = await supabase
      .from("challenges")
      .update({ status: targetStatus })
      .eq("id", challenge.id);

    if (error) {
      setChallenges((current) =>
        current.map((item) =>
          item.id === challenge.id ? { ...item, status: challenge.status } : item,
        ),
      );
      setErrorMessage("The challenge could not be moved. Your board has been restored.");
    }

    setUpdatingId(null);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Team workspace
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Move community work forward.
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Review incoming challenges and keep active initiatives moving across your team.
        </p>
      </header>

      {errorMessage && (
        <p
          role="alert"
          className="mb-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-3" aria-label="Loading workspace">
          {boardColumns.map((column) => (
            <div key={column.status} className="min-h-64 animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 overflow-x-auto lg:grid-cols-3">
          {boardColumns.map((column) => {
            const columnChallenges = challenges.filter(
              (challenge) => challenge.status === column.status,
            );
            const targetStatus = nextStatus[column.status];

            return (
              <section
                key={column.status}
                className="min-w-0 rounded-2xl border border-border bg-muted/30 p-3"
              >
                <div className="flex items-start justify-between gap-3 px-2 pb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">{column.label}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{column.description}</p>
                  </div>
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {columnChallenges.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnChallenges.length === 0 && (
                    <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                      No challenges here yet.
                    </p>
                  )}
                  {columnChallenges.map((challenge) => (
                    <article
                      key={challenge.id}
                      className="rounded-xl border border-border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <CircleDot className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
                          {challenge.category}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold leading-5 text-card-foreground">
                        {challenge.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {formatStatus(challenge.status)}
                      </p>
                      {targetStatus ? (
                        <button
                          type="button"
                          onClick={() => void moveChallenge(challenge)}
                          disabled={updatingId !== null}
                          className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {updatingId === challenge.id ? (
                            <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                          ) : (
                            <ArrowRight className="size-3.5" aria-hidden />
                          )}
                          {updatingId === challenge.id
                            ? "Moving..."
                            : `Move to ${formatStatus(targetStatus)}`}
                        </button>
                      ) : (
                        <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
                          Latest workflow stage
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
