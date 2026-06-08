"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

function generateAnalysis(idea) {
  const marketPhrases = [
    `The market for "${idea}" shows moderate saturation with clear room for differentiation. Early indicators suggest a target audience of young professionals and students who value convenience and efficiency. Underlying demand patterns from the past two years indicate growing willingness to pay for solutions in this category.`,
    `"${idea}" addresses an underserved segment with limited direct competition at the accessible price point. The target demographic skews toward digitally native users aged 18–34, creating strong distribution opportunities through social channels. Market timing appears favorable given recent shifts in consumer behavior.`,
    `Initial assessment of "${idea}" reveals a fragmented competitive landscape where no single player dominates. The core value proposition aligns well with current consumer priorities around time-saving and personalization. Adoption risk is moderate — success depends heavily on go-to-market execution.`,
  ];

  const recommendations = [
    "Pursue — the core problem is real and the timing is right. Validate with 10 user interviews before building.",
    "Refine — the idea has strong bones but the monetization model needs clarification before proceeding.",
    "Pursue — strong signal in this category. Focus the MVP on one specific user segment to reduce complexity.",
    "Refine — conduct a quick competitor analysis to identify differentiation before committing resources.",
  ];

  const confidenceLevels = [
    { label: "High", pct: "78%" },
    { label: "Medium", pct: "61%" },
    { label: "High", pct: "82%" },
    { label: "Medium", pct: "54%" },
  ];

  const seed = idea.length % 4;
  return {
    analysis: marketPhrases[seed % marketPhrases.length],
    recommendation: recommendations[seed % recommendations.length],
    confidence: confidenceLevels[seed % confidenceLevels.length],
  };
}

export default function CorePage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchRecent();
  }, []);

  async function fetchRecent() {
    const { data, error } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (!error && data) setRecent(data);
  }

  function handleGenerate() {
    if (!idea.trim()) return;
    setLoading(true);
    setSaveStatus(null);
    setResult(null);
    setTimeout(() => {
      setResult(generateAnalysis(idea));
      setLoading(false);
    }, 1200);
  }

  async function handleSave() {
    if (!result) return;
    setSaveStatus("saving");
    const { error } = await supabase.from("core_outputs").insert({
      idea: idea.trim(),
      analysis: result.analysis,
      recommendation: result.recommendation,
      confidence: `${result.confidence.label} · ${result.confidence.pct}`,
    });
    if (error) {
      setSaveStatus("error");
    } else {
      setSaveStatus("saved");
      fetchRecent();
    }
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
        Core Agent
      </h1>
      <p className="text-gray-500 mb-10">
        Enter a business idea to generate a simulated validation analysis.
      </p>

      {/* Intake form */}
      <div className="mb-8">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder='e.g. "An app that connects dog walkers with busy professionals"'
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 mb-3"
        />
        <button
          onClick={handleGenerate}
          disabled={!idea.trim() || loading}
          className="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "⚡ Generate Analysis"}
        </button>
      </div>

      {/* Output card */}
      {result && (
        <div className="border border-gray-200 rounded-xl p-6 mb-10 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">{idea}</h2>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
              Simulated / Demo
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Market Assessment
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{result.analysis}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Recommendation
            </p>
            <p className="text-sm text-gray-800 font-medium">{result.recommendation}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Confidence Level
            </p>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                result.confidence.label === "High"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {result.confidence.label} · {result.confidence.pct}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saveStatus === "saved" || saveStatus === "saving"}
              className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "✓ Saved"
                : "Save"}
            </button>
            {saveStatus === "error" && (
              <p className="text-xs text-red-500">Error saving. Try again.</p>
            )}
          </div>
        </div>
      )}

      {/* Recent analyses */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Recent Analyses
        </h2>
        {recent.length === 0 ? (
          <p className="text-sm text-gray-400">No analyses yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 text-sm"
              >
                <span className="text-gray-800 truncate max-w-xs">{item.idea}</span>
                <span className="text-gray-400 text-xs ml-4 shrink-0">
                  {formatDate(item.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
