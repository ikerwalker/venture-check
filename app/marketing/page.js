'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// ─── Brand System ─────────────────────────────────────────────────────────────
const BRAND = {
  name: 'FarmaCompara',
  tagline: 'Compare. Save. Buy smarter.',
  mission: 'The Trivago of Mexican pharmacies. Find the best price for any medication in seconds.',
  colors: [
    { name: 'Primary Blue', hex: '#2563EB', use: 'CTAs, links, key highlights' },
    { name: 'Trust Green', hex: '#059669', use: 'Savings badges, confirmations' },
    { name: 'Text Gray', hex: '#374151', use: 'Body text, UI elements' },
    { name: 'Background', hex: '#F9FAFB', use: 'Page backgrounds, cards' },
  ],
  voice: 'Clear, trustworthy, helpful. We speak like a knowledgeable friend — never clinical or pushy.',
};

// ─── Target Persona ───────────────────────────────────────────────────────────
const PERSONA = {
  name: 'María G., 38',
  role: 'Mom managing chronic medications for her family',
  location: 'CDMX, Colonia del Valle',
  income: 'Middle income (~$18,000 MXN/month household)',
  devices: 'iPhone SE — mobile-first',
  pain: 'Spends 20–30 min/month comparing prices between pharmacies by walking in or calling. Often unsure if she\'s overpaying.',
  goal: 'Find the cheapest Metformin near her in under 5 minutes, from her phone, without leaving the house.',
  willingness: 'Would pay $49 MXN/month to save $200+ on monthly medications.',
  quote: '"I just want to know if it\'s cheaper down the street before I go."',
};

// ─── A/B Headlines ────────────────────────────────────────────────────────────
const AB_HEADLINES = [
  {
    id: 'A',
    headline: 'Stop Overpaying for Medication',
    subheadline: 'Compare prices across every pharmacy in your city — free, in seconds.',
    cta: 'Compare Prices Now',
    angle: 'Pain-focused (loss aversion)',
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'B',
    headline: 'Find the Cheapest Pharmacy Near You',
    subheadline: "Mexico's first pharmacy price comparison app. No account needed.",
    cta: 'Find My Best Price',
    angle: 'Benefit-focused (gain framing)',
    color: 'border-green-200 bg-green-50',
    badge: 'bg-green-100 text-green-700',
  },
];

// ─── Social Posts (10) ────────────────────────────────────────────────────────
const SOCIAL_POSTS = [
  { id: 1, platform: 'Instagram', copy: '💊 Did you know the same medication can cost up to 3x more depending on the pharmacy? FarmaCompara shows you all prices before you leave home. #FarmaCompara #SalvadineroEnFarmacias' },
  { id: 2, platform: 'Twitter/X', copy: 'Why pay more for the same pill? 💸 FarmaCompara compares prices at every pharmacy near you in seconds. Try it free → farmacompara.mx' },
  { id: 3, platform: 'Instagram', copy: '🏥 Your health shouldn\'t cost more than it has to. Compare Metformin, Omeprazol, Losartán and 1,000+ medications. FarmaCompara — available in CDMX.' },
  { id: 4, platform: 'Facebook', copy: 'PSA for anyone buying medications regularly: prices vary A LOT between pharmacies. FarmaCompara lets you see all prices in your city before you go. Free, takes 10 seconds.' },
  { id: 5, platform: 'Twitter/X', copy: 'Spent 45 min comparing pharmacy prices? Same. That\'s why we built @FarmaCompara. Now it takes 10 seconds. 👇' },
  { id: 6, platform: 'Instagram', copy: '✅ Lowest price ✅ Nearest location ✅ In-stock confirmation. FarmaCompara checks all three before you go. Save time, save money. #farmacias #salud' },
  { id: 7, platform: 'LinkedIn', copy: 'We built FarmaCompara to solve a real problem: 60% of Mexican households buy medications monthly and most have no idea they could save 20–40% by comparing prices. We\'re changing that.' },
  { id: 8, platform: 'Instagram', copy: '📍 Farmacias del Ahorro vs. Guadalajara vs. Similares — which one has the best price today? FarmaCompara tells you in seconds. Link in bio.' },
  { id: 9, platform: 'Twitter/X', copy: 'Generic vs. brand, closest vs. cheapest — FarmaCompara helps you decide in seconds. No more guessing at the pharmacy counter.' },
  { id: 10, platform: 'Facebook', copy: 'Attention Mexico City residents: FarmaCompara is live. Free pharmacy price comparison, no signup required. Find the best price for your medications → farmacompara.mx' },
];

