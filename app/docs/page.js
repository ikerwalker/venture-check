export default function Docs() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
        Documentation
      </h1>
      <p className="text-gray-500 mb-12">
        Prompts, decisions, and architecture notes for each week of the build.
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

      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mt-12 mb-4">
        Week 2 — Research Agent Logic
      </h2>
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          <span className="font-semibold">Research approach:</span> The /research page uses a
          category detection function that reads keywords in the idea text and selects a matching
          template pool. Each pool contains 5 global benchmark companies, a Mexico market context
          paragraph, 8 competitors/substitutes, and 5 categorized risks. Output is structured and
          fully simulated — no external APIs.
        </p>
        <p>
          <span className="font-semibold">Categories supported:</span> fashion, food, tech, sports,
          education, service, and general (fallback). Category is detected automatically from the
          idea text using keyword matching.
        </p>
        <p>
          <span className="font-semibold">Competitor filter:</span> The competitor table filters in
          real time using React state on the name, type, and market columns. No external library — just
          a controlled input and Array.filter().
        </p>
        <p>
          <span className="font-semibold">Simulated / Demo badge:</span> Same principle as Week 1 — all
          generated outputs display a visible badge so the output is never misleading.
        </p>
        <p>
          <span className="font-semibold">Database:</span> Research sessions are saved to the{" "}
          <code className="bg-gray-200 px-1 rounded">research_outputs</code> table in Supabase with
          columns: id, idea, global_examples, mexico_context, competitors, risks, recommendation, created_at.
          JSON arrays are stored as stringified text.
        </p>
      </div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mt-12 mb-4">
        Week 3 — Product Architecture + Pricing Simulator
      </h2>
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          <span className="font-semibold">Product page (/product):</span> Static server component displaying the
          feature map organized by tier (Free, Premium, Partner) and the two customer segments (End Users and
          Pharmaceutical Partners). No API calls or state — all data is defined as constants in the file.
        </p>
        <p>
          <span className="font-semibold">Pricing page (/pricing):</span> Client component with a revenue
          simulator. Three scenario presets (Pessimistic, Base, Optimistic) populate the calculator inputs:
          Monthly Active Users, Premium Conversion Rate, and Partner Accounts. Revenue is calculated in real time
          using JavaScript — no external API required.
        </p>
        <p>
          <span className="font-semibold">Revenue formula:</span>{" "}
          <code className="bg-gray-200 px-1 rounded">
            Monthly = (MAU × conversionRate × $49) + (partners × $2,500)
          </code>
          . Annual = Monthly × 12.
        </p>
        <p>
          <span className="font-semibold">Scenario toggle:</span> Clicking Pessimistic / Base / Optimistic
          updates all three inputs at once using React state. The user can also edit inputs manually after
          selecting a scenario.
        </p>
        <p>
          <span className="font-semibold">Database:</span> Saved scenarios go to the{" "}
          <code className="bg-gray-200 px-1 rounded">pricing_scenarios</code> table in Supabase with columns:
          id, scenario_name, mau, premium_rate, premium_users, partner_accounts, premium_revenue,
          partner_revenue, monthly_revenue, annual_revenue, created_at.
        </p>
      </div>
    </div>
  );
}
