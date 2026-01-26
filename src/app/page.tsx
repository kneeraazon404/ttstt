"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  Volume2,
  Zap,
  Brain,
  ShieldCheck,
  BarChart3,
  ChevronRight,
  RefreshCcw,
  Globe,
  Cpu,
  ArrowRight,
  Coins,
  Layers,
} from "lucide-react";

// --- Types & Interfaces ---
type ViewState = "dashboard" | "stt" | "tts" | "recommender";

interface DataPoint {
  label: string;
  x: number;
  y: number;
  type: "streaming" | "batch" | "native";
  color: string;
}

interface WizardQuestion {
  id: string;
  text: string;
  options: {
    val: string;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[];
}

// --- Constants ---
const STT_DATA: DataPoint[] = [
  {
    label: "Deepgram Nova-3",
    x: 180,
    y: 3.5,
    type: "streaming",
    color: "#10b981",
  },
  {
    label: "OpenAI Whisper v4",
    x: 1200,
    y: 2.1,
    type: "batch",
    color: "#6366f1",
  },
  { label: "Google Chirp v3", x: 850, y: 3.2, type: "batch", color: "#f59e0b" },
  {
    label: "Azure S2S Native",
    x: 140,
    y: 2.8,
    type: "native",
    color: "#0ea5e9",
  },
  { label: "AssemblyAI v3", x: 600, y: 2.5, type: "batch", color: "#ec4899" },
  {
    label: "Local Whisper-Q4",
    x: 90,
    y: 4.8,
    type: "streaming",
    color: "#94a3b8",
  },
];

const TTS_DATA = {
  labels: [
    "Naturalness (MOS)",
    "Speed (Latency)",
    "Cost Efficiency",
    "Emotion Control",
    "Multilingual",
  ],
  datasets: [
    {
      label: "ElevenLabs v3",
      data: [9.8, 7.5, 3.0, 9.9, 9.5],
      borderColor: "#ec4899",
      backgroundColor: "rgba(236, 72, 153, 0.2)",
    },
    {
      label: "OpenAI TTS-2",
      data: [9.2, 9.5, 8.5, 7.0, 8.8],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.2)",
    },
    {
      label: "Meta Voice 2",
      data: [8.8, 8.0, 9.5, 6.0, 9.2],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
    },
  ],
};

// --- Components ---

