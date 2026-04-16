/**
 * MANGO SOUL ENGINE v2.0 - "Global Unicorn" Edition
 * visualizes: Crypto-Security, AI Polyglot Status, Pi-Wealth, and Sync-Status.
 */

const MangoAvatar = (function() {
    const COLORS = {
        mango: '#f97316',
        aurora: '#00f2ff',
        dark: '#0a0a0a',
        glass: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)'
    };

    // Deterministic hash for Public Key
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    return {
        render: function(containerId, config = {}) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const {
                publicKey = "Mango_Guest",
                securityLevel = 1, // 1: Default, 2: E2E Verified
                translationActive = false,
                poaScore = 50, // 0 - 100
                offline = false,
                isStealth = false,
                hatStyle = 'classic', // 'classic', 'crown', 'none'
                tieStyle = 'ribbon'
            } = config;

            const hash = hashString(publicKey);
            const hairHue = hash % 360;
            const hatScale = 0.6 + (poaScore / 100) * 0.6; // Scale based on activity
            const pinColor = offline ? '#4b5563' : COLORS.mango;
            const pinGlow = offline ? 'none' : `drop-shadow(0 0 8px ${COLORS.mango})`;
            
            // Character Logic: Sync-Eyes Sparkle
            const eyeColor = offline ? 'rgba(255,255,255,0.4)' : COLORS.mango;
            const eyeGlow = offline ? 'none' : `drop-shadow(0 0 5px ${COLORS.mango})`;

            const svg = `
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                    <defs>
                        <!-- Glass Blur Filter -->
                        <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                        
                        <!-- Matrix Animation for AI Tie -->
                        <pattern id="matrixPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="#000" />
                            <text x="10" y="20" fill="${COLORS.aurora}" font-family="serif" font-size="8" opacity="0.9">
                                <tspan x="10" dy="1.2em">가 A Ω 中</tspan>
                                <tspan x="10" dy="1.2em">م ث ا ض</tspan>
                                <tspan x="10" dy="1.2em">あ ア 1 0</tspan>
                                <tspan x="10" dy="1.2em">Ю Я Σ Δ</tspan>
                                <animate attributeName="y" from="0" to="-40" dur="2s" repeatCount="indefinite" />
                            </text>
                        </pattern>

                        <!-- Crypto-Hair Shimmer Gradient -->
                        <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                            <stop offset="50%" stop-color="rgba(255,255,255,0.6)">
                                <animate attributeName="offset" values="-0.5; 1.5" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                        </linearGradient>

                        <!-- Security Glow -->
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    <!-- Luxury Suit (Body) -->
                    <path d="M40 190 Q100 140 160 190 L185 200 L15 200 Z" fill="${COLORS.dark}" stroke="${COLORS.border}" />
                    
                    <!-- Face Base (Glassmorphism) -->
                    <circle cx="100" cy="90" r="55" fill="${COLORS.glass}" stroke="${COLORS.border}" stroke-width="0.5" />
                    <circle cx="100" cy="90" r="55" fill="none" stroke="white" stroke-opacity="0.05" />

                    <!-- Security Hair (Hash-derived color) -->
                    <path d="M45 85 Q100 15 155 85 Q100 65 45 85" 
                          fill="hsl(${hairHue}, 40%, 15%)" 
                          stroke="${securityLevel >= 2 ? COLORS.mango : 'none'}" 
                          stroke-width="2"
                          style="filter: ${securityLevel >= 2 ? 'url(#glow)' : 'none'}">
                        ${securityLevel >= 2 ? `<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />` : ''}
                    </path>
                    <!-- Hair Shimmer Overlay if Encrypted -->
                    ${securityLevel >= 2 ? `<path d="M45 85 Q100 15 155 85 Q100 65 45 85" fill="url(#shimmerGrad)" opacity="0.4" />` : ''}

                    <!-- Pi-Crown (High PoA Reward) -->
                    ${poaScore > 90 ? `
                        <g transform="translate(100, 25) scale(0.8) translate(-100, -25)">
                            <path d="M70 40 L80 20 L100 35 L120 20 L130 40 Z" fill="${COLORS.mango}" style="filter: url(#glow)">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
                            </path>
                        </g>
                    ` : ''}

                    <!-- PoA Status Hat (Scales with Score) -->
                    <g transform="translate(100, 45) scale(${hatScale}) translate(-100, -45)">
                        <path d="M70 45 L130 45 L125 20 L75 20 Z" fill="${COLORS.dark}" stroke="${COLORS.mango}" stroke-width="1" />
                        <path d="M60 45 L140 45 L140 50 L60 50 Z" fill="${COLORS.dark}" stroke="${COLORS.mango}" stroke-width="1" />
                        <!-- Floating Pi Symbols for high PoA -->
                        ${poaScore > 70 ? `
                            <text x="100" y="12" fill="${COLORS.mango}" font-size="10" font-weight="bold" text-anchor="middle">π
                                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
                            </text>
                        ` : ''}
                    </g>

                    <!-- AI Translation Tie/Ribbon -->
                    <path d="M90 145 L110 145 L115 185 L100 195 L85 185 Z" 
                          fill="${translationActive ? 'url(#matrixPattern)' : COLORS.dark}" 
                          stroke="${COLORS.border}" 
                          stroke-width="1" />

                    <!-- PWA Synchronization Pin (Status indicator) -->
                    <circle cx="125" cy="155" r="4" fill="${pinColor}" style="filter: ${pinGlow}">
                        ${!offline ? `<animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />` : ''}
                    </circle>

                    <!-- Sync-Eyes (Mango Orange Sparkle) -->
                    <rect x="82" y="95" width="12" height="2" rx="1" fill="${eyeColor}" style="filter: ${eyeGlow}" />
                    <rect x="106" y="95" width="12" height="2" rx="1" fill="${eyeColor}" style="filter: ${eyeGlow}" />
                </svg>
            `;
            container.innerHTML = svg;
        }
    };
})();

window.MangoAvatar = MangoAvatar;