'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { generateResearch } from '../../lib/researchData';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ResearchPage() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [research, setResearch] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [recent, setRecent] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadRecent();
  }, []);

  async function loadRecent() {
    const { data, error } = await supabase
      .from('research_outputs')
      .select('id, idea, created_at')
      .order('created_at', { ascending: false })
      .limit(3);
    if (error) console.error('loadRecent error:', error);
    if (data) setRecent(data);
  }

  function handleGenerate() {
    if (!idea.trim()) return;
    setLoading(true);
    setResearch(null);
    setSaved(false);
    setSaveError('');
    setFilter('');
    setTimeout(() => {
      const result = generateResearch(idea);
      setResearch(result);
      setLoading(false);
    }, 1400);
  }

  async function handleSave() {
    if (!research) return;
    setSaving(true);
    setSaveError('');
    const { error } = await supabase.from('research_outputs').insert([{
      idea,
      global_examples: JSON.stringify(research.globalExamples),
      mexico_context: research.mexicoContext,
      competitors: JSON.stringify(research.competitors),
      risks: JSON.stringify(research.risks),
      recommendation: research.recommendation,
    }]);
    setSaving(false);
    if (error) {
      setSaveError('Error al guardar: ' + error.message);
    } else {
      setSaved(true);
      setTimeout(() => loadRecent(), 800);
    }
  }

  const filteredCompetitors = research
    ? research.competitors.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.type.toLowerCase().includes(filter.toLowerCase()) ||
        c.market.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Research Dashboard</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Competitive intelligence for your business idea — benchmarks, competitors, and risks.
        </p>

        {/* Intake form */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business idea to research
          </label>
          <textarea
            value={idea}
            onChange={e => {
              setIdea(e.target.value);
              setResearch(null);
              setSaved(false);
            }}
            placeholder="Describe the business idea you want to research..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            rows={3}
          />
          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || loading}
            className="mt-3 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition-colors"
          >
            {loading ? 'Researching...' : 'Run Research'}
          </button>
        </div>

        {/* Research output */}
        {research && (
          <div className="space-y-10">

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                {research.category} sector
              </span>
              <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                Simulated / Demo
              </span>
            </div>

            {/* Global Benchmarks */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                🌍 Global Benchmarks
              </h2>
              <div className="space-y-3">
                {research.globalExamples.map((ex, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{ex.company}</span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded flex-shrink-0">
                        {ex.model}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{ex.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mexico Market Context */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                🇲🇽 Mexico Market Context
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{research.mexicoContext}</p>
              </div>
            </div>

            {/* Competitor Table */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                🏁 Competitors & Substitutes
              </h2>
              <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter by name, type, or market..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">Name</th>
                      <th className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">Type</th>
                      <th className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">Market</th>
                      <th className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">Pricing</th>
                      <th className="px-3 py-2 font-medium text-gray-700">Strength</th>
                      <th className="px-3 py-2 font-medium text-gray-700">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompetitors.map((c, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            c.type === 'Direct'
                              ? 'bg-red-50 text-red-600'
                              : c.type === 'Indirect'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.market}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.pricing}</td>
                        <td className="px-3 py-2 text-gray-600">{c.strength}</td>
                        <td className="px-3 py-2 text-gray-600">{c.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCompetitors.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-6">
                    No competitors match your filter.
                  </p>
                )}
              </div>
            </div>

            {/* Risk Map */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                ⚠️ Risk Map
              </h2>
              <div className="space-y-2">
                {research.risks.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border border-gray-100 rounded-lg p-3"
                  >
                    <span className={`text-xs px-2 py-0.5 rounded font-medium mt-0.5 flex-shrink-0 ${
                      r.severity === 'High'
                        ? 'bg-red-100 text-red-700'
                        : r.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {r.severity}
                    </span>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {r.category} ·{' '}
                      </span>
                      <span className="text-sm text-gray-700">{r.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation + Save */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Recommendation
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">{research.recommendation}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${
                  research.confidence === 'High'
                    ? 'bg-green-100 text-green-700'
                    : research.confidence === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {research.confidence} confidence
                </span>
              </div>
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition-colors"
              >
                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Research'}
              </button>
              {saveError && (
                <p className="text-red-500 text-sm mt-2">{saveError}</p>
              )}
            </div>

          </div>
        )}

        {/* Recent Research */}
        <div className="mt-16">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Research</h2>
          {recent.length === 0 ? (
            <p className="text-gray-400 text-sm">No research saved yet.</p>
          ) : (
            <div className="space-y-2">
              {recent.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-gray-100 rounded-lg px-4 py-3"
                >
                  <span className="text-sm text-gray-700 truncate max-w-xs">{item.idea}</span>
                  <span className="text-xs text-gray-400 ml-4 flex-shrink-0">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
