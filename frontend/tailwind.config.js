/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0a0e27',
                'bg-secondary': '#131829',
                'bg-tertiary': '#1a1f3a',
                'text-primary': '#e2e8f0',
                'text-secondary': '#94a3b8',
                'text-muted': '#64748b',
                'accent-primary': '#6366f1',
                'accent-secondary': '#8b5cf6',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },
            spacing: {
                'xs': '0.25rem',
                'sm': '0.5rem',
                'md': '1rem',
                'lg': '1.5rem',
                'xl': '2rem',
                '2xl': '3rem',
            },
            borderRadius: {
                'sm': '0.375rem',
                'md': '0.5rem',
                'lg': '0.75rem',
                'xl': '1rem',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                'glow': '0 4px 12px rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 6px 16px rgba(99, 102, 241, 0.4)',
            },
            backdropBlur: {
                'glass': '10px',
            },
            transitionDuration: {
                'fast': '150ms',
                'base': '200ms',
                'slow': '300ms',
            },
            keyframes: {
                spin: {
                    to: { transform: 'rotate(360deg)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                slideUp: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                'spin': 'spin 0.8s linear infinite',
                'fadeIn': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                'slideUp': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
}
