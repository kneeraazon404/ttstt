export type PricingModel = 'char' | 'min' | 'sec' | 'token';

export interface PricingTier {
    name: string;
    price: number;
    unit: number; // e.g., 1000000 chars or 1 min
    unitType: PricingModel;
    description: string;
}

export interface BenchmarkScores {
    quality: number; // 1-5 (MOS or equivalent)
    speed: number; // 1-5 rating
    priceScore: number; // 1-5 (5 is cheapest)
    features: number; // 1-5 based on feature set
}

export interface Provider {
    id: string;
    name: string;
    type: 'TTS' | 'STT' | 'BOTH';
    description: string;
    website: string;
    pricing: PricingTier[];
    benchmarks: BenchmarkScores;
    features: string[];
    languages: number;
    bestFor: string[]; // e.g., 'voice-agent', 'audiobook', 'transcription'
    status?: 'active' | 'discontinued' | 'new';
    openSource?: boolean;
    eloScore?: number; // Artificial Analysis ELO
    latencyMs?: number; // TTFA in ms
    wer?: number; // Word Error Rate % (STT)
    compliance?: string[]; // e.g., ['HIPAA', 'SOC2', 'EU AI Act compliant']
    isNew?: boolean; // Added in Q1 2026
}

export const providers: Provider[] = [
    // ─── TIER 1: INDUSTRY LEADERS ───────────────────────────────────────────────
    {
        id: 'inworld',
        name: 'Inworld AI',
        type: 'TTS',
        description: '#1 ranked TTS on Artificial Analysis. Sub-250ms P90 latency, zero-shot voice cloning, domain-specific pronunciation for healthcare/finance/legal.',
        website: 'https://inworld.ai',
        pricing: [
            { name: 'TTS-1.5 Max', price: 30, unit: 1000000, unitType: 'char', description: '$30/1M chars (enterprise)' },
            { name: 'TTS-1.5 Mini', price: 15, unit: 1000000, unitType: 'char', description: '$15/1M chars (low latency)' },
        ],
        benchmarks: { quality: 5, speed: 5, priceScore: 2, features: 5 },
        features: ['#1 TTS Arena ELO', 'Zero-shot Voice Cloning (5–15s)', 'Sub-250ms P90 Latency', 'Domain-specific Pronunciation', 'Healthcare/Finance/Legal'],
        languages: 30,
        bestFor: ['voice-agent', 'content-creation', 'enterprise'],
        status: 'new',
        eloScore: 1236,
        latencyMs: 130,
        isNew: true,
        compliance: ['SOC2', 'HIPAA'],
    },
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        type: 'BOTH',
        description: '$11B valuation, 74 languages, on-premise/on-device deployment. Eleven v3 sets the new quality standard. IBM watsonx partnership.',
        website: 'https://elevenlabs.io',
        pricing: [
            { name: 'Starter', price: 5, unit: 30000, unitType: 'char', description: '$5/mo for 30k chars' },
            { name: 'Creator', price: 22, unit: 100000, unitType: 'char', description: '$22/mo for 100k chars' },
            { name: 'Scale API', price: 165, unit: 1000000, unitType: 'char', description: '~$165/1M chars (Scale)' },
        ],
        benchmarks: { quality: 5, speed: 4, priceScore: 2, features: 5 },
        features: ['Eleven v3 (GA Feb 2)', 'On-Premise / On-Device (Apr 9)', 'Voice Cloning (10,000+ voices)', 'Scribe v2 STT', 'Dubbing & Translation', '74 Languages', 'ElevenAgents', 'IBM watsonx Integration'],
        languages: 74,
        bestFor: ['content-creation', 'narration', 'voice-agent', 'enterprise'],
        eloScore: 1197,
        latencyMs: 75,
        compliance: ['SOC2', 'HIPAA', 'GDPR'],
    },

    // ─── COMMERCIAL STT LEADERS ─────────────────────────────────────────────────
    {
        id: 'deepgram',
        name: 'Deepgram',
        type: 'BOTH',
        description: 'Unicorn ($1.3B). Nova-3 with sub-300ms streaming, Swedish/Dutch support, TTS speed controls. Flux semantic turn detection reduces false interruptions 30%.',
        website: 'https://deepgram.com',
        pricing: [
            { name: 'Nova-3 STT', price: 0.0043, unit: 1, unitType: 'min', description: '$0.0043–$0.0077/min (per-second billing)' },
            { name: 'Voice Agent API', price: 0.075, unit: 1, unitType: 'min', description: '~$0.075/min (STT+LLM+TTS)' },
        ],
        benchmarks: { quality: 4.5, speed: 5, priceScore: 4, features: 4 },
        features: ['Nova-3 (5.3% WER)', 'Sub-300ms Streaming', 'Flux Turn Detection', 'Diarization', 'Smart Formatting', 'TTS Speed Controls (0.7–1.5×)', 'Self-hosted Deployment', '45+ Languages', 'Per-second Billing'],
        languages: 45,
        bestFor: ['voice-agent', 'transcription', 'analytics', 'real-time'],
        wer: 5.3,
        compliance: ['HIPAA', 'SOC2'],
    },
    {
        id: 'assemblyai',
        name: 'AssemblyAI',
        type: 'STT',
        description: '#1 for developer experience. Universal-2 (99 languages, $0.0025/min), Universal-3 Pro with prompt-based customization. HIPAA, SOC2, ISO 27001, PCI DSS v4.0.',
        website: 'https://www.assemblyai.com',
        pricing: [
            { name: 'Universal-2', price: 0.0025, unit: 1, unitType: 'min', description: '$0.0025/min — 99 languages' },
            { name: 'Universal-3 Pro', price: 0.0035, unit: 1, unitType: 'min', description: '$0.0035/min — prompt-based customization' },
        ],
        benchmarks: { quality: 4.5, speed: 3, priceScore: 5, features: 5 },
        features: ['Universal-2 (99 languages)', 'Universal-3 Pro Streaming', 'Prompt-based Domain Customization', 'Medical Mode (en/es/de/fr)', 'Sentiment Analysis', 'PII Redaction', 'LLM Integration', 'Audio Intelligence'],
        languages: 99,
        bestFor: ['analytics', 'transcription', 'understanding', 'enterprise'],
        wer: 14.5,
        compliance: ['HIPAA', 'SOC2 Type 2', 'ISO 27001:2022', 'PCI DSS v4.0', 'GDPR'],
    },

    // ─── LATENCY LEADERS ────────────────────────────────────────────────────────
    {
        id: 'cartesia',
        name: 'Cartesia',
        type: 'TTS',
        description: 'Latency leader at 40ms TTFA. Sonic 3 now on Amazon SageMaker. 3-second voice cloning, emotion control, production-grade conversational AI.',
        website: 'https://cartesia.ai',
        pricing: [
            { name: 'Pay-as-you-go', price: 5, unit: 100000, unitType: 'char', description: '$5/100k credits (1 credit/char)' },
        ],
        benchmarks: { quality: 4.5, speed: 5, priceScore: 3, features: 4 },
        features: ['Sonic 3 (SageMaker)', '40ms TTFA (Sonic Turbo)', '3-second Voice Cloning', 'Emotion Control', 'Sonic Flash 75ms', 'SageMaker JumpStart'],
        languages: 20,
        bestFor: ['voice-agent', 'real-time'],
        latencyMs: 40,
    },

    // ─── NEW ENTRANTS (Q1 2026) ──────────────────────────────────────────────────
    {
        id: 'mistral-voxtral',
        name: 'Mistral Voxtral',
        type: 'TTS',
        description: 'NEW — 4B-parameter open-weight model (CC BY-NC 4.0). 90ms TTFA, runs on smartphones with 3GB RAM. 62.8% human preference over ElevenLabs Flash v2.5.',
        website: 'https://mistral.ai',
        pricing: [
            { name: 'API', price: 16, unit: 1000000, unitType: 'char', description: '$16/1M chars' },
        ],
        benchmarks: { quality: 4.5, speed: 5, priceScore: 3, features: 3 },
        features: ['4B Parameters', '90ms TTFA', 'Smartphone Deployment (3GB RAM)', 'Voice Cloning', 'EU Data Sovereignty', 'CC BY-NC 4.0 (open weights)'],
        languages: 9,
        bestFor: ['voice-agent', 'budget', 'offline'],
        status: 'new',
        isNew: true,
        latencyMs: 90,
    },
    {
        id: 'microsoft-mai',
        name: 'Microsoft MAI',
        type: 'BOTH',
        description: 'NEW (Apr 3) — MAI-Voice-1 for voice gen/cloning. MAI-Transcribe-1 achieves 3.8% WER, beating Whisper-large-v3 on 22 of 25 languages.',
        website: 'https://azure.microsoft.com/ai',
        pricing: [
            { name: 'MAI-Transcribe-1', price: 0.017, unit: 1, unitType: 'min', description: '~$0.017/min (Azure pricing)' },
            { name: 'MAI-Voice-1', price: 16, unit: 1000000, unitType: 'char', description: '$16/1M chars' },
        ],
        benchmarks: { quality: 5, speed: 4, priceScore: 3, features: 4 },
        features: ['MAI-Voice-1 (cloning)', 'MAI-Transcribe-1 (3.8% WER)', 'Beats Whisper-large-v3 (22/25 languages)', 'Beats ElevenLabs Scribe v2 (15/25)', '25 Language STT', 'Half GPU usage vs competitors'],
        languages: 25,
        bestFor: ['enterprise', 'transcription', 'accessibility'],
        status: 'new',
        isNew: true,
        wer: 3.8,
        compliance: ['Azure Compliance', 'GDPR', 'HIPAA'],
    },
    {
        id: 'xai-grok',
        name: 'xAI Grok TTS',
        type: 'TTS',
        description: 'NEW (Mar 16) — OpenAI Realtime API-compatible format for seamless migration. Backed by xAI/Grok infrastructure.',
        website: 'https://x.ai',
        pricing: [
            { name: 'API', price: 15, unit: 1000000, unitType: 'char', description: '~$15/1M chars (estimated)' },
        ],
        benchmarks: { quality: 4.0, speed: 4, priceScore: 3, features: 3 },
        features: ['OpenAI Realtime API Compatible', 'Drop-in Migration Path', 'xAI Infrastructure'],
        languages: 13,
        bestFor: ['voice-agent', 'prototyping'],
        status: 'new',
        isNew: true,
    },

    // ─── ESTABLISHED COMMERCIAL ──────────────────────────────────────────────────
    {
        id: 'openai',
        name: 'OpenAI',
        type: 'BOTH',
        description: 'GPT-4o Transcribe (5% WER, free diarization) and GPT-4o Mini Transcribe ($0.003/min) for budget STT. tts-1/tts-1-hd for TTS.',
        website: 'https://openai.com',
        pricing: [
            { name: 'TTS Standard', price: 15, unit: 1000000, unitType: 'char', description: '$15/1M chars (tts-1)' },
            { name: 'TTS HD', price: 30, unit: 1000000, unitType: 'char', description: '$30/1M chars (tts-1-hd)' },
            { name: 'GPT-4o Transcribe', price: 0.006, unit: 1, unitType: 'min', description: '$0.006/min — free diarization' },
            { name: 'Mini Transcribe', price: 0.003, unit: 1, unitType: 'min', description: '$0.003/min — budget option' },
        ],
        benchmarks: { quality: 4.5, speed: 3, priceScore: 3, features: 3 },
        features: ['GPT-4o Transcribe (5% WER)', 'GPT-4o Mini Transcribe', 'Free Diarization', 'tts-1 / tts-1-hd', '99+ Languages (STT)', 'Simple API'],
        languages: 99,
        bestFor: ['simple-app', 'prototyping', 'transcription'],
        wer: 5,
        compliance: ['SOC2', 'GDPR'],
    },
    {
        id: 'azure',
        name: 'Azure AI Speech',
        type: 'BOTH',
        description: 'Broadest language coverage: 140+ languages, 500+ voices. Enterprise SLAs, Custom Neural Voice, Speech Translation, and full Microsoft compliance portfolio.',
        website: 'https://azure.microsoft.com/products/ai-services/ai-speech',
        pricing: [
            { name: 'Neural TTS', price: 15, unit: 1000000, unitType: 'char', description: '$15–16/1M chars' },
            { name: 'STT Standard', price: 0.017, unit: 1, unitType: 'min', description: '$0.017/min (140+ languages)' },
        ],
        benchmarks: { quality: 4.0, speed: 4, priceScore: 4, features: 5 },
        features: ['140+ Languages (TTS)', '500+ Neural Voices', 'Custom Neural Voice', 'Speech Translation', 'Real-time Captions', 'Avatar Video Synthesis'],
        languages: 140,
        bestFor: ['enterprise', 'accessibility', 'global'],
        compliance: ['SOC2', 'HIPAA', 'ISO 27001', 'GDPR', 'FedRAMP'],
    },
    {
        id: 'google',
        name: 'Google Cloud Speech',
        type: 'BOTH',
        description: 'Chirp 3 HD at $30/1M chars, 75+ languages, Gemini ecosystem integration. 60 min/month free for STT. Studio voices and WaveNet.',
        website: 'https://cloud.google.com/text-to-speech',
        pricing: [
            { name: 'WaveNet', price: 4, unit: 1000000, unitType: 'char', description: '$4/1M chars (standard)' },
            { name: 'Chirp 3 HD', price: 30, unit: 1000000, unitType: 'char', description: '$30/1M chars (HD)' },
            { name: 'STT Standard', price: 0.024, unit: 1, unitType: 'min', description: '$0.024/min (60 min/mo free)' },
        ],
        benchmarks: { quality: 4.0, speed: 3, priceScore: 3, features: 4 },
        features: ['Chirp 3 HD', 'WaveNet & Studio Voices', 'Gemini Integration', '380+ Voices', '75+ Languages', '60 min/mo Free STT', 'Google Translate Integration'],
        languages: 75,
        bestFor: ['enterprise', 'analytics', 'accessibility'],
        compliance: ['SOC2', 'HIPAA', 'ISO 27001', 'GDPR'],
    },
    {
        id: 'hume',
        name: 'Hume AI',
        type: 'TTS',
        description: 'Octave 2 at $7.60/1M chars. TADA architecture: virtually zero content hallucinations, 10× context efficiency. Note: Google DeepMind hired CEO Alan Cowen. Company continues under new CEO.',
        website: 'https://hume.ai',
        pricing: [
            { name: 'Octave 2', price: 7.60, unit: 1000000, unitType: 'char', description: '$7.60/1M chars' },
        ],
        benchmarks: { quality: 4.5, speed: 4, priceScore: 4, features: 4 },
        features: ['Octave 2 Voice Model', 'TADA Architecture (1B/3B)', 'Zero Content Hallucinations', '10× Context Efficiency', 'Emotional Intelligence', '11 Languages'],
        languages: 11,
        bestFor: ['voice-agent', 'content-creation'],
        isNew: true,
    },
    {
        id: 'leanvox',
        name: 'LeanVox',
        type: 'TTS',
        description: 'Budget-friendly at $5/1M chars with 23+ language support. Competitive entry-level option for smaller production workloads.',
        website: 'https://leanvox.ai',
        pricing: [
            { name: 'Standard', price: 5, unit: 1000000, unitType: 'char', description: '$5/1M chars' },
        ],
        benchmarks: { quality: 3.5, speed: 3, priceScore: 5, features: 2 },
        features: ['23+ Languages', 'Standard Neural Voices', 'REST API'],
        languages: 23,
        bestFor: ['budget', 'simple-app'],
        isNew: true,
    },

    // ─── OPEN SOURCE / SELF-HOSTED ───────────────────────────────────────────────
    {
        id: 'kokoro',
        name: 'Kokoro v1.0',
        type: 'TTS',
        description: 'Most efficient open-source TTS. 82M parameters, MOS 4.2, runs on Raspberry Pi. ELO 1056 on Artificial Analysis — highest open-weights rank. ~$0.65/1M chars hosted.',
        website: 'https://huggingface.co/hexgrad/Kokoro-82M',
        pricing: [
            { name: 'Self-hosted', price: 0, unit: 1000000, unitType: 'char', description: 'Free (compute only)' },
            { name: 'Hosted (DeepInfra)', price: 0.65, unit: 1000000, unitType: 'char', description: '~$0.65/1M chars hosted' },
        ],
        benchmarks: { quality: 4.2, speed: 4, priceScore: 5, features: 3 },
        features: ['82M Parameters', 'MOS 4.2 (highest open-source)', 'CPU / Raspberry Pi Capable', '210× Real-time on GPU', 'Apache 2.0 License', '9 Languages'],
        languages: 9,
        bestFor: ['budget', 'accessibility', 'offline'],
        openSource: true,
        eloScore: 1056,
    },
    {
        id: 'chatterbox',
        name: 'Chatterbox',
        type: 'TTS',
        description: 'MIT-licensed, beats ElevenLabs in blind tests (63.75% preference). Family of 3: original (500M), Multilingual (23 languages), Turbo (350M, sub-200ms streaming).',
        website: 'https://github.com/resemble-ai/chatterbox',
        pricing: [
            { name: 'Self-hosted', price: 0, unit: 1000000, unitType: 'char', description: 'Free (MIT license)' },
        ],
        benchmarks: { quality: 4.5, speed: 4, priceScore: 5, features: 4 },
        features: ['MIT License', '63.75% Preferred over ElevenLabs', 'Chatterbox Turbo (sub-200ms)', 'Chatterbox Multilingual (23 languages)', 'PerTh Neural Watermarking', 'Paralinguistic Tags [laugh] [cough]', '11K+ GitHub Stars', 'Emotion Control'],
        languages: 23,
        bestFor: ['budget', 'content-creation', 'voice-agent', 'offline'],
        openSource: true,
        status: 'new',
        isNew: true,
    },
    {
        id: 'qwen3-tts',
        name: 'Qwen3-TTS',
        type: 'TTS',
        description: 'Apache 2.0 — State-of-the-art WER: 0.77% Chinese, 1.24% English. 0.6B & 1.7B variants, 49+ professional voice presets, natural-language voice design.',
        website: 'https://huggingface.co/Qwen',
        pricing: [
            { name: 'Self-hosted', price: 0, unit: 1000000, unitType: 'char', description: 'Free (Apache 2.0)' },
        ],
        benchmarks: { quality: 4.5, speed: 4, priceScore: 5, features: 4 },
        features: ['Apache 2.0 License', '0.77% Chinese WER', '1.24% English WER', '0.6B & 1.7B Variants', '49+ Voice Presets', '12Hz Proprietary Tokenizer', 'Natural-language Voice Design', '10 Languages'],
        languages: 10,
        bestFor: ['budget', 'content-creation', 'accessibility'],
        openSource: true,
        status: 'new',
        isNew: true,
        wer: 1.24,
    },
    {
        id: 'fish-audio',
        name: 'Fish Audio S2 Pro',
        type: 'TTS',
        description: 'Best open-weights model by ELO score (1128) on Artificial Analysis Speech Arena. Competitive quality approaching commercial leaders.',
        website: 'https://fish.audio',
        pricing: [
            { name: 'API', price: 10, unit: 1000000, unitType: 'char', description: '~$10/1M chars (API)' },
            { name: 'Self-hosted', price: 0, unit: 1000000, unitType: 'char', description: 'Free (open weights)' },
        ],
        benchmarks: { quality: 4.5, speed: 4, priceScore: 5, features: 3 },
        features: ['ELO 1128 (Best Open-weights)', 'Voice Cloning', 'Open Weights', 'Commercial API Available'],
        languages: 15,
        bestFor: ['content-creation', 'budget', 'voice-agent'],
        openSource: true,
        eloScore: 1128,
        isNew: true,
    },
    {
        id: 'moonshine',
        name: 'Moonshine (Useful Sensors)',
        type: 'STT',
        description: 'Edge/offline STT champion. 245M parameters (MIT license) matches Whisper Large-v3 accuracy at 1/6 the size. Leading choice for mobile and embedded devices.',
        website: 'https://github.com/usefulsensors/moonshine',
        pricing: [
            { name: 'Self-hosted', price: 0, unit: 1, unitType: 'min', description: 'Free (MIT license)' },
        ],
        benchmarks: { quality: 4.0, speed: 5, priceScore: 5, features: 2 },
        features: ['245M Parameters (MIT)', 'Matches Whisper Large-v3', '1/6 the Size of Whisper', 'Mobile & Embedded Ready', 'CPU Capable'],
        languages: 1,
        bestFor: ['accessibility', 'offline', 'budget'],
        openSource: true,
        isNew: true,
    },

    // ─── DISCONTINUED ────────────────────────────────────────────────────────────
    {
        id: 'playht',
        name: 'PlayHT',
        type: 'TTS',
        description: '⚠️ SHUT DOWN Dec 31, 2025 — Acquired by Meta. Service is permanently discontinued. Migrate to ElevenLabs, Chatterbox, or Kokoro.',
        website: 'https://play.ht',
        pricing: [
            { name: 'N/A', price: 0, unit: 1, unitType: 'char', description: 'Service discontinued' },
        ],
        benchmarks: { quality: 4.0, speed: 3, priceScore: 2, features: 4 },
        features: ['Service Discontinued', 'Acquired by Meta (Dec 31, 2025)', 'Migrate to: ElevenLabs, Chatterbox, Kokoro'],
        languages: 0,
        bestFor: [],
        status: 'discontinued',
    },
];
