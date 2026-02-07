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
    speed: number; // ms latency or speed factor
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
}

export const providers: Provider[] = [
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        type: 'TTS',
        description: 'Industry leader in AI voice quality and realistic cloning.',
        website: 'https://elevenlabs.io',
        pricing: [
            { name: 'Starter', price: 5, unit: 30000, unitType: 'char', description: '$5/mo for 30k chars' },
            { name: 'Creator', price: 22, unit: 100000, unitType: 'char', description: '$22/mo for 100k chars' },
            { name: 'Pro', price: 99, unit: 500000, unitType: 'char', description: '$99/mo for 500k chars' },
        ],
        benchmarks: { quality: 5, speed: 4, priceScore: 2, features: 5 },
        features: ['Voice Cloning', 'Dubbing', 'Turbo Model', 'Projects', 'Mobile App'],
        languages: 32,
        bestFor: ['content-creation', 'narration', 'voice-agent'],
    },
    {
        id: 'deepgram',
        name: 'Deepgram',
        type: 'STT',
        description: 'Fastest speech-to-text API with high accuracy and low latency.',
        website: 'https://deepgram.com',
        pricing: [
            { name: 'Pay-as-you-go', price: 0.0043, unit: 1, unitType: 'min', description: '$0.0043/min' },
            { name: 'Nova-3', price: 0.0043, unit: 1, unitType: 'min', description: 'Batch & Streaming' }
        ],
        benchmarks: { quality: 4.5, speed: 5, priceScore: 4, features: 4 },
        features: ['Real-time Streaming', 'Diarization', 'Smart Formatting', 'Audio Intelligence'],
        languages: 30,
        bestFor: ['voice-agent', 'transcription', 'analytics', 'real-time'],
    },
    {
        id: 'openai',
        name: 'OpenAI',
        type: 'BOTH',
        description: 'Standard-setting models for both TTS (HD) and STT (Whisper).',
        website: 'https://openai.com',
        pricing: [
            { name: 'TTS Standard', price: 0.015, unit: 1000, unitType: 'char', description: '$0.015/1k chars' },
            { name: 'Whisper', price: 0.006, unit: 1, unitType: 'min', description: '$0.006/min' }
        ],
        benchmarks: { quality: 4.5, speed: 3, priceScore: 3, features: 3 },
        features: ['HD Model', 'Simple API', 'Whisper v3'],
        languages: 50,
        bestFor: ['simple-app', 'prototyping', 'translation'],
    },
    {
        id: 'cartesia',
        name: 'Cartesia',
        type: 'TTS',
        description: 'Ultra-low latency TTS built specifically for conversational AI agents.',
        website: 'https://cartesia.ai',
        pricing: [
            { name: 'Usage', price: 0.001, unit: 1, unitType: 'sec', description: 'Approx $0.06/min' }
        ],
        benchmarks: { quality: 4.5, speed: 5, priceScore: 3, features: 4 },
        features: ['Sonic-1', 'Low Latency', 'Voice Cloning', 'Emotion Control'],
        languages: 15,
        bestFor: ['voice-agent', 'real-time'],
    },
    {
        id: 'azure',
        name: 'Azure AI Speech',
        type: 'BOTH',
        description: 'Comprehensive enterprise-grade speech services with massive language support.',
        website: 'https://azure.microsoft.com/en-us/products/ai-services/ai-speech',
        pricing: [
            { name: 'Neural TTS', price: 16, unit: 1000000, unitType: 'char', description: '$16/1M chars' },
            { name: 'STT', price: 1, unit: 60, unitType: 'min', description: '$1/hour approx' }
        ],
        benchmarks: { quality: 4.0, speed: 4, priceScore: 4, features: 5 },
        features: ['140+ Languages', 'Custom Neural Voice', 'Speech Translation', 'SOC2/HIPAA'],
        languages: 140,
        bestFor: ['enterprise', 'accessibility', 'global'],
    },
    {
        id: 'google',
        name: 'Google Cloud Speech',
        type: 'BOTH',
        description: 'Robust speech models integrated with the Gemini ecosystem.',
        website: 'https://cloud.google.com/text-to-speech',
        pricing: [
            { name: 'Neural2', price: 16, unit: 1000000, unitType: 'char', description: '$16/1M chars' },
            { name: 'Chirp', price: 0.016, unit: 1, unitType: 'min', description: '$0.016/min (STT)' }
        ],
        benchmarks: { quality: 4.0, speed: 3, priceScore: 3, features: 4 },
        features: ['Gemini Integration', 'Studio Voices', 'Chirp Model'],
        languages: 80,
        bestFor: ['enterprise', 'analytics'],
    },
    {
        id: 'assemblyai',
        name: 'AssemblyAI',
        type: 'STT',
        description: 'Speech AI models for understanding, not just transcription.',
        website: 'https://www.assemblyai.com',
        pricing: [
            { name: 'Universal-1', price: 0.0025, unit: 1, unitType: 'min', description: '$0.15/hour (Base)' }
        ],
        benchmarks: { quality: 4.2, speed: 3, priceScore: 4, features: 5 },
        features: ['Listen & Understand', 'LLM Integration', 'Sentiment Analysis', 'PII Redaction'],
        languages: 99,
        bestFor: ['analytics', 'transcription', 'understanding'],
    },
    {
        id: 'kokoro',
        name: 'Kokoro (Open Source)',
        type: 'TTS',
        description: 'High-quality open-source TTS model, extremely efficient and lightweight.',
        website: 'https://huggingface.co/hexgrad/Kokoro-82M',
        pricing: [
            { name: 'Self-hosted', price: 0, unit: 1, unitType: 'min', description: 'Free (Compute only)' }
        ],
        benchmarks: { quality: 4.0, speed: 4, priceScore: 5, features: 2 },
        features: ['Offline Capable', 'Lightweight', '82M Params'],
        languages: 10,
        bestFor: ['budget', 'accessibility', 'offline'],
    },
    {
        id: 'playht',
        name: 'PlayHT',
        type: 'TTS',
        description: 'Generative voice AI with a massive library of voices.',
        website: 'https://play.ht',
        pricing: [
            { name: 'Creator', price: 39, unit: 1, unitType: 'min', description: '$39/mo (Subscription)' }
        ],
        benchmarks: { quality: 4.0, speed: 3, priceScore: 2, features: 4 },
        features: ['Voice Cloning', 'Voice Generation', 'API'],
        languages: 140,
        bestFor: ['content-creation', 'narration'],
    }
];
