"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BrandIcon } from "@/components/icons/BrandIcon";

const navigation = [
    { name: "Leaderboard",  href: "/#leaderboard" },
    { name: "Compare",      href: "/#compare" },
    { name: "Calculator",   href: "/#calculator" },
    { name: "Find My Stack", href: "/#quiz" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef   = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!mobileMenuOpen) return;
        function onDown(e: MouseEvent) {
            if (
                menuRef.current   && !menuRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) setMobileMenuOpen(false);
        }
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [mobileMenuOpen]);

    // Close mobile menu on Escape
    useEffect(() => {
        if (!mobileMenuOpen) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                buttonRef.current?.focus();
            }
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileMenuOpen]);

    // Highlight nav item only when on a dedicated non-home page
    function isActive(href: string): boolean {
        if (href.startsWith("/#")) return false; // hash links never marked active
        return pathname === href || (href !== "/" && pathname.startsWith(href));
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="glass mt-4 rounded-2xl flex h-16 items-center justify-between px-5 sm:px-6">

                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                        aria-label="VoiceTech 2026 — Home"
                    >
                        <div className="rounded-full overflow-hidden shrink-0">
                            <BrandIcon size={30} />
                        </div>
                        <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                            TTSTT
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                    isActive(item.href)
                                        ? "text-foreground bg-white/5"
                                        : "text-muted-foreground hover:bg-white/5"
                                )}
                                aria-current={isActive(item.href) ? "page" : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + mobile toggle */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/#quiz"
                            className="hidden md:inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Get Started
                        </Link>
                        <button
                            ref={buttonRef}
                            type="button"
                            className="md:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen
                                ? <X   className="h-5 w-5" aria-hidden="true" />
                                : <Menu className="h-5 w-5" aria-hidden="true" />
                            }
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <nav
                    id="mobile-menu"
                    ref={menuRef}
                    className="md:hidden glass mx-4 mt-2 rounded-xl p-3 space-y-0.5"
                    aria-label="Mobile navigation"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-current={isActive(item.href) ? "page" : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-2 mt-1 border-t border-white/5">
                        <Link
                            href="/#quiz"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
