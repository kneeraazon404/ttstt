"use client";

import { useState, useMemo } from "react";
import { providers } from "@/data/providers";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle } from "lucide-react";

export function TCOCalculator() {
    const [audioHours, setAudioHours] = useState(10);
    const [useCase, setUseCase] = useState<'TTS' | 'STT'>('TTS');

    const { standardData, outlierData } = useMemo(() => {
        const relevantProviders = providers.filter(p => p.type === useCase || p.type === 'BOTH');

        const allData = relevantProviders.map(p => {
            let monthlyCost = 0;
            // Simplified calculation logic
            // TTS: Average 15,000 chars per hour of audio (approx)
            // STT: Audio hours * 60 minutes

            if (useCase === 'TTS') {
                const charsPerMonth = audioHours * 15000;
                // Find best pricing tier
                const tier = p.pricing[0];
                if (tier.unitType === 'char') {
                    monthlyCost = (charsPerMonth / tier.unit) * tier.price;
                } else if (tier.unitType === 'sec') {
                    monthlyCost = (audioHours * 3600 / tier.unit) * tier.price;
                } else if (tier.unitType === 'min') {
                    monthlyCost = (audioHours * 60 / tier.unit) * tier.price;
                }
            } else {
                // STT
                const minutesPerMonth = audioHours * 60;
                const tier = p.pricing[0];
                if (tier.unitType === 'min') {
                    monthlyCost = (minutesPerMonth / tier.unit) * tier.price;
                } else if (tier.unitType === 'sec') {
                    monthlyCost = (minutesPerMonth * 60 / tier.unit) * tier.price;
                }
            }

            return {
                name: p.name,
                id: p.id,
                cost: Math.round(monthlyCost * 100) / 100,
                isSubscription: p.pricing[0].description.toLowerCase().includes('subscription')
            };
        });

        // Separate PlayHT (or explicit outliers)
        const outliers = allData.filter(d => d.id === 'playht' || d.cost > 20000); // hard cutoff or ID match
        const standard = allData.filter(d => d.id !== 'playht' && d.cost <= 20000).sort((a, b) => a.cost - b.cost);

        return { standardData: standard, outlierData: outliers };
    }, [audioHours, useCase]);

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

            <div className="grid md:grid-cols-[300px_1fr] gap-12">

                {/* Controls */}
                <div className="space-y-10">
                    <div>
                        <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 block">Technology</label>
                        <div className="flex bg-slate-950/50 p-1.5 rounded-xl border border-white/5">
                            <button
                                onClick={() => setUseCase('TTS')}
                                className={cn("flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300", useCase === 'TTS' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-slate-400 hover:text-white")}
                            >
                                Text-to-Speech
                            </button>
                            <button
                                onClick={() => setUseCase('STT')}
                                className={cn("flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300", useCase === 'STT' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-slate-400 hover:text-white")}
                            >
                                Speech-to-Text
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">Monthly Volume</label>
                            <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono font-bold border border-indigo-500/30">
                                {audioHours} hours
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="1000"
                            step="1"
                            value={audioHours}
                            onChange={(e) => setAudioHours(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                        />
                        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-3">
                            <span>1 hr</span>
                            <span>500 hrs</span>
                            <span>1000 hrs</span>
                        </div>
                        <div className="mt-6 bg-slate-950/50 p-4 rounded-xl border border-white/5 flex gap-3">
                            <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Estimated based on base pricing tiers. <br />
                                <span className="text-slate-500 mt-1 block">TTS: ~15k chars/hr • STT: 60 mins/hr</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="space-y-8">
                    {/* Main Chart */}
                    <div className="h-[400px] w-full relative">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Pay-As-You-Go Models</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={standardData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    type="number"
                                    tickFormatter={(val) => `$${val}`}
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={{ stroke: '#334155' }}
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={110}
                                    stroke="#e2e8f0"
                                    fontSize={13}
                                    fontWeight={600}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#fff',
                                        padding: '12px',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                                    }}
                                    formatter={(value: number | undefined) => [
                                        <span key="val" className="text-indigo-300 font-mono font-bold text-lg">${value?.toFixed(2)}</span>,
                                        <span key="lbl" className="text-slate-400 text-xs uppercase tracking-wide">Monthly Cost</span>
                                    ]}
                                    labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                                />
                                <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={32} animationDuration={1000}>
                                    {standardData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="url(#barGradient)" fillOpacity={0.8 + (index * 0.02)} stroke="rgba(255,255,255,0.1)" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Outliers Section (PlayHT) */}
                    {outlierData.length > 0 && (
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Subscription / High Volume Models</h4>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">
                                These providers have significantly different pricing structures (e.g., flat monthly subscriptions) that may appear as outliers.
                            </p>

                            <div className="h-[120px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={outlierData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="outlierGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#f59e0b" />
                                                <stop offset="100%" stopColor="#d97706" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis
                                            type="number"
                                            tickFormatter={(val) => `$${val}`}
                                            stroke="#64748b"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={{ stroke: '#334155' }}
                                        />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            width={110}
                                            stroke="#e2e8f0"
                                            fontSize={13}
                                            fontWeight={600}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            contentStyle={{
                                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#fff',
                                                padding: '12px',
                                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                                            }}
                                            formatter={(value: number | undefined) => [
                                                <span key="val" className="text-amber-400 font-mono font-bold text-lg">${value?.toFixed(2)}</span>,
                                                <span key="lbl" className="text-slate-400 text-xs uppercase tracking-wide">Monthly Cost</span>
                                            ]}
                                            labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                                        />
                                        <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={32} fill="url(#outlierGradient)" stroke="rgba(255,255,255,0.1)" />
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
