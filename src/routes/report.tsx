import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ReportView } from "@/views/ReportView";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report an Issue — Civic Commons" }] }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <>
      <AppHeader title="Report an Issue" />
      <main id="main" className="pb-24">
        <ReportView />
      </main>
    </>
  );
}
