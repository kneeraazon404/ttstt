import { ComparisonMatrix } from "@/components/matrix/ComparisonMatrix";

export const metadata = {
    title: "Compare TTS & STT Providers | VoiceTech 2026",
    description: "Detailed feature, price, and benchmark comparison of top voice AI providers.",
};

export default function ComparePage() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                    Provider Comparison Matrix
                </h1>
                <p className="text-lg text-muted-foreground">
                    Detailed breakdown of benchmarks, pricing models, and feature sets.
                </p>
            </div>

            <ComparisonMatrix />
        </div>
    );
}
