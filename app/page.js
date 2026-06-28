import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FEATURES = [
  {
    href: '/core',
    icon: '⚡',
    title: 'Idea Validator',
    description: 'Enter any business idea and get a structured market assessment with a Go / Refine / Pivot recommendation in seconds.',
    badge: 'Week 1',
  },
  {
    href: '/research',
    icon: '🔍',
    title: 'Research Agent',
    description: 'Automatically surfaces global benchmarks, Mexico market context, competitors, and risks categorized by type.',
    badge: 'Week 2',
  },
  {
    href: '/product',
    icon: '🧱',
    title: 'Product Architecture',
    description: 'Full feature map organized by tier — Free, Premium, and Partner — with customer segment definitions.',
    badge: 'Week 3',
  },
  {
    href: '/pricing',
    icon: '💰',
    title: 'Pricing Simulator',
    description: 'Model revenue scenarios with adjustable MAU, conversion rate, and partner accounts. Save scenarios to Supabase.',
    badge: 'Week 3',
  },
  {
    href: '/marketing',
    icon: '📣',
    title: 'Marketing Engine',
    description: 'Brand system, target persona, 10 social posts, 3 video scripts, 14-day campaign calendar, and A/B headline tester.',
    badge: 'Week 4',
  },
  {
    href: '/chat',
    icon: '💬',
    title: 'Guided Assistant',
    description: 'Public-facing chatbot with intake flow, guardrails, and thumbs up/down feedback. Helps users find the best pharmacy price.',
    badge: 'Week 5',
  },
];

const STATS = [
  { value: '1,000+', label: 'Medications tracked' },
  { value: '$49 MXN', label: 'Premium plan / month' },
  { value: '3x', label: 'Max price difference between pharmacies' },
  { value: '<10 sec', label: 'Time to find the best price' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Student Project — Negocios Inteligentes
          </span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            Stop Overpaying<br />for Medication
          </h1>
          <p className="text-xl text-gray-500 mb-2 leading-relaxed">
            FarmaCompara is the Trivago of Mexican pharmacies.
          </p>
          <p className="text-gray-400 mb-10 text-base">
            Compare prices across every pharmacy in your city — free, in seconds.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/chat"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Try the Assistant →
            </Link>
            <Link
              href="/research"
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Market Research
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8 text-center">
            What's been built
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group border border-gray-200 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8 text-center">
              How FarmaCompara works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { step: '1', title: 'Search your medication', desc: 'Type the medication name — generic or brand. We recognize 1,000+ common medications in Mexico.' },
                { step: '2', title: 'See all prices instantly', desc: 'We show you every pharmacy in your city ranked by price, with distance and stock status.' },
                { step: '3', title: 'Go to the right pharmacy', desc: 'Pick the best option for you — cheapest, nearest, or in-stock. Save up to 40% on your next purchase.' },
              ].map((item) => (
                <div key={item.step} className="p-6">
                  <div className="w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
