"use client";

import { useState } from "react";
import { providers, Provider } from "@/data/providers";
import { Check, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ComparisonMatrix() {
    const [showDiff, setShowDiff] = useState(false);
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'TTS' | 'STT'>('ALL');

    const filteredProviders = providers.filter(p => typeFilter === 'ALL' || p.type === typeFilter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto pb-6"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg">
                    {(['ALL', 'TTS', 'STT'] as const).map(type => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                                typeFilter === type ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Show Differences Only</label>
                    <button
                        onClick={() => setShowDiff(!showDiff)}
                        className={cn("w-10 h-6 rounded-full transition-colors relative", showDiff ? "bg-primary" : "bg-muted")}
                    >
                        <div className={cn("absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform", showDiff ? "translate-x-4" : "")} />
                    </button>
                </div>
            </div>

            <table className="w-full border-collapse min-w-[1000px]">
                <thead>
                    <tr>
                        <th className="sticky left-0 z-20 bg-background/95 backdrop-blur p-4 text-left border-b border-border w-[250px]">Provider</th>
                        {filteredProviders.map(p => (
                            <th key={p.id} className="p-4 text-left border-b border-border min-w-[200px]">
                                <div className="font-bold text-lg">{p.name}</div>
                                <div className="text-xs text-muted-foreground font-normal">{p.type}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {/* Pricing Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50">Pricing</td>
                        {filteredProviders.map(p => (
                            <td key={p.id} className="p-4 align-top">
                                {p.pricing.map((tier, i) => (
                                    <div key={i} className="text-sm mb-1">
                                        <span className="font-medium">{tier.name}:</span> {tier.description}
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>

                    {/* Benchmarks Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50">Benchmarks</td>
                        {filteredProviders.map(p => (
                            <td key={p.id} className="p-4 align-top">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center gap-2">
                                        <span>Quality</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={cn("h-1.5 w-3 rounded-full", i < p.benchmarks.quality ? "bg-primary" : "bg-muted")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-2">
                                        <span>Speed</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={cn("h-1.5 w-3 rounded-full", i < p.benchmarks.speed ? "bg-green-500" : "bg-muted")} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Features Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50">Key Features</td>
                        {filteredProviders.map(p => (
                            <td key={p.id} className="p-4 align-top">
                                <ul className="space-y-1 text-sm">
                                    {p.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="h-3 w-3 text-green-500" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        ))}
                    </tr>

                    {/* Languages Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-background/95 backdrop-blur p-4 text-sm font-semibold text-muted-foreground border-r border-border/50">Languages</td>
                        {filteredProviders.map(p => (
                            <td key={p.id} className="p-4 align-top">
                                <span className="text-sm font-medium">{p.languages}+ Languages</span>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </motion.div>
    );
}
