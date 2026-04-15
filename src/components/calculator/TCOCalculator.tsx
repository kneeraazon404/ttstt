"use client";

import { useState, useMemo, useId } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { providers } from "@/data/providers";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const CHARS_PER_HOUR = 15000; // ~15k characters per hour of synthesized audio
const MINS_PER_HOUR = 60;

export function TCOCalculator() {
    const isClient = useIsClient();
    const [audioHours, setAudioHours] = useState(10);
    const [useCase, setUseCase] = useState<"TTS" | "STT">("TTS");
    const sliderId = useId();
    const useCaseId = useId();

    const chartData = useMemo(() => {
        const relevantProviders = providers.filter(
            (p) => (p.type === useCase || p.type === "BOTH") && p.status !== "discontinued"
        );

        return relevantProviders
            .map((p) => {
                let monthlyCost = 0;
                const tier = p.pricing[0];

                if (useCase === "TTS") {
                    const charsPerMonth = audioHours * CHARS_PER_HOUR;
                    if (tier.unitType === "char") {
                        monthlyCost = (charsPerMonth / tier.unit) * tier.price;
                    } else if (tier.unitType === "sec") {
                        monthlyCost = (audioHours * 3600 / tier.unit) * tier.price;
                    } else if (tier.unitType === "min") {
                        monthlyCost = (audioHours * MINS_PER_HOUR / tier.unit) * tier.price;
                    }
                } else {
                    const minutesPerMonth = audioHours * MINS_PER_HOUR;
                    if (tier.unitType === "min") {
                        monthlyCost = (minutesPerMonth / tier.unit) * tier.price;
                    } else if (tier.unitType === "sec") {
                        monthlyCost = (minutesPerMonth * 60 / tier.unit) * tier.price;
                    }
                }

                return {
                    name: p.name,
                    id: p.id,
                    cost: Math.round(monthlyCost * 100) / 100,
                    openSource: p.openSource ?? false,
                    isNew: p.isNew ?? false,
                };
            })
            .filter((d) => d.cost > 0 || d.openSource) // keep $0 self-hosted open-source
            .sort((a, b) => a.cost - b.cost);
    }, [audioHours, useCase]);

    // Separate very high-cost outliers to keep chart readable
    const p95 = useMemo(() => {
        const costs = chartData.map((d) => d.cost).filter((c) => c > 0);
        if (!costs.length) return Infinity;
        costs.sort((a, b) => a - b);
        return costs[Math.floor(costs.length * 0.9)] * 3; // 3× 90th percentile as cutoff
    }, [chartData]);

    const standardData = chartData.filter((d) => d.cost <= p95);
    const outlierData = chartData.filter((d) => d.cost > p95);

    const cheapest = standardData.find((d) => d.cost === Math.min(...standardData.filter((x) => x.cost > 0).map((x) => x.cost)));
    const mostExpensive = standardData[standardData.length - 1];

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10" aria-hidden="true" />

            <div className="grid md:grid-cols-[300px_1fr] gap-12">
                {/* Controls */}
                <div className="space-y-8">
                    {/* Technology toggle */}
                    <fieldset>
                        <legend
                            id={useCaseId}
                            className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 block"
                        >
                            Technology
                        </legend>
                        <div
                            className="flex bg-slate-950/50 p-1.5 rounded-xl border border-white/5"
                            role="group"
                            aria-labelledby={useCaseId}
                        >
                            <button
                                type="button"
                                onClick={() => setUseCase("TTS")}
                                aria-pressed={useCase === "TTS"}
                                className={cn(
                                    "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
                                    useCase === "TTS"
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                Text-to-Speech
                            </button>
                            <button
                                type="button"
                                onClick={() => setUseCase("STT")}
                                aria-pressed={useCase === "STT"}
                                className={cn(
                                    "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
                                    useCase === "STT"
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                Speech-to-Text
                            </button>
                        </div>
                    </fieldset>

                    {/* Volume slider */}
                    <div>
                        <div className="flex justify-between mb-3">
                            <label
                                htmlFor={sliderId}
                                className="text-sm font-semibold uppercase tracking-wider text-slate-400"
                            >
                                Monthly Volume
                            </label>
                            <output
                                htmlFor={sliderId}
                                className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono font-bold border border-indigo-500/30"
                            >
                                {audioHours} hours
                            </output>
                        </div>
                        <input
                            id={sliderId}
                            type="range"
                            min="1"
                            max="1000"
                            step="1"
                            value={audioHours}
                            onChange={(e) => setAudioHours(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            aria-valuemin={1}
                            aria-valuemax={1000}
                            aria-valuenow={audioHours}
                            aria-valuetext={`${audioHours} hours per month`}
                        />
                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-2" aria-hidden="true">
                            <span>1 hr</span>
                            <span>500 hrs</span>
                            <span>1000 hrs</span>
                        </div>

                        <div className="mt-4 bg-slate-950/50 p-4 rounded-xl border border-white/5 flex gap-3">
                            <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <div className="text-xs text-slate-400 leading-relaxed">
                                <p>Estimated at base pricing tiers.</p>
                                <p className="text-slate-500 mt-1">TTS: ~{CHARS_PER_HOUR.toLocaleString()} chars/hr · STT: {MINS_PER_HOUR} mins/hr</p>
                                <p className="text-slate-500 mt-1">Open-source models shown at $0 (self-hosted).</p>
                            </div>
                        </div>
                    </div>

                    {/* Cost summary */}
                    {cheapest && (
                        <div className="bg-slate-950/50 rounded-xl border border-white/5 p-4 space-y-2 text-xs">
                            <p className="text-slate-400 font-semibold uppercase tracking-wider mb-2">At {audioHours}h/month</p>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Cheapest paid:</span>
                                <span className="text-emerald-400 font-mono font-bold">
                                    {cheapest.cost === 0 ? "Free (open source)" : `$${cheapest.cost.toFixed(2)}`} — {cheapest.name}
                                </span>
                            </div>
                            {mostExpensive && mostExpensive.id !== cheapest.id && (
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Most expensive:</span>
                                    <span className="text-amber-400 font-mono font-bold">
                                        ${mostExpensive.cost.toFixed(2)} — {mostExpensive.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Charts */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Monthly Cost Comparison
                        </h3>
                        {!isClient ? (
                            <div
                                className="w-full rounded-xl bg-slate-800/30 animate-pulse"
                                style={{ height: 400 }}
                                aria-hidden="true"
                            />
                        ) : standardData.length > 0 ? (
                            <div
                                className="w-full"
                                style={{ height: Math.max(300, standardData.length * 52) }}
                                role="img"
                                aria-label={`Bar chart comparing monthly costs for ${useCase} at ${audioHours} hours/month`}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={standardData}
                                        layout="vertical"
                                        margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                            <linearGradient id="openSourceGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#34d399" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis
                                            type="number"
                                            tickFormatter={(val) => `$${val}`}
                                            stroke="#64748b"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={{ stroke: "#334155" }}
                                        />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            width={140}
                                            stroke="#e2e8f0"
                                            fontSize={12}
                                            fontWeight={600}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "rgba(255,255,255,0.02)" }}
                                            contentStyle={{
                                                backgroundColor: "rgba(15, 23, 42, 0.95)",
                                                borderRadius: "12px",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "#fff",
                                                padding: "12px",
                                                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)",
                                            }}
                                            formatter={(value: number | undefined) => [
                                                value === undefined ? "N/A" : value === 0
                                                    ? "Free (self-hosted)"
                                                    : `$${value.toFixed(2)}/month`,
                                                "Estimated Cost",
                                            ]}
                                            labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "4px" }}
                                        />
                                        <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={32} animationDuration={800}>
                                            {standardData.map((entry) => (
                                                <Cell
                                                    key={entry.id}
                                                    fill={entry.openSource ? "url(#openSourceGradient)" : "url(#barGradient)"}
                                                    fillOpacity={0.9}
                                                    stroke="rgba(255,255,255,0.08)"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm py-12 text-center">
                                No {useCase} providers match current filter.
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <span className="inline-block w-3 h-3 rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                                Commercial API
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="inline-block w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-400" aria-hidden="true" />
                                Open Source (self-hosted $0)
                            </span>
                        </div>
                    </div>

                    {/* High-cost outliers */}
                    {isClient && outlierData.length > 0 && (
                        <div className="border-t border-white/10 pt-6">
                            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">
                                High-volume / Premium Tier
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">
                                These providers have significantly higher costs at this volume — typically due to premium subscription tiers.
                            </p>
                            <div className="h-[100px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={outlierData} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="outlierGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#f59e0b" />
                                                <stop offset="100%" stopColor="#d97706" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis type="number" tickFormatter={(v) => `$${v}`} stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: "#334155" }} />
                                        <YAxis dataKey="name" type="category" width={140} stroke="#e2e8f0" fontSize={12} fontWeight={600} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: "rgba(255,255,255,0.02)" }}
                                            contentStyle={{ backgroundColor: "rgba(15,23,42,0.95)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px" }}
                                            formatter={(value: number | undefined) => [value !== undefined ? `$${value.toFixed(2)}/month` : "N/A", "Estimated Cost"]}
                                            labelStyle={{ color: "#fff", fontWeight: "bold" }}
                                        />
                                        <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={28} fill="url(#outlierGradient)" stroke="rgba(255,255,255,0.08)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
