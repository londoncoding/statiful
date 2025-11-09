/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Broadcast Quality
        statiful: {
          dark: "#0F172A",
          darker: "#020617",
          card: "#1E293B",
          border: "#334155",
        },
        
        // Primary - Electric Blue (Full palette)
        primary: {
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          800: "#002966",
          900: "#001433",
          DEFAULT: "#0066FF",
        },
        
        // Pitch Green - Success & Positive Metrics
        pitch: {
          50: "#E6F7EE",
          100: "#CCEFDD",
          200: "#99DFBB",
          300: "#66CF99",
          400: "#33BF77",
          500: "#00A651",
          600: "#008541",
          700: "#006431",
          800: "#004221",
          900: "#002110",
          DEFAULT: "#00A651",
        },
        
        // Danger Red
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          DEFAULT: "#EF4444",
        },
        
        // Warning Amber
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          DEFAULT: "#F59E0B",
        },
        
        // Neutral Grays
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        
        // Additional semantic colors
        foreground: "#F8FAFC",
        background: "#0F172A",
      },
      
      // Enhanced border radius
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      
      // Enhanced shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 102, 255, 0.15)',
        'glass-lg': '0 12px 48px 0 rgba(0, 102, 255, 0.25)',
        'neon': '0 0 20px rgba(0, 102, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(0, 102, 255, 0.6)',
        'neon-primary': '0 0 30px rgba(0, 102, 255, 0.4)',
        'neon-success': '0 0 30px rgba(0, 166, 81, 0.4)',
        'neon-warning': '0 0 30px rgba(245, 158, 11, 0.4)',
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 102, 255, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      
      // Typography
      fontSize: {
        'hero': ['5rem', { lineHeight: '1', fontWeight: '800' }],
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'stat': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};