export default function Home() {
  const roadmap = [
    { week: "Week 0", label: "Setup", description: "Infrastructure, GitHub, Vercel, Supabase" },
    { week: "Week 1", label: "Generative Core", description: "Business idea analysis engine" },
    { week: "Week 2", label: "Memory Layer", description: "Save and revisit past analyses" },
    { week: "Week 3", label: "Multi-step Agent", description: "Deeper validation with follow-up questions" },
    { week: "Week 4", label: "Polish", description: "UI refinement and performance" },
    { week: "Week 5", label: "Final Demo", description: "Presentation and documentation" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
        VentureCheck
      </h1>
      <p className="text-lg text-gray-500 mb-2">
        AI-powered business idea validator
      </p>
      <p className="text-gray-600 mb-12 leading-relaxed">
        VentureCheck is a student project exploring how generative AI can help
        entrepreneurs quickly validate business ideas. It uses structured prompts
        and multi-step reasoning to surface market insights and surface go/no-go
        recommendations in seconds.
      </p>

      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Roadmap
      </h2>
      <div className="space-y-3">
        {roadmap.map((item) => (
          <div key={item.week} className="flex gap-6 text-sm">
            <span className="w-16 text-gray-400 shrink-0">{item.week}</span>
            <span className="font-medium text-gray-800 w-36 shrink-0">{item.label}</span>
            <span className="text-gray-500">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
