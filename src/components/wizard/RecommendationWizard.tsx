"use client";

import { useState } from "react";
import { providers, Provider } from "@/data/providers";
import { ArrowRight, Check, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type UseCase = 'voice-agent' | 'content-creation' | 'transcription' | 'accessibility' | 'budget';

interface QuizState {
    step: number;
    useCase: UseCase | null;
    volume: 'low' | 'medium' | 'high' | null;
    priority: 'quality' | 'speed' | 'price' | null;
}

const steps = [
    {
        id: 1,
        question: "What are you building?",
        options: [
            { value: 'voice-agent', label: 'Voice Agent / Assistant', desc: 'Real-time, conversational, low latency' },
            { value: 'content-creation', label: 'Content Creation', desc: 'Podcasts, Audiobooks, Videos' },
            { value: 'transcription', label: 'Transcription & Analytics', desc: 'Meeting notes, call recording analysis' },
            { value: 'accessibility', label: 'Accessibility Tool', desc: 'Screen readers, reading assistants' },
            { value: 'budget', label: 'Hobby / Budget Project', desc: 'Free or very low cost highly prioritized' },
        ]
    },
    {
        id: 2,
        question: "What is your top priority?",
        options: [
            { value: 'quality', label: 'Max Quality', desc: 'Only the best sounding/most accurate matters' },
            { value: 'speed', label: 'Max Speed', desc: 'Lowest possible latency is critical' },
            { value: 'price', label: 'Lowest Price', desc: 'Budget is the main constraint' },
        ]
    },
    {
        id: 3,
        question: "Expected Monthly Volume?",
        options: [
            { value: 'low', label: 'Low (< 10 hours)', desc: 'Just starting out or prototyping' },
            { value: 'medium', label: 'Medium (10 - 100 hours)', desc: 'Growing production app' },
            { value: 'high', label: 'High (100+ hours)', desc: 'Enterprise scale' },
        ]
    }
];

export function RecommendationWizard() {
    const [state, setState] = useState<QuizState>({
        step: 1,
        useCase: null,
        volume: null,
        priority: null,
    });
    const [recommendations, setRecommendations] = useState<Provider[]>([]);

    const handleSelect = (value: any) => {
        setState((prev) => {
            const next = { ...prev };
            if (prev.step === 1) next.useCase = value;
            if (prev.step === 2) next.priority = value;
            if (prev.step === 3) next.volume = value;

            if (prev.step < 3) {
                next.step += 1;
            } else {
                next.step = 4; // Results
                calculateRecommendations(next);
            }
            return next;
        });
    };

    const calculateRecommendations = (finalState: QuizState) => {
        // Basic scoring logic
        const scored = providers.map(p => {
            let score = 0;

            // Use Case match
            if (finalState.useCase && p.bestFor.includes(finalState.useCase)) score += 10;
            if (finalState.useCase === 'voice-agent' && p.benchmarks.speed >= 4) score += 5;
            if (finalState.useCase === 'content-creation' && p.benchmarks.quality >= 4.5) score += 5;
            if (finalState.useCase === 'budget' && p.benchmarks.priceScore >= 4) score += 10;

            // Priority match
            if (finalState.priority === 'quality') score += p.benchmarks.quality * 2;
            if (finalState.priority === 'speed') score += p.benchmarks.speed * 2;
            if (finalState.priority === 'price') score += p.benchmarks.priceScore * 2;

            // Type match (implicit filter for now, ideally we ask TTS vs STT)
            // For now we mix them or assume user wants relevant tools for the use case.
            // E.g. Voice Agent needs both.

            return { ...p, score };
        });

        setRecommendations(scored.sort((a, b) => b.score - a.score).slice(0, 3));
    };

    const reset = () => {
        setState({ step: 1, useCase: null, volume: null, priority: null });
        setRecommendations([]);
    };

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
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step {state.step} of 3</span>
                            <h2 className="text-2xl font-bold mt-2">{steps[state.step - 1].question}</h2>
                        </div>

                        <div className="grid gap-3">
                            {steps[state.step - 1].options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all text-left"
                                >
                                    <div>
                                        <div className="font-semibold">{opt.label}</div>
                                        <div className="text-sm text-muted-foreground">{opt.desc}</div>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </button>
                            ))}
                        </div>

                        {state.step > 1 && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors opacity-70 hover:opacity-100"
                                >
                                    <RefreshCcw className="h-3.5 w-3.5" /> Start Over
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
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Top Recommendations</h2>
                            <p className="text-muted-foreground mt-2">Based on your specific needs</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {recommendations.map((rec, i) => (
                                <div key={rec.id} className="glass-card p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                                    {i === 0 && (
                                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                            BEST MATCH
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{rec.name}</h3>
                                    <div className="flex gap-2 my-2">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{rec.type}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{rec.description}</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Quality</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={cn("h-1.5 w-4 rounded-full", i < rec.benchmarks.quality ? "bg-primary" : "bg-muted")} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Speed</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={cn("h-1.5 w-4 rounded-full", i < rec.benchmarks.speed ? "bg-green-500" : "bg-muted")} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <a href={rec.website} target="_blank" rel="noopener noreferrer" className="mt-6 block w-full text-center py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-semibold">
                                        Visit Website
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button onClick={reset} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <RefreshCcw className="h-4 w-4" /> Start Over
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
