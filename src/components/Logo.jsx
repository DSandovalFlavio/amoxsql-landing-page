import React from 'react';

/** Glifo neón de AmoxSQL (trazo del logo real, sin el fondo). */
export default function Logo({ size = 22 }) {
    return (
        <svg viewBox="0 0 400 340" width={size} height={size} aria-hidden="true">
            <defs>
                <linearGradient id="amox-neon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00ffff" />
                    <stop offset="1" stopColor="#0055ff" />
                </linearGradient>
            </defs>
            <g stroke="url(#amox-neon)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 135 285 Q 125 290 115 275 L 185 75 Q 200 45 215 75 L 285 275 Q 275 290 265 285" />
                <path d="M 130 210 Q 200 330 270 210" />
            </g>
        </svg>
    );
}
