'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const TIERS = [
  {
    name: 'Free',
    price: 0,
    currency: 'MXN',
    period: 'forever',
    segment: 'End Users',
    description: 'Basic pharmacy price search for occasional users.',
    features: ['Up to 5 searches/day', 'Price list view', 'Basic filters'],
    badge: 'bg-gray-100 text-gray-600',
  },
  {
    name: 'Premium',
    price: 49,
    currency: 'MXN',
    period: '/month',
    segment: 'End Users',
    description: 'Full access for users who want alerts, history, and no limits.',
    features: ['Unlimited searches', 'Price alerts', 'Promotions feed', 'Pharmacy ratings', 'Search history'],
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Partner',
    price: 2500,
    currency: 'MXN',
    period: '/month',
    segment: 'Pharmaceutical Partners',
    description: 'Featured placement and analytics for pharmacies and brands.',
    features: ['Featured placement', 'Advertising banners', 'Analytics dashboard', 'Campaign tools', 'Data export'],
    badge: 'bg-green-100 text-green-700',
  },
];

const SCENARIOS = {
  pessimistic: { label: 'Pessimistic', mau: 1000, premiumRate: 0.01, partners: 3 },
  base:        { label: 'Base',        mau: 5000, premiumRate: 0.03, partners: 10 },
  optimistic:  { label: 'Optimistic',  mau: 15000, premiumRate: 0.07, partners: 30 },
};

const ASSUMPTIONS = [
  { assumption: 'Premium price', value: '$49 MXN/month', rationale: 'Affordable for Mexican users; comparable to a streaming subscription.' },
  { assumption: 'Partner price', value: '$2,500 MXN/month', rationale: 'Entry-level advertising budget for a small pharmacy chain or lab.' },
  { assumption: 'Free → Premium conversion', value: '1–7%', rationale: 'Industry benchmark for freemium apps in Latin America.' },
  { assumption: 'Monthly Active Users (MAU)', value: '1,000–15,000', rationale: 'Conservative launch range for a city-level rollout in Mexico.' },
  { assumption: 'Partner accounts', value: '3–30', rationale: 'Based on number of pharmacy chains and labs operating in target cities.' },
  { assumption: 'Churn rate', value: 'Not modeled (Week 3)', rationale: 'Excluded from scope — will be added in a future sprint.' },
];

export default function PricingPage() {
  const [scenario, setScenario] = useState('base');
  const [mau, setMau] = useState(SCENARIOS.base.mau);
  const [premiumRate, setPremiumRate] = useState(SCENARIOS.base.premiumRate);
  const [partners, setPartners] = useState(SCENARIOS.base.partners);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [recent, setRecent] = useState([]);

  useEffect(() => { loadRecent(); }, []);

  async function loadRecent() {
    const { data } = await supabase
      .from('pricing_scenarios')
      .select('id, scenario_name, monthly_revenue, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setRecent(data);
  }

  function applyScenario(key) {
    setScenario(key);
    setMau(SCENARIOS[key].mau);
    setPremiumRate(SCENARIOS[key].premiumRate);
    setPartners(SCENARIOS[key].partners);
    setSaved(false);
  }

  const premiumUsers = Math.round(mau * premiumRate);
  const premiumRevenue = premiumUsers * 49;
  const partnerRevenue = partners * 2500;
  const monthlyRevenue = premiumRevenue + partnerRevenue;
  const annualRevenue = monthlyRevenue * 12;

  async function handleSave() {
    setSaving(true);
    setSaveError('');
    const { error } = await supabase.from('pricing_scenarios').insert([{
      scenario_name: SCENARIOS[scenario].label,
      mau,
      premium_rate: premiumRate,
      premium_users: premiumUsers,
      partner_accounts: partners,
      premium_revenue: premiumRevenue,
      partner_revenue: partnerRevenue,
      monthly_revenue: monthlyRevenue,
      annual_revenue: annualRevenue,
    }]);
    setSaving(false);
    if (error) {
      setSaveError('Error saving: ' + error.message);
    } else {
      setSaved(true);
      const newEntry = {
        id: Date.now(),
        scenario_name: SCENARIOS[scenario].label,
        monthly_revenue: monthlyRevenue,
        created_at: new Date().toISOString(),
      };
      setRecent(prev => [newEntry, ...prev].slice(0, 5));
      setTimeout(() => loadRecent(), 1500);
    }
  }

  const fmt = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Pricing Simulator</h1>
        <p className="text-gray-500 mb-10 text-sm">
          Model revenue scenarios for the pharmacy price comparison app.
        </p>

        {/* Pricing Tiers */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">💰 Pricing Tiers</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div key={tier.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tier.badge}`}>
                    {tier.name}
                  </span>
                  <span className="text-xs text-gray-400">{tier.segment}</span>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {tier.price === 0 ? 'Free' : `$${tier.price}`}
                  </span>
                  {tier.price > 0 && (
                    <span className="text-sm text-gray-400 ml-1">MXN{tier.period}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3">{tier.description}</p>
                <ul className="space-y-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-green-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scenario Toggle */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">📊 Revenue Scenario</h2>
          <div className="flex gap-2 mb-6">
            {Object.entries(SCENARIOS).map(([key, s]) => (
              <button
                key={key}
                onClick={() => applyScenario(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  scenario === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Calculator Inputs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Monthly Active Users (MAU)
              </label>
              <input
                type="number"
                value={mau}
                onChange={e => { setMau(Number(e.target.value)); setSaved(false); }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Premium Conversion Rate (%)
              </label>
              <input
                type="number"
                value={Math.round(premiumRate * 100)}
                onChange={e => { setPremiumRate(Number(e.target.value) / 100); setSaved(false); }}
                min="0"
                max="100"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Partner Accounts
              </label>
              <input
                type="number"
                value={partners}
                onChange={e => { setPartners(Number(e.target.value)); setSaved(false); }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Revenue Output */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Premium Users</p>
              <p className="text-xl font-bold text-gray-900">{premiumUsers.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Premium Revenue</p>
              <p className="text-xl font-bold text-gray-900">{fmt(premiumRevenue)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Partner Revenue</p>
              <p className="text-xl font-bold text-gray-900">{fmt(partnerRevenue)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-300 mb-1">Monthly Total</p>
              <p className="text-xl font-bold text-white">{fmt(monthlyRevenue)}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Annual Revenue Projection</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(annualRevenue)}</p>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition-colors"
              >
                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Scenario'}
              </button>
              {saveError && <p className="text-red-500 text-xs mt-1">{saveError}</p>}
            </div>
          </div>
        </section>

        {/* Assumptions Table */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">📋 Assumptions</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 py-2 font-medium text-gray-700">Assumption</th>
                  <th className="px-3 py-2 font-medium text-gray-700">Value</th>
                  <th className="px-3 py-2 font-medium text-gray-700">Rationale</th>
                </tr>
              </thead>
              <tbody>
                {ASSUMPTIONS.map((a, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{a.assumption}</td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{a.value}</td>
                    <td className="px-3 py-2 text-gray-500">{a.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Saved Scenarios */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-4">🗂️ Saved Scenarios</h2>
          {recent.length === 0 ? (
            <p className="text-gray-400 text-sm">No scenarios saved yet.</p>
          ) : (
            <div className="space-y-2">
              {recent.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-gray-100 rounded-lg px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-700">{item.scenario_name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-900 font-semibold">{fmt(item.monthly_revenue)}/mo</span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
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
