interface BrandIconProps {
    size?: number;
    className?: string;
}

export function BrandIcon({ size = 32, className = "" }: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <linearGradient id="brand-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(#brand-bg)" />
            <rect x="14" y="42" width="8" height="16" rx="4" fill="white" opacity="0.7" />
            <rect x="26" y="33" width="8" height="34" rx="4" fill="white" opacity="0.85" />
            <rect x="38" y="25" width="8" height="50" rx="4" fill="white" />
            <rect x="50" y="31" width="8" height="38" rx="4" fill="white" />
            <rect x="62" y="38" width="8" height="24" rx="4" fill="white" opacity="0.85" />
            <rect x="74" y="44" width="8" height="12" rx="4" fill="white" opacity="0.7" />
        </svg>
    );
}
