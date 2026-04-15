import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { RecommendationWizard } from "@/components/wizard/RecommendationWizard";
import { ComparisonMatrix } from "@/components/matrix/ComparisonMatrix";
import { TCOCalculator } from "@/components/calculator/TCOCalculator";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  BarChart3,
  Wand2,
  Layers,
  Calculator,
  Newspaper,
  TrendingUp,
  Cpu,
  Shield,
  AlertTriangle,
} from "lucide-react";

// ─── Section helpers ──────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = "center",
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  align?: "center" | "left";
  action?: React.ReactNode;
}) {
  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${textAlign} mb-12`}>
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {eyebrow}
      </p>
      <div className={`flex flex-wrap ${align === "center" ? "justify-center" : "justify-between"} items-end gap-4 w-full`}>
        <div className={align === "center" ? "text-center" : ""}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className={`mt-3 text-base text-muted-foreground ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

// ─── Market updates data ──────────────────────────────────────────────────────

const marketUpdates = [
  {
    badge: "NEW",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "Mistral Voxtral (Mar 26)",
    body: "4B-parameter open-weight model, 90ms TTFA, runs on smartphones with 3 GB RAM. $16/1M chars.",
  },
  {
    badge: "NEW",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "Microsoft MAI (Apr 3)",
    body: "MAI-Transcribe-1 achieves 3.8% WER — beats Whisper-large-v3 on 22 of 25 languages.",
  },
  {
    badge: "NEW",
    badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "xAI Grok TTS (Mar 16)",
    body: "OpenAI Realtime API-compatible format enables drop-in migration from existing stacks.",
  },
  {
    badge: "MILESTONE",
    badgeClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    title: "ElevenLabs — $11B",
    body: "$500M Series D led by Sequoia. On-premise/on-device now available. $330M+ ARR.",
  },
  {
    badge: "OPEN SOURCE",
    badgeClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    title: "Chatterbox beats ElevenLabs",
    body: "MIT-licensed model preferred by 63.75% of evaluators in blind tests. Free, 23 languages.",
  },
  {
    badge: "SHUTDOWN",
    badgeClass: "text-red-400 bg-red-500/10 border-red-500/20",
    title: "PlayHT — Discontinued",
    body: "Shut down Dec 31, 2025 after Meta acquisition. Migrate to ElevenLabs or Chatterbox.",
  },
];

const useCases = [
  {
    title: "Real-time Voice Agent",
    icon: "⚡",
    picks: [
      "Cartesia Sonic — 40ms TTFA",
      "Inworld TTS-1.5 Mini — <130ms",
      "ElevenLabs Flash v2.5 — ~75ms",
    ],
  },
  {
    title: "Highest Quality TTS",
    icon: "✨",
    picks: [
      "Inworld TTS-1.5 Max (ELO 1,236)",
      "ElevenLabs v3 (ELO 1,197)",
      "Fish Audio S2 Pro (ELO 1,128 — open)",
    ],
  },
  {
    title: "Best Value STT",
    icon: "💰",
    picks: [
      "AssemblyAI Universal-2 — $0.0025/min",
      "Deepgram Nova-3 — $0.0043/min",
      "OpenAI Mini Transcribe — $0.003/min",
    ],
  },
  {
    title: "Voice Cloning",
    icon: "🎤",
    picks: [
      "ElevenLabs — professional grade",
      "Cartesia — 3-second cloning",
      "Chatterbox — free, MIT licensed",
    ],
  },
  {
    title: "Edge / Offline TTS",
    icon: "📱",
    picks: [
      "Kokoro 82M — CPU capable, Apache 2.0",
      "Chatterbox Turbo — sub-200ms",
      "Mistral Voxtral — 3 GB RAM",
    ],
  },
  {
    title: "Edge / Offline STT",
    icon: "🔒",
    picks: [
      "Moonshine 245M — MIT, = Whisper v3",
      "Whisper.cpp — 38K+ GitHub stars",
      "NVIDIA Canary Qwen — 5.63% WER",
    ],
  },
];

const stats = [
  { value: "20+", label: "Providers Tracked", icon: BarChart3 },
  { value: "$11B", label: "ElevenLabs Valuation", icon: TrendingUp },
  { value: "67+", label: "Models on Artificial Analysis", icon: Cpu },
  { value: "Aug 2", label: "EU AI Act Deadline '26", icon: Shield },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 lg:px-8 py-28 sm:py-36 lg:py-44 overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary mb-8">
            Updated April 2026 &mdash; Mistral Voxtral · xAI Grok · Microsoft MAI
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/40">
              The independent voice AI
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-400">
              intelligence radar.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real benchmarks. Transparent pricing. Guided recommendations.
            <br className="hidden sm:block" />
            20+ TTS &amp; STT providers, updated for April 2026.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#quiz"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              Find My Stack <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#compare"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              View all benchmarks <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-[900px] h-[600px] bg-primary/8 rounded-full blur-[140px]" />
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <div className="border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <Icon className="h-4 w-4 text-primary/60 mb-1" aria-hidden="true" />
                <dt className="text-3xl font-extrabold tabular-nums text-foreground">{value}</dt>
                <dd className="text-xs text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── LEADERBOARD ──────────────────────────────────────────────────────── */}
      <section
        id="leaderboard"
        aria-labelledby="leaderboard-heading"
        className="py-20 sm:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Independent Benchmarks"
            icon={BarChart3}
            title="Market Leaders at a Glance"
            description="Quality, Speed, Feature richness, and Price efficiency across all active providers — sorted by composite value score."
          />
          <Leaderboard />
        </div>
      </section>

      {/* ── RECOMMENDATION WIZARD ────────────────────────────────────────────── */}
      <section
        id="quiz"
        aria-labelledby="quiz-heading"
        className="py-20 sm:py-28 bg-secondary/10 border-y border-border/40 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recommendation Engine"
            icon={Wand2}
            title="Find Your Perfect Stack"
            description="Answer 3 questions to get a personalised recommendation rooted in April 2026 benchmarks."
          />
          <RecommendationWizard />
        </div>
      </section>

      {/* ── MARKET UPDATES ───────────────────────────────────────────────────── */}
      <section
        id="updates"
        aria-labelledby="updates-heading"
        className="py-20 sm:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Market Updates — April 2026"
            icon={Newspaper}
            title="What Changed Since February"
            description="Three new TTS entrants, open-source models now beating commercial leaders, and one major shutdown."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marketUpdates.map(({ badge, badgeClass, title, body }) => (
              <article
                key={title}
                className="glass-card rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors"
              >
                <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                  {badge}
                </span>
                <h3 className="font-semibold text-foreground text-sm leading-snug">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE MATRIX ───────────────────────────────────────────────────── */}
      <section
        id="compare"
        aria-labelledby="compare-heading"
        className="py-20 sm:py-28 bg-secondary/10 border-y border-border/40 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Provider Comparison"
            icon={Layers}
            title="Compare All Providers"
            description="Benchmarks, pricing, ELO scores, WER, features, and compliance across every active TTS &amp; STT provider."
            align="left"
            action={
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                aria-label="Open full comparison page"
              >
                Full page view <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ComparisonMatrix />
          {/* Compliance callout */}
          <div className="mt-8 flex gap-3 items-start rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <span className="font-semibold text-amber-300">EU AI Act Article 50 — August 2, 2026.</span>
              {" "}All voice AI systems must disclose AI origin, mark synthetic audio in machine-readable format,
              and comply with emotion recognition restrictions. California CAITA aligns to the same date.
              Penalties up to €30M or 7% of global turnover.
            </p>
          </div>
        </div>
      </section>

      {/* ── TCO CALCULATOR ───────────────────────────────────────────────────── */}
      <section
        id="calculator"
        aria-labelledby="calculator-heading"
        className="py-20 sm:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing Calculator"
            icon={Calculator}
            title="Estimate Your Monthly Cost"
            description="Drag the volume slider to compare real costs across all active providers at your scale. Open-source options shown at $0 self-hosted."
            align="left"
            action={
              <Link
                href="/calculator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                aria-label="Open full calculator page"
              >
                Full page view <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <TCOCalculator />
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────────── */}
      <section
        id="use-cases"
        aria-labelledby="use-cases-heading"
        className="py-20 sm:py-28 bg-secondary/10 border-t border-border/40 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Community Picks"
            title="Best Provider by Use Case"
            description="Ranked by the community based on real production deployments, blind tests, and Artificial Analysis benchmarks."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map(({ title, icon, picks }) => (
              <article
                key={title}
                className="glass-card rounded-xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-base shrink-0"
                    role="img"
                    aria-label={title}
                  >
                    {icon}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm">{title}</h3>
                </div>
                <ol className="space-y-2">
                  {picks.map((pick, i) => (
                    <li key={pick} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <span className="font-bold tabular-nums text-primary shrink-0 mt-px">{i + 1}.</span>
                      <span>{pick}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