const Header = ({
  currentView,
  setView,
}: {
  currentView: ViewState;
  setView: (v: ViewState) => void;
}) => (
  <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-18">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Mic size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              VoiceTech{" "}
              <span className="text-blue-600 font-extrabold">2026</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Intelligence Radar
            </p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-2">
          {(["dashboard", "stt", "tts"] as ViewState[]).map((view) => (
            <button
              key={view}
              onClick={() => setView(view)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${
                currentView === view
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {view}
            </button>
          ))}
          <button
            onClick={() => setView("recommender")}
            className={`ml-6 px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 uppercase tracking-wide ${
              currentView === "recommender"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            <Zap size={14} /> Find My Stack
          </button>
        </nav>
      </div>
    </div>
  </header>
);

const Dashboard = ({ setView }: { setView: (v: ViewState) => void }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-3xl font-black text-slate-900 mb-4">
        The State of Audio AI 2026
      </h2>
      <p className="text-slate-600 leading-relaxed max-w-3xl text-lg">
        In 2026, the modular "STT → LLM → TTS" pipeline is being replaced by{" "}
        <strong>Native Speech-to-Speech (S2S)</strong> models. Intelligence now
        resides within the waveform itself, allowing models to perceive emotion
        and respond with near-zero latency.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-all hover:translate-y-[-2px] duration-300">
        <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
          <Zap size={24} />
        </div>
        <h3 className="font-bold text-lg text-slate-800">Latency Threshold</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Human conversation latency is ~200ms. 2026 models like Deepgram Nova-3
          and OpenAI S2S have broken the 150ms barrier.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-all hover:translate-y-[-2px] duration-300">
        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
          <Brain size={24} />
        </div>
        <h3 className="font-bold text-lg text-slate-800">Emotional Saliency</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Text is no longer the intermediary. Models now detect sarcasm,
          fatigue, and urgency directly from input audio frequencies.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all hover:translate-y-[-2px] duration-300">
        <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
          <ShieldCheck size={24} />
        </div>
        <h3 className="font-bold text-lg text-slate-800">Edge Reasoning</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Quantized models (4-bit) now run locally on flagship NPU hardware,
          ensuring 100% data privacy with zero-cost inference.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-xl">
          <BarChart3 size={24} className="text-blue-600" /> 2026 Performance
          Index
        </h3>
        <div className="space-y-6">
          {[
            {
              label: "Accuracy (Whisper v4)",
              val: "97.9%",
              color: "bg-indigo-600",
              width: "97.9%",
            },
            {
              label: "Latency (S2S Native)",
              val: "142ms",
              color: "bg-emerald-500",
              width: "92%",
            },
            {
              label: "Emotion Match (ElevenLabs v3)",
              val: "99.1%",
              color: "bg-rose-500",
              width: "99.1%",
            },
          ].map((m, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{m.label}</span>
                <span className="text-slate-900 font-bold">{m.val}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`${m.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: m.width }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 p-8 rounded-3xl text-white flex flex-col justify-center relative overflow-hidden min-h-[350px]">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-2">Need a tailored stack?</h3>
          <p className="text-blue-100 mb-6 max-w-sm text-lg leading-relaxed">
            Our 2026 recommendation engine analyzes your latency and cost
            requirements.
          </p>
          <button
            onClick={() => setView("recommender")}
            className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl text-lg"
          >
            Start Strategy Wizard <ArrowRight size={20} />
          </button>
        </div>
        <div className="absolute -right-16 -bottom-16 opacity-10">
          <Mic size={300} />
        </div>
      </div>
    </div>
  </div>
);

const Recommender = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: WizardQuestion[] = [
    {
      id: "type",
      text: "What is your primary interface goal?",
      options: [
        {
          val: "realtime",
          label: "Conversational Bot",
          icon: <RefreshCcw size={24} />,
          desc: "Needs sub-200ms latency",
        },
        {
          val: "content",
          label: "Content Creation",
          icon: <Volume2 size={24} />,
          desc: "Prioritize highest fidelity",
        },
      ],
    },
    {
      id: "privacy",
      text: "How sensitive is the user data?",
      options: [
        {
          val: "edge",
          label: "On-Device / Local",
          icon: <Cpu size={24} />,
          desc: "100% Privacy, No Cloud",
        },
        {
          val: "cloud",
          label: "Cloud-Based",
          icon: <Globe size={24} />,
          desc: "Maximum processing power",
        },
      ],
    },
    {
      id: "language",
      text: "Target Audience Reach",
      options: [
        {
          val: "en",
          label: "English / Monolingual",
          icon: <Mic size={24} />,
          desc: "Optimized for single language",
        },
        {
          val: "global",
          label: "Global / Multilingual",
          icon: <Globe size={24} />,
          desc: "Real-time translation needed",
        },
      ],
    },
    {
      id: "cost",
      text: "Budget & Scale Constraints",
      options: [
        {
          val: "startup",
          label: "Efficiency / Startup",
          icon: <Coins size={24} />,
          desc: "Best bang for buck",
        },
        {
          val: "enterprise",
          label: "Enterprise SLA",
          icon: <Layers size={24} />,
          desc: "Max performance, money no object",
        },
      ],
    },
  ];

  const handleSelect = (val: string) => {
    setAnswers({ ...answers, [questions[step].id]: val });
    setStep(step + 1);
  };

  const getResult = () => {
    const { type, privacy, cost } = answers;

    if (type === "realtime") {
      if (privacy === "edge") {
        return {
          title: "Edge Native S2S",
          stack: "Local Whisper-Q4 + Piper NPU",
          desc: "Optimal for privacy-first, ultra-fast local assistants running on consumer hardware.",
        };
      }
      // Cloud Realtime
      if (cost === "enterprise") {
        return {
          title: "Global Enterprise S2S",
          stack: "Azure Native Speech + Deepgram Nova-3",
          desc: "The fastest possible global latency with native audio reasoning and 99.999% SLA.",
        };
      }
      return {
        title: "Speed Scale-Up",
        stack: "Vapi.ai + Groq LPU",
        desc: "Incredible speed at a fraction of the cost, leveraging LPU inference.",
      };
    }

    // Content Creation
    if (privacy === "edge") {
      return {
        title: "Local Studio Pro",
        stack: "Ollama Llama-3 (Audio) + Coqui TTS",
        desc: "Full offline content pipeline. Zero data egress, high fidelity local generation.",
      };
    }
    // Cloud Content
    if (cost === "enterprise") {
      return {
        title: "Cinematic Synthesis",
        stack: "ElevenLabs v3 + GPT-5 Audio",
        desc: "Unmatched emotional range and broadcast-quality output for high-end production.",
      };
    }
    return {
      title: "Creator Economy Pack",
      stack: "OpenAI TTS-1 + Whisper v3",
      desc: "Industry standard balance of speed, cost, and very high quality.",
    };
  };

  if (step >= questions.length) {
    const res = getResult();
    return (
      <div className="max-w-2xl mx-auto py-10 text-center animate-in fade-in zoom-in-95">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Zap size={48} />
        </div>
        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">
          Your 2026 Strategy
        </h3>
        <h2 className="text-5xl font-black text-slate-900 mb-6">{res.title}</h2>
        <div className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl font-mono text-base mb-8 shadow-xl">
          {res.stack}
        </div>
        <p className="text-slate-600 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          {res.desc}
        </p>
        <button
          onClick={() => setStep(0)}
          className="text-blue-600 font-bold hover:underline text-lg"
        >
          Start Over
        </button>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="max-w-3xl mx-auto py-10 animate-in fade-in slide-in-from-right-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900">{q.text}</h2>
        <p className="text-slate-500 mt-4 text-lg">
          Step {step + 1} of {questions.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {q.options.map((opt) => (
          <button
            key={opt.val}
            onClick={() => handleSelect(opt.val)}
            className="p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group shadow-sm hover:shadow-xl"
          >
            <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              {opt.icon}
            </div>
            <div className="font-bold text-2xl text-slate-900 mb-2">
              {opt.label}
            </div>
            <div className="text-base text-slate-500 leading-relaxed">
              {opt.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState<ViewState>("dashboard");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js via CDN dynamically for this single-file React component
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      if (view === "stt" || view === "tts") {
        renderChart();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
      document.body.removeChild(script);
    };
  }, [view]);

  const renderChart = () => {
    if (!chartRef.current || !window.Chart) return;

    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (view === "stt") {
      chartInstance.current = new window.Chart(ctx, {
        type: "bubble",
        data: {
          datasets: [
            {
              label: "2026 STT Performance",
              data: STT_DATA.map((d) => ({
                x: d.x,
                y: d.y,
                r: 10,
                label: d.label,
                color: d.color,
              })),
              backgroundColor: STT_DATA.map((d) => d.color),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: "Latency (ms) - Log Scale" },
              type: "logarithmic",
              min: 50,
            },
            y: {
              title: { display: true, text: "Word Error Rate (%)" },
              reverse: true,
              min: 1,
              max: 6,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (c: any) =>
                  `${c.raw.label}: ${c.raw.y}% WER, ${c.raw.x}ms`,
              },
            },
          },
        },
      });
    } else if (view === "tts") {
      chartInstance.current = new window.Chart(ctx, {
        type: "radar",
        data: TTS_DATA,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: { suggestedMin: 0, suggestedMax: 10 },
          },
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header currentView={view} setView={setView} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {view === "dashboard" && <Dashboard setView={setView} />}

        {(view === "stt" || view === "tts") && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-2">
                  {view === "stt"
                    ? "Voice-to-Text Benchmarks"
                    : "Text-to-Voice Benchmarks"}
                </h2>
                <p className="text-slate-500 text-lg mt-2 max-w-2xl">
                  {view === "stt"
                    ? "Comparing speed (ms) vs. accuracy (WER) in 2026 environments."
                    : "Emotional fidelity and multilingual performance profiles."}
                </p>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button
                  onClick={() => setView("stt")}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === "stt" ? "bg-blue-600 text-white shadow-md" : "text-slate-500"}`}
                >
                  STT
                </button>
                <button
                  onClick={() => setView("tts")}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === "tts" ? "bg-blue-600 text-white shadow-md" : "text-slate-500"}`}
                >
                  TTS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[500px]">
                <canvas ref={chartRef}></canvas>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col justify-center">
                  <h4 className="font-bold text-slate-900 mb-4 text-xl">
                    Market Insight
                  </h4>
                  <p className="text-slate-500 leading-relaxed text-base">
                    {view === "stt"
                      ? "Deepgram Nova-3 remains the latency king, but Whisper v4's distilled models are now achieving human parity at near-instant speeds on edge NPUs."
                      : "ElevenLabs v3 introduces 'Contextual Breathing' and 'Implicit Tone', allowing generated audio to sound exactly like the specific room acoustics of the input sample."}
                  </p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2 text-lg">
                    Pricing Shift
                  </h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    2026 marks the end of simple per-minute billing. Most
                    providers now use 'Reasoning Tokens' based on the depth of
                    emotional analysis required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "recommender" && <Recommender />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            © 2026 VoiceIntel Intelligence Group • January 26, 2026 Update
          </p>
          <p className="text-slate-300 text-[10px] mt-1 uppercase tracking-widest">
            Confidential Research Material
          </p>
        </div>
      </footer>
    </div>
  );
}

// Ensure window.Chart is defined for TypeScript
declare global {
  interface Window {
    Chart: any;
  }
}
