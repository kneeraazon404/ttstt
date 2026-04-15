import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ComparisonMatrix } from "@/components/matrix/ComparisonMatrix";

export const metadata: Metadata = {
    title: "Compare TTS & STT Providers",
    description:
        "Full comparison matrix for 20+ voice AI providers — benchmarks, pricing, ELO scores, WER, features, and compliance certifications. Updated April 2026.",
    openGraph: {
        title: "Compare TTS & STT Providers | VoiceTech 2026",
        description:
            "Detailed comparison: ELO scores, WER, pricing, features, and compliance (HIPAA, SOC2, EU AI Act) for 20+ TTS & STT providers.",
    },
};

export default function ComparePage() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <Link
                href="/#compare"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to overview
            </Link>

            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                    Provider Comparison Matrix
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Benchmarks, pricing models, ELO scores, word error rates, feature sets,
                    and compliance certifications across every active TTS &amp; STT provider.
                    Updated April 2026.
                </p>
            </header>

            <ComparisonMatrix />
        </div>
    );
}
