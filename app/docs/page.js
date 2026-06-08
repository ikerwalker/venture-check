export default function Docs() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
        Documentation
      </h1>
      <p className="text-gray-500 mb-12">
        Coming soon. This page will document prompts, decisions, and architecture notes for each week.
      </p>

      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Week 1 — Core Agent Logic
      </h2>
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          <span className="font-semibold">Core prompt approach:</span> The /core page uses a local
          simulated function (no external API) to generate structured business idea analyses. The
          function takes the user's idea text and returns a market assessment, a recommendation
          (Pursue / Refine / Pivot), and a confidence level (Low / Medium / High with a percentage).
        </p>
        <p>
          <span className="font-semibold">Why simulated output:</span> The assignment allows simulated
          outputs for Week 1 as long as they are clearly labeled. This keeps the project free and
          reliable for demos while the infrastructure and save/display loop are validated.
        </p>
        <p>
          <span className="font-semibold">Simulated / Demo badge:</span> All generated outputs
          display a visible badge to ensure the output is never misleading to users.
        </p>
        <p>
          <span className="font-semibold">Database:</span> Analyses are saved to the{" "}
          <code className="bg-gray-200 px-1 rounded">core_outputs</code> table in Supabase with
          columns: id, idea, analysis, recommendation, confidence, created_at.
        </p>
      </div>
    </div>
  );
}
