"use client";

import { useState, useId } from "react";
import { providers, Provider } from "@/data/providers";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TOOLTIPS: Record<string, string> = {
    WER: "Word Error Rate — lower is better. Measures the % of words incorrectly transcribed.",
    ELO: "Elo rating from Artificial Analysis Speech Arena — higher is better. Based on human preference comparisons.",
    TTFA: "Time-To-First-Audio — milliseconds until the first audio chunk is delivered. Lower = more responsive.",
    MOS: "Mean Opinion Score — human-rated audio quality on a 1–5 scale.",
};

function Tooltip({ term }: { term: string }) {
    const [open, setOpen] = useState(false);
    const id = useId();
    const text = TOOLTIPS[term];
    if (!text) return <>{term}</>;
    return (
        <span className="relative inline-flex items-center gap-1">
            {term}
            <button
                type="button"
                aria-describedby={open ? id : undefined}
                aria-label={`What is ${term}?`}
                onClick={() => setOpen((v) => !v)}
                onBlur={() => setOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
            >
                <Info className="h-3 w-3 inline" aria-hidden="true" />
            </button>
            {open && (
                <span
                    id={id}
                    role="tooltip"
                    className="absolute bottom-full left-0 mb-1 z-30 w-56 rounded-lg bg-slate-900 border border-white/10 px-3 py-2 text-xs text-slate-200 shadow-xl"
                >
                    {text}
                </span>
            )}
        </span>
    );
}

function StatusBadge({ status, isNew }: { status?: Provider["status"]; isNew?: boolean }) {
    if (status === "discontinued") {
        return (
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 ml-1">
                DISCONTINUED
            </span>
        );
    }
    if (isNew || status === "new") {
        return (
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-1">
                NEW
            </span>
        );
    }
    return null;
}

export function ComparisonMatrix() {
    const [showDiff, setShowDiff] = useState(false);
    const [typeFilter, setTypeFilter] = useState<"ALL" | "TTS" | "STT">("ALL");
    const toggleId = useId();

    const filteredProviders = providers
        .filter((p) => typeFilter === "ALL" || p.type === typeFilter || p.type === "BOTH")
        .filter((p) => !showDiff || p.status !== "discontinued");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto pb-6"
        >
            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <fieldset className="flex gap-2 p-1 bg-secondary/50 rounded-lg" aria-label="Filter by type">
                    <legend className="sr-only">Filter providers by type</legend>
                    {(["ALL", "TTS", "STT"] as const).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setTypeFilter(type)}
                            aria-pressed={typeFilter === type}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                                typeFilter === type
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type === "ALL" ? "All Providers" : type === "TTS" ? "TTS Only" : "STT Only"}
                        </button>
                    ))}
                </fieldset>

                <div className="flex items-center gap-3">
                    <label htmlFor={toggleId} className="text-sm text-muted-foreground cursor-pointer select-none">
                        Hide discontinued
                    </label>
                    <button
                        id={toggleId}
                        type="button"
                        role="switch"
                        aria-checked={showDiff}
                        onClick={() => setShowDiff((v) => !v)}
                        className={cn(
                            "w-10 h-6 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            showDiff ? "bg-primary" : "bg-muted"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform",
                                showDiff ? "translate-x-4" : ""
                            )}
                            aria-hidden="true"
                        />
                        <span className="sr-only">{showDiff ? "Showing active only" : "Showing all providers"}</span>
                    </button>
                </div>
            </div>

            {/* Jargon legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs text-muted-foreground">
                {Object.keys(TOOLTIPS).map((term) => (
                    <span key={term}>
                        <Tooltip term={term} />
                    </span>
                ))}
                <span className="text-muted-foreground/60">— hover <Info className="h-3 w-3 inline" aria-hidden="true" /> for definitions</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full border-collapse min-w-[900px]" role="grid" aria-label="Provider comparison matrix">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="sticky left-0 z-20 bg-background/95 backdrop-blur p-4 text-left border-b border-border w-[220px] text-sm font-semibold text-muted-foreground"
                            >
                                Provider
                            </th>
                            {filteredProviders.map((p) => (
                                <th
                                    key={p.id}
                                    scope="col"
                                    className="p-4 text-left border-b border-border min-w-[200px]"
                                >
                                    <div className="font-bold text-base leading-tight">
                                        {p.name}
                                        <StatusBadge status={p.status} isNew={p.isNew} />
                                        {p.openSource && (
                                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 ml-1">
                                                OPEN SOURCE
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-normal mt-0.5">{p.type}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {/* Pricing Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Pricing
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    {p.status === "discontinued" ? (
                                        <span className="text-sm text-red-400 font-medium">Service discontinued</span>
                                    ) : (
                                        p.pricing.map((tier, i) => (
                                            <div key={i} className="text-sm mb-1">
                                                <span className="font-medium">{tier.name}:</span>{" "}
                                                <span className="text-muted-foreground">{tier.description}</span>
                                            </div>
                                        ))
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* Quality / ELO Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Quality &amp; <Tooltip term="ELO" />
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center gap-2">
                                            <span>Quality</span>
                                            <div className="flex gap-0.5" role="img" aria-label={`${p.benchmarks.quality} out of 5`}>
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={cn("h-1.5 w-3 rounded-full", i < p.benchmarks.quality ? "bg-primary" : "bg-muted")}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center gap-2">
                                            <span>Speed</span>
                                            <div className="flex gap-0.5" role="img" aria-label={`${p.benchmarks.speed} out of 5`}>
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={cn("h-1.5 w-3 rounded-full", i < p.benchmarks.speed ? "bg-green-500" : "bg-muted")}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {p.eloScore && (
                                            <div className="text-xs text-primary font-mono font-bold">
                                                ELO {p.eloScore.toLocaleString()}
                                            </div>
                                        )}
                                        {p.latencyMs && (
                                            <div className="text-xs text-green-400 font-mono">
                                                {p.latencyMs}ms <Tooltip term="TTFA" />
                                            </div>
                                        )}
                                        {p.wer !== undefined && (
                                            <div className="text-xs text-blue-400 font-mono">
                                                {p.wer}% <Tooltip term="WER" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Features Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Key Features
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    <ul className="space-y-1 text-sm" aria-label={`${p.name} features`}>
                                        {p.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check
                                                    className={cn("h-3 w-3 mt-0.5 shrink-0", p.status === "discontinued" ? "text-red-500" : "text-green-500")}
                                                    aria-hidden="true"
                                                />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            ))}
                        </tr>

                        {/* Languages Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Languages
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    {p.status === "discontinued" ? (
                                        <span className="text-sm text-red-400">N/A</span>
                                    ) : (
                                        <span className="text-sm font-medium">
                                            {p.languages}+ {p.languages >= 99 ? "🌍" : ""}
                                        </span>
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* Compliance Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Compliance
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    {p.compliance && p.compliance.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {p.compliance.map((c) => (
                                                <span
                                                    key={c}
                                                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/50"
                                                >
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground/50">—</span>
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* Best For Row */}
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50 text-left"
                            >
                                Best For
                            </th>
                            {filteredProviders.map((p) => (
                                <td key={p.id} className="p-4 align-top">
                                    {p.bestFor.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {p.bestFor.map((b) => (
                                                <span
                                                    key={b}
                                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                                >
                                                    {b.replace(/-/g, " ")}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground/50">—</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
                Data sourced from Artificial Analysis Speech Arena, HuggingFace Open ASR Leaderboard, and official provider documentation.
                All prices approximate as of April 2026. Benchmark scores may vary by use case.
            </p>
        </motion.div>
    );
}
