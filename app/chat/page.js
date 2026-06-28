'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// ─── Intake Questions ─────────────────────────────────────────────────────────
const INTAKE_QUESTIONS = [
  {
    id: 'medication',
    question: 'What medication are you looking for?',
    placeholder: 'e.g. Metformin 500mg, Omeprazol, Losartán...',
    type: 'text',
  },
  {
    id: 'city',
    question: 'Which city are you searching in?',
    placeholder: 'e.g. CDMX, Monterrey, Guadalajara...',
    type: 'text',
  },
  {
    id: 'preference',
    question: 'What matters most to you?',
    type: 'options',
    options: ['Lowest price', 'Nearest pharmacy', 'Both equally'],
  },
];

// ─── Simulated Pharmacy Data ──────────────────────────────────────────────────
const PHARMACY_RESULTS = [
  { name: 'Farmacia San Pablo',      price: 68,  distance: '2.0 km', inStock: true  },
  { name: 'Farmacias Similares',     price: 75,  distance: '1.1 km', inStock: false },
  { name: 'Farmacias Guadalajara',   price: 89,  distance: '0.3 km', inStock: true  },
  { name: 'Farmacia del Ahorro',     price: 112, distance: '0.8 km', inStock: true  },
  { name: 'Benavides',               price: 134, distance: '1.5 km', inStock: true  },
];

// ─── Guardrail Patterns ───────────────────────────────────────────────────────
const GUARDRAIL_PATTERNS = [
  /dosage|how (much|many) .*(take|mg|pill)|overdose|side effect|drug interaction|allergy|allergic|prescribed|prescription/i,
  /is (it|this) safe|can i take|dangerous|emergency|chest pain|bleeding|seizure/i,
  /treatment|diagnosis|diagnose|cure|symptom/i,
];

