tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        brand: {
                            50:  '#faf8f5',
                            100: '#f3ede5',
                            200: '#e6daca',
                            300: '#d4c1a8',
                            400: '#c0a484',
                            500: '#a8876a',
                            600: '#96735a',
                            700: '#7d5e4b',
                            800: '#664d40',
                            900: '#544136',
                            950: '#2d211b',
                        },
                        dark:   '#121212',
                        carbon: '#1a1a1a',
                        ash:    '#242424',
                    },
                    keyframes: {
                        'fade-up':    { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                        'scale-in':   { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
                        'slide-left': { '0%': { opacity: '0', transform: 'translateX(60px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                        'float':      { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
                        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px rgba(168,135,106,0.15)' }, '50%': { boxShadow: '0 0 40px rgba(168,135,106,0.35)' } },
                    },
                    animation: {
                        'fade-up':    'fade-up 0.8s ease-out forwards',
                        'fade-in':    'fade-in 0.6s ease-out forwards',
                        'scale-in':   'scale-in 0.6s ease-out forwards',
                        'slide-left': 'slide-left 0.7s ease-out forwards',
                        'float':      'float 6s ease-in-out infinite',
                        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                    }
                }
            }
        };