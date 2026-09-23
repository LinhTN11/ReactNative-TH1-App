import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

// 📍 Location Pin
export const MapPin: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

// ☀️ Sun
export const Sun: React.FC<IconProps> = ({ size = 24, color = '#FBBF24', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="4" fill={color} fillOpacity={0.8} />
    <Path d="M12 2v2" />
    <Path d="M12 20v2" />
    <Path d="m4.93 4.93 1.41 1.41" />
    <Path d="m17.66 17.66 1.41 1.41" />
    <Path d="M2 12h2" />
    <Path d="M20 12h2" />
    <Path d="m6.34 17.66-1.41 1.41" />
    <Path d="m19.07 4.93-1.41 1.41" />
  </Svg>
);

// 🌙 Moon
export const Moon: React.FC<IconProps> = ({ size = 24, color = '#E0E7FF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillOpacity={0.4} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </Svg>
);

// ☁️ Cloud
export const Cloud: React.FC<IconProps> = ({ size = 24, color = '#E2E8F0', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillOpacity={0.25} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </Svg>
);

// ⛅ CloudSun (Partly Sunny)
export const CloudSun: React.FC<IconProps> = ({ size = 24, color = '#FDE047', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 2v2" stroke="#FBBF24" />
    <Path d="m4.93 4.93 1.41 1.41" stroke="#FBBF24" />
    <Path d="M20 12h2" stroke="#FBBF24" />
    <Path d="m19.07 4.93-1.41 1.41" stroke="#FBBF24" />
    <Path d="M15.48 9.5a4 4 0 0 0-5.98 0" stroke="#FBBF24" />
    <Path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke="#FFFFFF" fill="#FFFFFF" fillOpacity={0.4} />
  </Svg>
);

// ☁️🌙 CloudMoon (Partly Cloudy Night)
export const CloudMoon: React.FC<IconProps> = ({ size = 24, color = '#C7D2FE', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M13 16a3 3 0 1 1 0-6 3 3 0 0 1 2 2" stroke="#A5B4FC" />
    <Path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke="#E2E8F0" fill="#E2E8F0" fillOpacity={0.3} />
  </Svg>
);

// 🌧️ CloudRain
export const CloudRain: React.FC<IconProps> = ({ size = 24, color = '#38BDF8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="#E2E8F0" />
    <Path d="M16 14v6" />
    <Path d="M8 14v6" />
    <Path d="M12 16v6" />
  </Svg>
);

// 🌦️ CloudDrizzle
export const CloudDrizzle: React.FC<IconProps> = ({ size = 24, color = '#67E8F9', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="#E2E8F0" />
    <Path d="M8 19v1" />
    <Path d="M8 14v1" />
    <Path d="M12 21v1" />
    <Path d="M12 16v1" />
    <Path d="M16 19v1" />
    <Path d="M16 14v1" />
  </Svg>
);

// ❄️ CloudSnow
export const CloudSnow: React.FC<IconProps> = ({ size = 24, color = '#BAE6FD', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="#E2E8F0" />
    <Path d="M8 15h.01" />
    <Path d="M8 19h.01" />
    <Path d="M12 17h.01" />
    <Path d="M12 21h.01" />
    <Path d="M16 15h.01" />
    <Path d="M16 19h.01" />
  </Svg>
);

// ⛈️ CloudLightning
export const CloudLightning: React.FC<IconProps> = ({ size = 24, color = '#FDE047', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" stroke="#CBD5E1" />
    <Path d="m13 12-3 5h4l-3 5" fill={color} />
  </Svg>
);

// 🌫️ CloudFog
export const CloudFog: React.FC<IconProps> = ({ size = 24, color = '#CBD5E1', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <Path d="M16 17H7" />
    <Path d="M17 21H9" />
  </Svg>
);

// 🌅 Sunrise
export const Sunrise: React.FC<IconProps> = ({ size = 24, color = '#FB923C', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 2v6" />
    <Path d="m4.93 10.93 1.41 1.41" />
    <Path d="M2 18h2" />
    <Path d="M20 18h2" />
    <Path d="m19.07 10.93-1.41 1.41" />
    <Path d="M22 22H2" />
    <Path d="m8 6 4-4 4 4" />
    <Path d="M16 18a4 4 0 0 0-8 0" />
  </Svg>
);

// 🌇 Sunset
export const Sunset: React.FC<IconProps> = ({ size = 24, color = '#F97316', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 10V4" />
    <Path d="m4.93 10.93 1.41 1.41" />
    <Path d="M2 18h2" />
    <Path d="M20 18h2" />
    <Path d="m19.07 10.93-1.41 1.41" />
    <Path d="M22 22H2" />
    <Path d="m16 6-4 4-4-4" />
    <Path d="M16 18a4 4 0 0 0-8 0" />
  </Svg>
);

// 💧 Droplet
export const Droplet: React.FC<IconProps> = ({ size = 24, color = '#38BDF8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillOpacity={0.3} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </Svg>
);

// 🌡️ Thermometer
export const Thermometer: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    <Circle cx="12" cy="17" r="2" fill={color} />
  </Svg>
);

// 💨 Wind
export const Wind: React.FC<IconProps> = ({ size = 24, color = '#93C5FD', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <Path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <Path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </Svg>
);

// 🔄 RefreshCw
export const RefreshCw: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <Path d="M21 3v5h-5" />
    <Path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <Path d="M8 16H3v5" />
  </Svg>
);

// 🔍 Search
export const Search: React.FC<IconProps> = ({ size = 24, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="11" cy="11" r="8" />
    <Path d="m21 21-4.3-4.3" />
  </Svg>
);

// ❌ X (Close)
export const X: React.FC<IconProps> = ({ size = 24, color = '#CBD5E1', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M18 6 6 18" />
    <Path d="m6 6 12 12" />
  </Svg>
);

// 🔽 ChevronDown
export const ChevronDown: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);

// ▶️ ChevronRight
export const ChevronRight: React.FC<IconProps> = ({ size = 24, color = '#64748B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

// ⬆️ ArrowUp
export const ArrowUp: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="m5 12 7-7 7 7" />
    <Path d="M12 19V5" />
  </Svg>
);

// ⬇️ ArrowDown
export const ArrowDown: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 5v14" />
    <Path d="m19 12-7 7-7-7" />
  </Svg>
);

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  color?: string;
}

/**
 * Returns a standard vector icon for any WMO weather code
 */
export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = true,
  size = 24,
  color,
}) => {
  if (code === 0) {
    return isDay ? <Sun size={size} color={color} /> : <Moon size={size} color={color} />;
  }
  if (code === 1 || code === 2) {
    return isDay ? <CloudSun size={size} color={color} /> : <CloudMoon size={size} color={color} />;
  }
  if (code === 3) {
    return <Cloud size={size} color={color} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog size={size} color={color} />;
  }
  if (code >= 51 && code <= 57) {
    return <CloudDrizzle size={size} color={color} />;
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return <CloudRain size={size} color={color} />;
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return <CloudSnow size={size} color={color} />;
  }
  if (code >= 95) {
    return <CloudLightning size={size} color={color} />;
  }
  return isDay ? <CloudSun size={size} color={color} /> : <CloudMoon size={size} color={color} />;
};
