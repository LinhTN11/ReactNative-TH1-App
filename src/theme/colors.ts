/**
 * Color tokens for the Weather App design system
 * Centralized color management for consistent UI
 */

export const Colors = {
  // Glass morphism - Frosted Glass (Kính mờ)
  glass: {
    background: 'rgba(18, 28, 48, 0.85)',
    backgroundLight: 'rgba(18, 28, 48, 0.70)',
    backgroundStrong: 'rgba(18, 28, 48, 0.92)',
    border: 'rgba(255, 255, 255, 0.28)',
    borderLight: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.4)',
  },

  // Accent colors
  accent: {
    cyan: '#38BDF8',
    cyanLight: '#67E8F9',
    cyanFaded: 'rgba(56, 189, 248, 0.2)',
    warm: '#FB923C',
    warmLight: '#FBBF24',
    yellow: '#FDE047',
    red: '#F87171',
    green: '#34D399',
    purple: '#A78BFA',
  },

  // Background
  bg: {
    dark: '#0F172A',
    darkCard: '#1E293B',
    darkOverlay: 'rgba(0, 0, 0, 0.35)',
  },

  // Metric specific
  metric: {
    temperature: '#FB923C',
    humidity: '#38BDF8',
    wind: '#93C5FD',
    uv: '#FBBF24',
    rain: '#67E8F9',
    pressure: '#A78BFA',
    visibility: '#34D399',
    dewPoint: '#67E8F9',
  },
} as const;
