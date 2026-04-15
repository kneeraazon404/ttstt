import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TCOCalculator } from "@/components/calculator/TCOCalculator";

export const metadata: Metadata = {
    title: "Pricing Calculator — TTS & STT",
    description:
        "Estimate monthly TTS and STT costs across 20+ providers. Drag the volume slider to see real-time cost comparisons including open-source options at $0.",
    openGraph: {
        title: "Pricing Calculator | VoiceTech 2026",
        description:
            "Calculate and compare monthly voice AI costs across 20+ TTS & STT providers. Supports per-character, per-minute, and open-source pricing.",
    },
};

export default function CalculatorPage() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <Link
                href="/#calculator"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to overview
            </Link>

            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                    Pricing Calculator
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Drag the volume slider to compare real monthly costs across all active providers.
                    Open-source models are shown at $0 for self-hosted deployments.
                </p>
            </header>

            <TCOCalculator />
        </div>
    );
}