// ─── Video Scripts (3) ───────────────────────────────────────────────────────
const VIDEO_SCRIPTS = [
  {
    id: 1,
    title: '30-Second Demo Ad',
    duration: '0:30',
    script: `[0:00–0:05] HOOK
Shot: Close-up of pharmacy price tag — "$180 MXN"
Voice: "How much should Metformin 500mg really cost?"

[0:05–0:15] PROBLEM
Shot: Person walking out of pharmacy looking disappointed.
Voice: "Most people have no idea they could pay $60 less down the street."

[0:15–0:25] SOLUTION
Shot: Phone screen showing FarmaCompara results — ranked list of pharmacies.
Voice: "FarmaCompara shows you every price, at every pharmacy near you — in 10 seconds."

[0:25–0:30] CTA
Shot: FarmaCompara logo on clean white background.
Voice: "Compare prices free at FarmaCompara.mx"`,
  },
  {
    id: 2,
    title: 'Explainer for Social Media',
    duration: '1:00',
    script: `[0:00–0:10] HOOK
"If you buy medications every month, this is for you."

[0:10–0:25] THE PROBLEM
"Prices in Mexico vary wildly between pharmacies. Farmacias del Ahorro, Guadalajara, Similares, Benavides — they all charge different amounts for the exact same pill. Most people just go to the closest one and hope for the best."

[0:25–0:45] THE SOLUTION
"FarmaCompara is like Trivago, but for pharmacies. You type the medication name, choose your city, and instantly see every pharmacy ranked by price. Free. No account needed. Works on your phone."

[0:45–1:00] CTA
"We're starting in CDMX and expanding soon. Try it now at FarmaCompara.mx — and share this with anyone who buys medications regularly."`,
  },
  {
    id: 3,
    title: 'Founder Story Video',
    duration: '2:00',
    script: `[0:00–0:20] OPEN WITH A MOMENT
"Last year, my mom called me from the pharmacy. She needed Losartán and it was $340 pesos. I looked it up online — Farmacia Guadalajara had it for $190 two blocks away. She had no idea."

[0:20–0:50] WHY THIS EXISTS
"I realized this happens to millions of people every month in Mexico. We spend billions on medications, but we have almost no price transparency. So we built FarmaCompara."

[0:50–1:20] WHAT IT DOES
"You search any medication. We show you every pharmacy in your city with their current price, sorted by what matters to you — cheapest, nearest, or in-stock. Under 30 seconds."

[1:20–1:45] WHO IT'S FOR
"Anyone who buys medications regularly — whether for yourself, your parents, or your kids. Especially if you're managing a chronic condition and buying the same thing every month."

[1:45–2:00] CLOSE
"FarmaCompara is free. No ads on the free plan. Just honest price comparison. Try it at FarmaCompara.mx."`,
  },
];

