import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { KanbanView } from "@/views/WorkspaceView";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Workspace — Civic Commons" }] }),
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <>
      <AppHeader title="Workspace" />
      <main id="main" className="pb-24">
        <KanbanView />
      </main>
    </>
  );
}
