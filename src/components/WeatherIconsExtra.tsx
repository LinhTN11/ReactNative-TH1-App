import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

/** 👁️ Eye icon for Visibility */
export const Eye: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

/** 📊 Gauge icon for Pressure */
export const Gauge: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="m12 14 4-4" />
    <Path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Svg>
);

/** ☀️ SunDim icon for UV Index */
export const SunDim: React.FC<IconProps> = ({ size = 24, color = '#FBBF24', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="4" />
    <Path d="M12 4h.01" />
    <Path d="M20 12h.01" />
    <Path d="M12 20h.01" />
    <Path d="M4 12h.01" />
    <Path d="M17.66 6.34h.01" />
    <Path d="M17.66 17.66h.01" />
    <Path d="M6.34 17.66h.01" />
    <Path d="M6.34 6.34h.01" />
  </Svg>
);

/** 🧭 Compass icon for Wind Direction */
export const Compass: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </Svg>
);

/** 🌧️💨 CloudRainWind icon for Rain */
export const CloudRainWind: React.FC<IconProps> = ({ size = 24, color = '#67E8F9', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="rgba(255,255,255,0.7)" />
    <Path d="m9.2 22 3-7" />
    <Path d="m9 13-3 7" />
    <Path d="m17 13-3 7" />
  </Svg>
);

/** 🌡️ DewPoint icon */
export const DewPointIcon: React.FC<IconProps> = ({ size = 24, color = '#67E8F9', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    <Path d="M12 18a3 3 0 0 0 0-6" />
  </Svg>
);

/** ☁️ CloudCover icon */
export const CloudCover: React.FC<IconProps> = ({ size = 24, color = '#CBD5E1', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <Path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
  </Svg>
);

/** ⏱️ Clock icon */
export const Clock: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

/** ← ArrowLeft / Back icon */
export const ArrowLeft: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);
