"use client";

import { RecommendationWizard } from "@/components/wizard/RecommendationWizard";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import Link from "next/link";
import { ArrowRight, BarChart3, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <span>Voice Architecture 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            Stop Guessing. <br className="hidden sm:block" />
            Start Building with the Right Voice Tech.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            The only independent comparison platform for TTS & STT.
            Real benchmarks, transparent pricing, and guided decision paths for your specific use case.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#quiz"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all flex items-center gap-2"
            >
              Find My Stack <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/compare" className="text-sm font-semibold leading-6 text-foreground group flex items-center gap-1">
              View All Benchmarks <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-24 sm:py-32 relative bg-secondary/20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max_w-2xl text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary font-bold tracking-wide uppercase text-sm">
              <BarChart3 className="w-5 h-5" />
              <span>Independent Benchmarks</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              Market Leaders at a Glance
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Live performance data visualizing the trade-offs between Quality, Speed, Feature richness, and Price.
            </p>
          </div>
          <Leaderboard />
        </div>
      </section>

      {/* Wizard Section */}
      <section id="quiz" className="py-24 sm:py-32 relative scroll-mt-20">
        <div className="mx-auto max_w-7xl px-6 lg:px-8">
          <div className="mx-auto max_w-2xl text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary font-bold tracking-wide uppercase text-sm">
              <Wand2 className="w-5 h-5" />
              <span>Recommendation Engine</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Find Your Perfect Stack
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Answer 3 simple questions to get a tailored recommendation rooted in 2026 benchmarks.
            </p>
          </div>
          <RecommendationWizard />
        </div>
      </section>
    </div>
  );
}
