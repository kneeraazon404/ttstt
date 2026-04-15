"use client";

import { useState } from "react";
import { providers, Provider } from "@/data/providers";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type UseCase = "voice-agent" | "content-creation" | "transcription" | "accessibility" | "budget";
type Priority = "quality" | "speed" | "price";
type Volume = "low" | "medium" | "high";
type SelectionValue = UseCase | Priority | Volume;

interface QuizState {
    step: number;
    useCase: UseCase | null;
    volume: Volume | null;
    priority: Priority | null;
}

const steps: Array<{
    id: number;
    question: string;
    options: Array<{ value: SelectionValue; label: string; desc: string }>;
}> = [
    {
        id: 1,
        question: "What are you building?",
        options: [
            { value: "voice-agent", label: "Voice Agent / Assistant", desc: "Real-time, conversational, low latency" },
            { value: "content-creation", label: "Content Creation", desc: "Podcasts, audiobooks, videos" },
            { value: "transcription", label: "Transcription & Analytics", desc: "Meeting notes, call recording analysis" },
            { value: "accessibility", label: "Accessibility Tool", desc: "Screen readers, reading assistants" },
            { value: "budget", label: "Hobby / Budget Project", desc: "Free or very low cost highly prioritized" },
        ],
    },
    {
        id: 2,
        question: "What is your top priority?",
        options: [
            { value: "quality", label: "Max Quality", desc: "Only the best sounding / most accurate matters" },
            { value: "speed", label: "Max Speed", desc: "Lowest possible latency is critical" },
            { value: "price", label: "Lowest Price", desc: "Budget is the main constraint" },
        ],
    },
    {
        id: 3,
        question: "Expected Monthly Volume?",
        options: [
            { value: "low", label: "Low (< 10 hours)", desc: "Just starting out or prototyping" },
            { value: "medium", label: "Medium (10–100 hours)", desc: "Growing production app" },
            { value: "high", label: "High (100+ hours)", desc: "Enterprise scale" },
        ],
    },
];

export function RecommendationWizard() {
    const [state, setState] = useState<QuizState>({
        step: 1,
        useCase: null,
        volume: null,
        priority: null,
    });
    const [recommendations, setRecommendations] = useState<Provider[]>([]);

    function calculateRecommendations(finalState: QuizState) {
        const scored = providers
            .filter((p) => p.status !== "discontinued")
            .map((p) => {
                let score = 0;
                if (finalState.useCase && p.bestFor.includes(finalState.useCase)) score += 10;
                if (finalState.useCase === "voice-agent" && p.benchmarks.speed >= 4) score += 5;
                if (finalState.useCase === "content-creation" && p.benchmarks.quality >= 4.5) score += 5;
                if (finalState.useCase === "budget" && p.benchmarks.priceScore >= 4) score += 10;
                if (finalState.priority === "quality") score += p.benchmarks.quality * 2;
                if (finalState.priority === "speed") score += p.benchmarks.speed * 2;
                if (finalState.priority === "price") score += p.benchmarks.priceScore * 2;
                return { ...p, score };
            });

        setRecommendations(
            scored.sort((a, b) => b.score - a.score).slice(0, 3)
        );
    }

    function handleSelect(value: SelectionValue) {
        setState((prev) => {
            const next = { ...prev };
            if (prev.step === 1) next.useCase = value as UseCase;
            if (prev.step === 2) next.priority = value as Priority;
            if (prev.step === 3) next.volume = value as Volume;

            if (prev.step < 3) {
                next.step += 1;
            } else {
                next.step = 4;
                // calculateRecommendations uses the finalised state, call after setState
                calculateRecommendations(next);
            }
            return next;
        });
    }

    function reset() {
        setState({ step: 1, useCase: null, volume: null, priority: null });
        setRecommendations([]);
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {state.step <= 3 ? (
                    <motion.div
                        key={state.step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                Step {state.step} of 3
                            </p>
                            <h2
                                className="text-2xl font-bold mt-2"
                                id={`wizard-step-${state.step}`}
                            >
                                {steps[state.step - 1].question}
                            </h2>
                        </div>

                        <div
                            className="grid gap-3"
                            role="group"
                            aria-labelledby={`wizard-step-${state.step}`}
                        >
                            {steps[state.step - 1].options.map((opt) => (
                                <button
                                    key={String(opt.value)}
                                    type="button"
                                    onClick={() => handleSelect(opt.value)}
                                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <div>
                                        <div className="font-semibold">{opt.label}</div>
                                        <div className="text-sm text-muted-foreground">{opt.desc}</div>
                                    </div>
                                    <ArrowRight
                                        className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                                        aria-hidden="true"
                                    />
                                </button>
                            ))}
                        </div>

                        {state.step > 1 && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                                >
                                    <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
                                    Start Over
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                        aria-live="polite"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                                Top Recommendations
                            </h2>
                            <p className="text-muted-foreground mt-2">Based on your specific needs</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {recommendations.map((rec, i) => (
                                <article
                                    key={rec.id}
                                    className="glass-card p-6 rounded-xl relative overflow-hidden hover:border-primary/50 transition-all"
                                >
                                    {i === 0 && (
                                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                            BEST MATCH
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{rec.name}</h3>
                                    <div className="flex flex-wrap gap-2 my-2">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                            {rec.type}
                                        </span>
                                        {rec.openSource && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                Open Source
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                                        {rec.description}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span>Quality</span>
                                            <div
                                                className="flex gap-0.5"
                                                role="img"
                                                aria-label={`Quality: ${rec.benchmarks.quality} out of 5`}
                                            >
                                                {[...Array(5)].map((_, j) => (
                                                    <div
                                                        key={j}
                                                        className={cn(
                                                            "h-1.5 w-4 rounded-full",
                                                            j < rec.benchmarks.quality ? "bg-primary" : "bg-muted"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Speed</span>
                                            <div
                                                className="flex gap-0.5"
                                                role="img"
                                                aria-label={`Speed: ${rec.benchmarks.speed} out of 5`}
                                            >
                                                {[...Array(5)].map((_, j) => (
                                                    <div
                                                        key={j}
                                                        className={cn(
                                                            "h-1.5 w-4 rounded-full",
                                                            j < rec.benchmarks.speed ? "bg-green-500" : "bg-muted"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {rec.eloScore && (
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">ELO Score</span>
                                                <span className="text-primary font-mono font-bold">
                                                    {rec.eloScore.toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <a
                                        href={rec.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 block w-full text-center py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        aria-label={`Visit ${rec.name} website (opens in new tab)`}
                                    >
                                        Visit Website
                                    </a>
                                </article>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="button"
                                onClick={reset}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                            >
                                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                                Start Over
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
