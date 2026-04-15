"use client";

import { providers } from "@/data/providers";
import { useIsClient } from "@/hooks/useIsClient";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
}) => {
    if (active && payload && payload.length) {
        const total = payload.reduce((s, e) => s + e.value, 0);
        return (
            <div
                role="status"
                aria-live="polite"
                className="bg-slate-950/95 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl ring-1 ring-white/10 z-50"
            >
                <p className="font-bold text-white mb-3 text-base border-b border-white/10 pb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-6 text-sm mb-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: entry.color }} aria-hidden="true" />
                            <span className="text-slate-300 capitalize font-medium">{entry.name}</span>
                        </div>
                        <span className="text-white font-mono font-bold">{entry.value}/5</span>
                    </div>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Total Score</span>
                    <span className="text-primary font-mono font-bold">{total.toFixed(1)}/20</span>
                </div>
            </div>
        );
    }
    return null;
};

export function Leaderboard() {
    const isClient = useIsClient();

    const chartData = providers
        .filter((p) => p.status !== "discontinued")
        .map((p) => ({
            name: p.name.replace(" (Open Source)", "").replace("v1.0", "").trim(),
            Quality: p.benchmarks.quality,
            Speed: p.benchmarks.speed,
            Features: p.benchmarks.features,
            Price: p.benchmarks.priceScore,
            total:
                p.benchmarks.quality +
                p.benchmarks.speed +
                p.benchmarks.features +
                p.benchmarks.priceScore,
            openSource: p.openSource ?? false,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 12);

    return (
        <div className="space-y-16">
            <div className="glass p-4 sm:p-6 md:p-10 rounded-3xl border border-white/10 bg-slate-900/60 relative overflow-hidden shadow-2xl animate-fade-up">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-10" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[150px] -z-10" aria-hidden="true" />

                <div className="mb-8 md:mb-12 text-center px-2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-tight">
                        Market Value Composition
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                        Stacked analysis of Quality, Speed, Features, and Price efficiency.
                        Higher total area = better overall value. Sorted by composite score.
                    </p>
                </div>

                {/* Accessible data table for screen readers */}
                <table className="sr-only" aria-label="Provider benchmark scores">
                    <caption>Top providers ranked by composite score (Quality + Speed + Features + Price)</caption>
                    <thead>
                        <tr>
                            <th scope="col">Provider</th>
                            <th scope="col">Quality (out of 5)</th>
                            <th scope="col">Speed (out of 5)</th>
                            <th scope="col">Features (out of 5)</th>
                            <th scope="col">Price Score (out of 5)</th>
                            <th scope="col">Total (out of 20)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((p) => (
                            <tr key={p.name}>
                                <td>{p.name}</td>
                                <td>{p.Quality}</td>
                                <td>{p.Speed}</td>
                                <td>{p.Features}</td>
                                <td>{p.Price}</td>
                                <td>{p.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div
                    className="h-[400px] sm:h-[500px] md:h-[600px] w-full"
                    role="img"
                    aria-label="Stacked area chart showing benchmark scores for top providers"
                >
                    {!isClient ? (
                        <div className="w-full h-full rounded-xl bg-slate-800/30 animate-pulse" aria-hidden="true" />
                    ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                        >
                            <defs>
                                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorFeatures" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                horizontal={true}
                                stroke="rgba(255,255,255,0.08)"
                            />
                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                interval={0}
                                angle={-35}
                                textAnchor="end"
                                height={70}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}`}
                                domain={[0, 20]}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                            />
                            <Legend
                                verticalAlign="top"
                                height={44}
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: "16px", fontSize: "13px", fontWeight: 600 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="Quality"
                                stackId="1"
                                stroke="#2563eb"
                                fill="url(#colorQuality)"
                                strokeWidth={2}
                                animationDuration={1000}
                            />
                            <Area
                                type="monotone"
                                dataKey="Speed"
                                stackId="1"
                                stroke="#16a34a"
                                fill="url(#colorSpeed)"
                                strokeWidth={2}
                                animationDuration={1000}
                                animationBegin={200}
                            />
                            <Area
                                type="monotone"
                                dataKey="Features"
                                stackId="1"
                                stroke="#dc2626"
                                fill="url(#colorFeatures)"
                                strokeWidth={2}
                                animationDuration={1000}
                                animationBegin={400}
                            />
                            <Area
                                type="monotone"
                                dataKey="Price"
                                stackId="1"
                                stroke="#fbbf24"
                                fill="url(#colorPrice)"
                                strokeWidth={2}
                                animationDuration={1000}
                                animationBegin={600}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    )}
                </div>

                <p className="text-center text-xs text-slate-500 mt-4">
                    Scores are composite ratings (1–5 per dimension) compiled from Artificial Analysis, HuggingFace TTS Arena, and official benchmarks.
                    Price Score: 5 = cheapest. Open-source models at $0 self-hosted.
                </p>
            </div>
        </div>
    );
}
