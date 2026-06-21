import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TIERS = [
  {
    name: 'Free',
    color: 'bg-gray-50 border-gray-200',
    badge: 'bg-gray-100 text-gray-600',
    features: [
      { name: 'Pharmacy Search', description: 'Search pharmacies by product name in your area.' },
      { name: 'Price List', description: 'View a ranked list of prices across nearby pharmacies.' },
      { name: 'Basic Filters', description: 'Filter results by distance and availability.' },
      { name: 'Up to 5 searches/day', description: 'Limited daily searches on the free plan.' },
    ],
  },
  {
    name: 'Premium',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    features: [
      { name: 'Unlimited Searches', description: 'No daily limit — search as many products as you need.' },
      { name: 'Price Alerts', description: 'Get notified when a product drops below your target price.' },
      { name: 'Promotions Feed', description: 'Real-time feed of active promotions from all partner pharmacies.' },
      { name: 'Pharmacy Ratings', description: 'Community ratings for service quality, wait time, and stock reliability.' },
      { name: 'Search History', description: 'Access your last 30 days of searches and price comparisons.' },
    ],
  },
  {
    name: 'Partner',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    features: [
      { name: 'Featured Placement', description: 'Pharmacy or brand appears at the top of relevant search results.' },
      { name: 'Advertising Banners', description: 'Branded promotional banners on product and search pages.' },
      { name: 'Analytics Dashboard', description: 'Track impressions, clicks, and conversion data for your listings.' },
      { name: 'Campaign Tools', description: 'Launch time-limited promotions and price deals directly in the app.' },
      { name: 'Data Export', description: 'Export campaign performance data as CSV for internal reporting.' },
    ],
  },
];

const SEGMENTS = [
  {
    name: 'End Users',
    icon: '👤',
    description:
      'People who regularly buy medications and want to make sure they\'re not overpaying. This includes patients managing chronic conditions, parents buying for their families, and anyone who\'s ever walked into a pharmacy and wondered if the same product is cheaper down the street.',
    needs: ['Quick price comparison', 'Trustworthy results', 'Promotion alerts', 'Works on mobile'],
    tier: 'Free → Premium',
  },
  {
    name: 'Pharmaceutical Partners',
    icon: '🏢',
    description:
      'Pharmaceutical brands and pharmacy chains that want to reach price-conscious consumers at the moment of search. They pay to feature their products and promotions in front of users who are actively looking to buy.',
    needs: ['Brand visibility', 'Promotion placement', 'Performance analytics', 'Targeted reach'],
    tier: 'Partner',
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Product Architecture</h1>
        <p className="text-gray-500 mb-10 text-sm">
          Feature map, pricing tiers, and customer segments for the pharmacy price comparison app.
        </p>

        {/* Customer Segments */}
        <section className="mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4">👥 Customer Segments</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SEGMENTS.map((seg) => (
              <div key={seg.name} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{seg.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">{seg.name}</span>
                  <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {seg.tier}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{seg.description}</p>
                <div className="flex flex-wrap gap-1">
                  {seg.needs.map((n) => (
                    <span key={n} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Map by Tier */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-4">🧱 Feature Map by Tier</h2>
          <div className="space-y-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`border rounded-lg p-5 ${tier.color}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tier.badge}`}>
                    {tier.name}
                  </span>
                </div>
                <div className="space-y-3">
                  {tier.features.map((f) => (
                    <div key={f.name} className="flex gap-3">
                      <span className="text-gray-400 mt-0.5">→</span>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{f.name}</span>
                        <span className="text-sm text-gray-500"> — {f.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
