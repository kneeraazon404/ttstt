"use client";

import { providers } from "@/data/providers";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-950/95 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl ring-1 ring-white/10 z-50">
                <p className="font-bold text-white mb-3 text-lg border-b border-white/10 pb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-6 text-sm mb-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: entry.color }} />
                            <span className="text-slate-300 capitalize font-medium">{entry.name}</span>
                        </div>
                        <span className="text-white font-mono font-bold">{entry.value}/5</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function Leaderboard() {
    // Process data for stacked area chart
    const chartData = providers
        .map(p => ({
            name: p.name,
            Quality: p.benchmarks.quality,
            Speed: p.benchmarks.speed,
            Features: p.benchmarks.features,
            Price: p.benchmarks.priceScore,
            total: p.benchmarks.quality + p.benchmarks.speed + p.benchmarks.features + p.benchmarks.priceScore
        }))
        .sort((a, b) => b.total - a.total) // Sort by total value
        .slice(0, 10);

    return (
        <div className="space-y-16">
            <div className="glass p-4 sm:p-6 md:p-10 rounded-3xl border border-white/10 bg-slate-900/60 relative overflow-hidden shadow-2xl">
                {/* Background Glow - made subtle but visible */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[150px] -z-10" />

                <div className="mb-8 md:mb-12 text-center px-2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-tight">
                        Market Value Composition
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                        Stacked analysis of key metrics. Higher total area represents better overall value efficiency.
                    </p>
                </div>

                {/* Mobile Responsive Container padding/margin */}
                <div className="h-[400px] sm:h-[500px] md:h-[600px] w-full -ml-4 sm:ml-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                {/* Bold, Distinct Colors */}
                                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9} /> {/* Strong Blue */}
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9} /> {/* Strong Green */}
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorFeatures" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.9} /> {/* Strong Red */}
                                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.9} /> {/* Strong Amber/Yellow */}
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="rgba(255,255,255,0.08)" />
                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                interval={0}
                                angle={-45} // Tilt labels for mobile
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                            <Legend
                                verticalAlign="top"
                                height={40}
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: '30px', fontSize: '14px', fontWeight: 600 }}
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
                </div>
            </div>
        </div>
    );
}
