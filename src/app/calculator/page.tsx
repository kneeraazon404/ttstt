import { TCOCalculator } from "@/components/calculator/TCOCalculator";

export const metadata = {
    title: "TCO Calculator | VoiceTech 2026",
    description: "Estimate your monthly costs for TTS and STT APIs based on usage volume.",
};

export default function CalculatorPage() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="mb-12 max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                    TCO Calculator
                </h1>
                <p className="text-lg text-muted-foreground">
                    Identify the most cost-effective provider for your scale.
                    Factor in hidden costs and different pricing models (per character vs per minute).
                </p>
            </div>

            <TCOCalculator />
        </div>
    );
}
