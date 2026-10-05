import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, G } from 'react-native-svg';

interface WindCompassProps {
  direction: number; // 0-360 degrees
  speed: number;
  size?: number;
}

/**
 * Get Vietnamese wind direction name from degrees
 */
export function getWindDirectionName(degrees: number): string {
  const directions = [
    'Bắc', 'Đông Bắc', 'Đông', 'Đông Nam',
    'Nam', 'Tây Nam', 'Tây', 'Tây Bắc',
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

/**
 * Get short wind direction abbreviation
 */
export function getWindDirectionShort(degrees: number): string {
  const directions = ['B', 'ĐB', 'Đ', 'ĐN', 'N', 'TN', 'T', 'TB'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export const WindCompass: React.FC<WindCompassProps> = ({
  direction,
  speed,
  size = 120,
}) => {
  const center = size / 2;
  const radius = center - 14;
  const needleLen = radius - 8;

  // Convert to radians (0° = North, clockwise)
  const rad = ((direction - 90) * Math.PI) / 180;
  const tipX = center + needleLen * Math.cos(rad);
  const tipY = center + needleLen * Math.sin(rad);

  // Cardinal direction labels
  const cardinals = [
    { label: 'B', angle: 0 },
    { label: 'Đ', angle: 90 },
    { label: 'N', angle: 180 },
    { label: 'T', angle: 270 },
  ];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer ring */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={1.5}
        />

        {/* Tick marks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const isMajor = i % 3 === 0;
          const outerR = radius;
          const innerR = isMajor ? radius - 8 : radius - 5;
          return (
            <Line
              key={i}
              x1={center + innerR * Math.cos(angle)}
              y1={center + innerR * Math.sin(angle)}
              x2={center + outerR * Math.cos(angle)}
              y2={center + outerR * Math.sin(angle)}
              stroke={isMajor ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)'}
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}

        {/* Cardinal labels */}
        {cardinals.map(({ label, angle }) => {
          const labelR = radius - 18;
          const rad2 = ((angle - 90) * Math.PI) / 180;
          return (
            <G key={label}>
              <Circle
                cx={center + labelR * Math.cos(rad2)}
                cy={center + labelR * Math.sin(rad2)}
                r={0}
                fill="transparent"
              />
            </G>
          );
        })}

        {/* Center dot */}
        <Circle
          cx={center}
          cy={center}
          r={4}
          fill="rgba(255, 255, 255, 0.6)"
        />

        {/* Needle / Arrow */}
        <Line
          x1={center}
          y1={center}
          x2={tipX}
          y2={tipY}
          stroke="#38BDF8"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Needle tip circle */}
        <Circle
          cx={tipX}
          cy={tipY}
          r={4}
          fill="#38BDF8"
        />
      </Svg>

      {/* Cardinal text overlays (rendered as RN Text for crisp fonts) */}
      {cardinals.map(({ label, angle }) => {
        const labelR = radius - 18;
        const rad2 = ((angle - 90) * Math.PI) / 180;
        const x = center + labelR * Math.cos(rad2) - 6;
        const y = center + labelR * Math.sin(rad2) - 8;
        return (
          <Text
            key={label}
            style={[
              styles.cardinalText,
              { position: 'absolute', left: x, top: y },
            ]}
          >
            {label}
          </Text>
        );
      })}

      {/* Speed + Direction label below */}
      <Text style={styles.speedText}>
        {speed} km/h
      </Text>
      <Text style={styles.directionText}>
        {getWindDirectionName(direction)} ({Math.round(direction)}°)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardinalText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    width: 14,
    textAlign: 'center',
  },
  speedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  directionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
});