// ─── Response Logic ───────────────────────────────────────────────────────────
function getResponse(message, intake) {
  // 1. Guardrail check
  if (GUARDRAIL_PATTERNS.some(p => p.test(message))) {
    return {
      text: "I can only help with pharmacy price comparisons — I\'m not able to give medical advice. For questions about dosage, side effects, or drug interactions, please speak with a licensed pharmacist or doctor.",
      isGuardrail: true,
      pharmacies: null,
    };
  }

  // 2. Price / search intent
  const searchIntent = /price|cost|cheap|where|find|comprar|buy|compare|near|closest|best|cuánto|dónde|buscar/i;
  if (searchIntent.test(message) || message.trim().split(' ').length <= 4) {
    const med = intake?.medication || 'your medication';
    const city = intake?.city || 'your city';
    const pref = intake?.preference;

    const sorted = pref === 'Nearest pharmacy'
      ? [...PHARMACY_RESULTS].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      : [...PHARMACY_RESULTS].sort((a, b) => a.price - b.price);

    return {
      text: `Here are the current prices for **${med}** in **${city}**, sorted by ${pref === 'Nearest pharmacy' ? 'distance' : 'price'}:`,
      isGuardrail: false,
      pharmacies: sorted,
    };
  }

  // 3. Fallback
  const med = intake?.medication || 'your medication';
  const city = intake?.city || 'your city';
  return {
    text: `Got it. To find the best price for ${med} in ${city}, try asking something like "Where is it cheapest near me?" and I\'ll show you a full pharmacy comparison.`,
    isGuardrail: false,
    pharmacies: null,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatPage() {
  const [intakeStep, setIntakeStep]     = useState(0);   // 0-2 = intake, 3 = chat
  const [intakeData, setIntakeData]     = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages]         = useState([]);
  const [chatInput, setChatInput]       = useState('');
  const [ratings, setRatings]           = useState({});  // { msgIndex: 'up'|'down' }
  const [saved, setSaved]               = useState(false);
  const [saving, setSaving]             = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, intakeStep]);

  // ── Intake flow ────────────────────────────────────────────────────────────
  function handleIntakeSubmit(value) {
    const question = INTAKE_QUESTIONS[intakeStep];
    const newData = { ...intakeData, [question.id]: value };
    setIntakeData(newData);
    setCurrentInput('');

    if (intakeStep < INTAKE_QUESTIONS.length - 1) {
      setIntakeStep(intakeStep + 1);
    } else {
      // All intake done — open chat with welcome message
      setIntakeStep(3);
      const welcome = `Got it! I'm looking up prices for **${newData.medication}** in **${newData.city}**. I'll sort results by **${newData.preference || 'best price'}**.\n\nYou can ask something like "Where is it cheapest near me?" or "Show me prices" and I'll pull up the comparison.`;
      setMessages([{ role: 'assistant', text: welcome, isGuardrail: false, pharmacies: null }]);
    }
  }

  // ── Chat messages ──────────────────────────────────────────────────────────
  function handleChatSend() {
    const text = chatInput.trim();
    if (!text) return;

    const userMsg = { role: 'user', text };
    const response = getResponse(text, intakeData);
    const assistantMsg = { role: 'assistant', ...response };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setChatInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (intakeStep < 3) {
        if (currentInput.trim()) handleIntakeSubmit(currentInput.trim());
      } else {
        handleChatSend();
      }
    }
  }

  function rateMessage(index, rating) {
    setRatings(prev => ({ ...prev, [index]: prev[index] === rating ? null : rating }));
  }

  // ── Save session ───────────────────────────────────────────────────────────
  async function saveSession() {
    setSaving(true);
    const thumbsUpCount   = Object.values(ratings).filter(r => r === 'up').length;
    const thumbsDownCount = Object.values(ratings).filter(r => r === 'down').length;

    const { error } = await supabase.from('chat_sessions').insert([{
      medication:   intakeData.medication || null,
      city:         intakeData.city       || null,
      preference:   intakeData.preference || null,
      messages:     JSON.stringify(messages),
      thumbs_up:    thumbsUpCount,
      thumbs_down:  thumbsDownCount,
    }]);

    setSaving(false);
    if (!error) setSaved(true);
  }

  const currentQuestion = INTAKE_QUESTIONS[intakeStep];
  const assistantMessages = messages.filter(m => m.role === 'assistant');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Pharmacy Assistant</h1>
        <p className="text-gray-500 mb-2 text-sm">
          Find the best price for your medication — guided by a pharmacy comparison assistant.
        </p>

        {/* Guardrail badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-1.5 rounded-full mb-8">
          <span>⚠️</span>
          <span><strong>Simulated AI</strong> — For demonstration only. Not real medical advice.</span>
        </div>

        {/* ── Chat Window ──────────────────────────────────────────────────── */}
        <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col" style={{ minHeight: 420 }}>

          {/* Messages area */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50/50" style={{ minHeight: 340 }}>

            {/* System open message */}
            <div className="flex justify-center">
              <span className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full">
                FarmaCompara Pharmacy Assistant
              </span>
            </div>

            {/* Intake flow */}
            {intakeStep < 3 && (
              <>
                {/* Show answered intake steps */}
                {INTAKE_QUESTIONS.slice(0, intakeStep).map((q, i) => (
                  <div key={q.id} className="space-y-2">
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 max-w-xs shadow-sm">
                        {q.question}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gray-900 text-white rounded-xl rounded-tr-sm px-4 py-3 text-sm max-w-xs">
                        {intakeData[q.id]}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current intake question */}
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 max-w-xs shadow-sm">
                    {currentQuestion.question}
                  </div>
                </div>
              </>
            )}

            {/* Chat messages */}
            {intakeStep === 3 && messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-sm ${msg.role === 'user' ? 'order-2' : ''}`}>
                  <div
                    className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gray-900 text-white rounded-tr-sm'
                        : msg.isGuardrail
                        ? 'bg-amber-50 border border-amber-200 text-amber-800 rounded-tl-sm'
                        : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.isGuardrail && (
                      <p className="text-xs font-semibold text-amber-600 mb-1.5">⚠️ Outside my scope</p>
                    )}
                    {/* Render bold markdown */}
                    <p>{msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>

                    {/* Pharmacy results */}
                    {msg.pharmacies && (
                      <div className="mt-3 space-y-2">
                        {msg.pharmacies.map((p, pi) => (
                          <div
                            key={p.name}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                              pi === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'
                            }`}
                          >
                            <div>
                              <span className="font-medium text-gray-800">{p.name}</span>
                              {pi === 0 && <span className="ml-2 text-green-600 font-semibold">Best</span>}
                              <div className="text-gray-400 mt-0.5">{p.distance} {p.inStock ? '· In stock' : '· May be out of stock'}</div>
                            </div>
                            <span className="font-bold text-gray-900">${p.price}</span>
                          </div>
                        ))}
                        <p className="text-xs text-gray-400 mt-1">Prices in MXN · Simulated demo data</p>
                      </div>
                    )}
                  </div>

                  {/* Thumbs up/down for assistant messages */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-1.5 pl-1">
                      <button
                        onClick={() => rateMessage(i, 'up')}
                        className={`text-sm transition-all ${ratings[i] === 'up' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}
                        title="Helpful"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => rateMessage(i, 'down')}
                        className={`text-sm transition-all ${ratings[i] === 'down' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}
                        title="Not helpful"
                      >
                        👎
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* ── Input Area ──────────────────────────────────────────────────── */}
          <div className="border-t border-gray-200 bg-white p-4">
            {intakeStep < 3 ? (
              /* Intake input */
              <div>
                {currentQuestion.type === 'options' ? (
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleIntakeSubmit(opt)}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={e => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={currentQuestion.placeholder}
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      autoFocus
                    />
                    <button
                      onClick={() => currentInput.trim() && handleIntakeSubmit(currentInput.trim())}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Question {intakeStep + 1} of {INTAKE_QUESTIONS.length}
                </p>
              </div>
            ) : (
              /* Free chat input */
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about prices, pharmacies, or say 'show me prices'..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-40 transition-colors"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Save Session ─────────────────────────────────────────────────── */}
        {intakeStep === 3 && messages.length > 0 && (
          <div className="mt-4 flex items-center justify-between border border-gray-100 rounded-xl px-5 py-3 bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-700">Save this session</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Saves intake answers, messages, and ratings to Supabase.
              </p>
            </div>
            <button
              onClick={saveSession}
              disabled={saving || saved}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition-colors"
            >
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Session'}
            </button>
          </div>
        )}

        {/* ── Human Checkpoint ─────────────────────────────────────────────── */}
        <div className="mt-8 border border-amber-100 bg-amber-50 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">🧑 Human Checkpoint</h3>
          <p className="text-xs text-amber-700 leading-relaxed">
            This assistant is <strong>simulated and for demonstration only</strong>. All pharmacy prices shown are fictional demo data — not real prices from any pharmacy. For actual medication prices, please visit farmacompara.mx when it launches or call your local pharmacy. For medical questions, consult a licensed doctor or pharmacist.
          </p>
        </div>

        {/* ── Test Summary ─────────────────────────────────────────────────── */}
        {intakeStep === 3 && (
          <div className="mt-6 border border-gray-100 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📊 Session Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">Medication</p>
                <p className="font-medium text-gray-800 truncate">{intakeData.medication || '—'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">City</p>
                <p className="font-medium text-gray-800">{intakeData.city || '—'}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">👍 Helpful</p>
                <p className="font-bold text-green-700">{Object.values(ratings).filter(r => r === 'up').length}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-gray-400 mb-1">👎 Not helpful</p>
                <p className="font-bold text-red-600">{Object.values(ratings).filter(r => r === 'down').length}</p>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