// ─── 14-Day Campaign Calendar ─────────────────────────────────────────────────
const CAMPAIGN_CALENDAR = [
  { day: 1,  date: 'Jul 1',  channel: 'Instagram',        action: 'Launch post — "Stop Overpaying for Medication"',                   goal: 'Awareness' },
  { day: 2,  date: 'Jul 2',  channel: 'Twitter/X',        action: 'Product demo screenshot + price comparison result',                 goal: 'Engagement' },
  { day: 3,  date: 'Jul 3',  channel: 'Facebook',          action: 'PSA-style post — price variability education',                     goal: 'Awareness' },
  { day: 4,  date: 'Jul 4',  channel: 'Instagram Stories', action: 'Poll: "Do you compare pharmacy prices before you go?"',            goal: 'Engagement' },
  { day: 5,  date: 'Jul 5',  channel: 'LinkedIn',          action: 'Founder story post — why we built FarmaCompara',                   goal: 'Trust' },
  { day: 6,  date: 'Jul 6',  channel: 'Instagram',         action: 'Persona spotlight — "For María and everyone managing chronic meds"', goal: 'Empathy' },
  { day: 7,  date: 'Jul 7',  channel: 'Twitter/X',         action: 'Share early user feedback — real reaction screenshots',            goal: 'Social proof' },
  { day: 8,  date: 'Jul 8',  channel: 'Instagram Reel',    action: '30-second demo video — screen recording of the app in action',    goal: 'Demo' },
  { day: 9,  date: 'Jul 9',  channel: 'Facebook',          action: '"How much could you save?" interactive question post',            goal: 'Engagement' },
  { day: 10, date: 'Jul 10', channel: 'Instagram',         action: 'Feature highlight — Price Alerts for Premium users',              goal: 'Conversion' },
  { day: 11, date: 'Jul 11', channel: 'Twitter/X',         action: 'Behind-the-scenes: building FarmaCompara (dev audience)',         goal: 'Tech community' },
  { day: 12, date: 'Jul 12', channel: 'Instagram Stories', action: 'Quiz: "Which medication saves you the most?" — swipe up CTA',    goal: 'Traffic' },
  { day: 13, date: 'Jul 13', channel: 'LinkedIn',          action: 'Market data post — pharmacy price variability stats in Mexico',   goal: 'Authority' },
  { day: 14, date: 'Jul 14', channel: 'All channels',      action: '2-week recap — "Here\'s what we learned from our first 500 users"', goal: 'Trust + conversion' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const PLATFORM_COLORS = {
  'Instagram': 'bg-pink-50 text-pink-700 border-pink-200',
  'Twitter/X': 'bg-sky-50 text-sky-700 border-sky-200',
  'Facebook': 'bg-blue-50 text-blue-700 border-blue-200',
  'LinkedIn': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Instagram Stories': 'bg-purple-50 text-purple-700 border-purple-200',
  'Instagram Reel': 'bg-rose-50 text-rose-700 border-rose-200',
  'All channels': 'bg-gray-100 text-gray-700 border-gray-300',
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shrink-0"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MarketingPage() {
  const [abWinner, setAbWinner] = useState(null);   // 'A' or 'B'
  const [abVotes, setAbVotes] = useState({ A: 0, B: 0 });
  const [expandedScript, setExpandedScript] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [savedAssets, setSavedAssets] = useState([]);

  useEffect(() => { loadSavedAssets(); }, []);

  async function loadSavedAssets() {
    const { data } = await supabase
      .from('marketing_assets')
      .select('id, asset_type, title, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setSavedAssets(data);
  }

  function voteForHeadline(id) {
    setAbWinner(id);
    setAbVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  }

  async function saveAsset(assetType, title, content) {
    setSaving(true);
    setSaveError('');
    const { error } = await supabase.from('marketing_assets').insert([{
      asset_type: assetType,
      title,
      content,
    }]);
    setSaving(false);
    if (error) {
      setSaveError('Error saving: ' + error.message);
    } else {
      const optimistic = { id: Date.now(), asset_type: assetType, title, created_at: new Date().toISOString() };
      setSavedAssets(prev => [optimistic, ...prev].slice(0, 10));
      setTimeout(() => loadSavedAssets(), 1500);
    }
  }

  async function saveAbResult() {
    if (!abWinner) return;
    const winner = AB_HEADLINES.find(h => h.id === abWinner);
    await saveAsset('headline_ab', `A/B Winner: Headline ${abWinner}`, `${winner.headline} | ${winner.subheadline} | CTA: ${winner.cta}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Marketing Engine</h1>
        <p className="text-gray-500 mb-10 text-sm">
          Brand system, content library, A/B tests, and campaign calendar for FarmaCompara.
        </p>

        {/* ── Brand System ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">🎨 Brand System</h2>
          <div className="border border-gray-200 rounded-xl p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{BRAND.name}</p>
                <p className="text-gray-500 text-sm mt-0.5 italic">"{BRAND.tagline}"</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">{BRAND.mission}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {BRAND.colors.map((c) => (
                <div key={c.name} className="rounded-lg overflow-hidden border border-gray-100">
                  <div className="h-10 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.hex}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.use}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Brand Voice</p>
              <p className="text-xs text-gray-500">{BRAND.voice}</p>
            </div>
          </div>
        </section>

        {/* ── Target Persona ───────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">👤 Target Persona</h2>
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👩</div>
              <div>
                <p className="font-semibold text-gray-900">{PERSONA.name}</p>
                <p className="text-sm text-gray-500">{PERSONA.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              {[
                ['📍 Location', PERSONA.location],
                ['💳 Income', PERSONA.income],
                ['📱 Device', PERSONA.devices],
                ['💸 Willingness to pay', PERSONA.willingness],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                  <p className="text-gray-800 text-xs">{value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-red-600 mb-1">😤 Pain Point</p>
                <p className="text-xs text-gray-600">{PERSONA.pain}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-600 mb-1">🎯 Goal</p>
                <p className="text-xs text-gray-600">{PERSONA.goal}</p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 italic">"{PERSONA.quote}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── A/B Headline Test ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-1">🧪 A/B Headline Test</h2>
          <p className="text-xs text-gray-400 mb-4">Click a headline to vote for it as the winner.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {AB_HEADLINES.map((h) => (
              <button
                key={h.id}
                onClick={() => voteForHeadline(h.id)}
                className={`text-left border-2 rounded-xl p-5 transition-all ${h.color} ${
                  abWinner === h.id ? 'ring-2 ring-gray-900' : 'hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${h.badge}`}>
                    Headline {h.id}
                  </span>
                  {abWinner === h.id && (
                    <span className="text-xs font-bold text-gray-900">✓ Winner</span>
                  )}
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{h.headline}</p>
                <p className="text-xs text-gray-600 mb-3">{h.subheadline}</p>
                <p className="text-xs text-gray-400">Angle: {h.angle}</p>
                <p className="text-xs font-medium text-gray-700 mt-2">CTA: {h.cta}</p>
                {abVotes[h.id] > 0 && (
                  <p className="text-xs text-gray-500 mt-2">{abVotes[h.id]} vote{abVotes[h.id] > 1 ? 's' : ''}</p>
                )}
              </button>
            ))}
          </div>
          {abWinner && (
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-700">
                Winner selected: <strong>Headline {abWinner}</strong> — "{AB_HEADLINES.find(h => h.id === abWinner)?.headline}"
              </p>
              <button
                onClick={saveAbResult}
                disabled={saving}
                className="text-xs px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Result'}
              </button>
            </div>
          )}
          {saveError && <p className="text-red-500 text-xs mt-2">{saveError}</p>}
        </section>

        {/* ── Social Posts ─────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">📱 10 Social Posts</h2>
          <div className="space-y-3">
            {SOCIAL_POSTS.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">#{post.id}</span>
                      <span className={`text-xs border px-2 py-0.5 rounded-full ${PLATFORM_COLORS[post.platform] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {post.platform}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{post.copy}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <CopyButton text={post.copy} />
                    <button
                      onClick={() => saveAsset('social_post', `${post.platform} Post #${post.id}`, post.copy)}
                      className="text-xs px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Video Scripts ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">🎬 3 Video Scripts</h2>
          <div className="space-y-3">
            {VIDEO_SCRIPTS.map((script) => (
              <div key={script.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedScript(expandedScript === script.id ? null : script.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{script.title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{script.duration}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{expandedScript === script.id ? '▲' : '▼'}</span>
                </button>
                {expandedScript === script.id && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <pre className="mt-3 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-4">
                      {script.script}
                    </pre>
                    <div className="flex gap-2 mt-3">
                      <CopyButton text={script.script} />
                      <button
                        onClick={() => saveAsset('video_script', script.title, script.script)}
                        className="text-xs px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 14-Day Campaign Calendar ─────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">📅 14-Day Campaign Calendar</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Day</th>
                  <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Date</th>
                  <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Channel</th>
                  <th className="px-3 py-2.5 font-semibold text-gray-700">Action</th>
                  <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Goal</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGN_CALENDAR.map((item, i) => (
                  <tr key={item.day} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-3 py-2.5 text-gray-400 font-mono">{item.day}</td>
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap font-medium">{item.date}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className={`inline-block text-xs border px-2 py-0.5 rounded-full ${PLATFORM_COLORS[item.channel] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {item.channel}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{item.action}</td>
                    <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{item.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => saveAsset('campaign_calendar', '14-Day Campaign Calendar', CAMPAIGN_CALENDAR.map(c => `Day ${c.day} (${c.date}) — ${c.channel}: ${c.action}`).join('\n'))}
              className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              Save Calendar
            </button>
          </div>
        </section>

        {/* ── Saved Assets ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-4">🗂️ Saved Marketing Assets</h2>
          {savedAssets.length === 0 ? (
            <p className="text-gray-400 text-sm">No assets saved yet. Use the Save buttons above.</p>
          ) : (
            <div className="space-y-2">
              {savedAssets.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-gray-100 rounded-lg px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                    <span className="ml-2 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                      {item.asset_type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
