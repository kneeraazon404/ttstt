import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ttstt.vercel.app"),
  title: {
    default: "VoiceTech 2026 | TTS & STT Intelligence Radar",
    template: "%s | VoiceTech 2026",
  },
  description:
    "The independent comparison platform for TTS & STT AI voice providers. Real benchmarks, transparent pricing, and guided recommendations for ElevenLabs, Deepgram, OpenAI, Cartesia, Azure, Google, AssemblyAI, Mistral Voxtral, Inworld AI, and 20+ providers. Updated April 2026.",
  keywords: [
    "TTS", "STT", "text to speech", "speech to text", "voice AI",
    "ElevenLabs", "Deepgram", "OpenAI TTS", "Whisper", "Cartesia",
    "Azure Speech", "Google Cloud Speech", "AssemblyAI",
    "Mistral Voxtral", "Inworld AI", "Kokoro", "Chatterbox",
    "voice cloning", "voice comparison", "voice benchmark",
    "voice agent", "2026", "AI voice", "TTS benchmark",
    "speech recognition", "EU AI Act compliance",
  ],
  authors: [{ name: "kneeraazon", url: "https://kneeraazon.com" }],
  creator: "kneeraazon",
  publisher: "VoiceTech 2026",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ttstt.vercel.app",
    siteName: "VoiceTech 2026",
    title: "VoiceTech 2026 | TTS & STT Intelligence Radar",
    description:
      "Independent comparison of 20+ TTS & STT providers. Real benchmarks, transparent pricing. Updated April 2026 with Mistral Voxtral, xAI Grok, Microsoft MAI, and open-source models.",
  },
  twitter: {
    card: "summary",
    site: "@kneeraazon",
    creator: "@kneeraazon",
    title: "VoiceTech 2026 | TTS & STT Intelligence Radar",
    description:
      "Independent comparison of 20+ TTS & STT providers. Real benchmarks, transparent pricing. Updated April 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ttstt.vercel.app",
  },
  other: {
    "msapplication-TileColor": "#6366f1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
