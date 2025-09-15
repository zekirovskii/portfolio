/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired color palette
        light: {
          bg: "#ffffff",           // Pure white background
          surface: "#f5f5f7",      // Apple's soft gray surface
          surfaceSecondary: "#fafafa", // Secondary surface
          border: "#e5e5e7",       // Light gray border
          borderSecondary: "#d1d1d6", // Secondary border
          text: "#1d1d1f",         // Apple black text
          textSecondary: "#6e6e73", // Secondary gray text
          textTertiary: "#8e8e93", // Tertiary gray text
          muted: "#a1a1a6",        // Muted text
          accent: "#007aff",       // Apple blue accent
          success: "#34c759",      // Apple green
          warning: "#ff9500",      // Apple orange
          error: "#ff3b30",        // Apple red
        },
        dark: {
          bg: "#000000",           // Pure black background
          surface: "#1c1c1e",      // Apple dark surface
          surfaceSecondary: "#2c2c2e", // Secondary dark surface
          border: "#38383a",       // Dark gray border
          borderSecondary: "#48484a", // Secondary dark border
          text: "#ffffff",         // Pure white text
          textSecondary: "#ebebf5", // Secondary white text
          textTertiary: "#d1d1d6", // Tertiary white text
          muted: "#8e8e93",        // Muted dark text
          accent: "#0a84ff",       // Apple blue accent (dark)
          success: "#30d158",      // Apple green (dark)
          warning: "#ff9f0a",      // Apple orange (dark)
          error: "#ff453a",        // Apple red (dark)
        },
        // Neutral grayscale palette
        gray: {
          50: '#fafafa',   // Lightest gray
          100: '#f5f5f5',  // Very light gray
          200: '#e5e5e5',  // Light gray
          300: '#d4d4d4',  // Medium light gray
          400: '#a3a3a3',  // Medium gray
          500: '#737373',  // Base gray
          600: '#525252',  // Medium dark gray
          700: '#404040',  // Dark gray
          800: '#262626',  // Very dark gray
          900: '#171717',  // Darkest gray
          950: '#0a0a0a',  // Almost black
        }
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', '1'],
        '6xl': ['60px', '1'],
        '7xl': ['72px', '1'],
        '8xl': ['96px', '1'],
        '9xl': ['128px', '1'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'apple-xl': '0 16px 64px rgba(0, 0, 0, 0.15)',
        'apple-dark': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'apple-dark-lg': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'apple-dark-xl': '0 16px 64px rgba(0, 0, 0, 0.5)',
        'inner-apple': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)',
        'dark-gradient': 'linear-gradient(135deg, #000000 0%, #1c1c1e 100%)',
        'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'glass-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 122, 255, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 122, 255, 0.8)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
