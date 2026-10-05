import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurrentWeather } from '../types/weather';
import { GlassCard } from './ui/GlassCard';
import { Thermometer, Droplet, Wind } from './WeatherIcons';
import { Eye, Gauge, SunDim, Compass, CloudRainWind } from './WeatherIconsExtra';
import { Colors } from '../theme/colors';
import { getWindDirectionShort } from './WindCompass';

interface WeatherMetricsProps {
  current: CurrentWeather;
}

interface MetricItemData {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
}

/**
 * Get UV index level description in Vietnamese
 */
function getUvLevel(uv: number): string {
  if (uv <= 2) return 'Thấp';
  if (uv <= 5) return 'Trung bình';
  if (uv <= 7) return 'Cao';
  if (uv <= 10) return 'Rất cao';
  return 'Cực kỳ cao';
}

/**
 * Get UV progress bar width (0-100%)
 */
function getUvProgress(uv: number): number {
  return Math.min(100, (uv / 11) * 100);
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ current }) => {
  const metrics: MetricItemData[] = [
    {
      label: 'Nhiệt độ cảm nhận',
      value: `${current.apparentTemperature}°`,
      sublabel: current.apparentTemperature > current.temperature
        ? 'Nóng hơn thực tế'
        : current.apparentTemperature < current.temperature
          ? 'Lạnh hơn thực tế'
          : 'Tương đương thực tế',
      icon: <Thermometer size={20} color={Colors.metric.temperature} strokeWidth={2} />,
      color: Colors.metric.temperature,
    },
    {
      label: 'Độ ẩm',
      value: `${current.humidity}%`,
      sublabel: current.humidity > 80
        ? 'Rất ẩm'
        : current.humidity > 60
          ? 'Ẩm vừa'
          : 'Khô thoáng',
      icon: <Droplet size={20} color={Colors.metric.humidity} strokeWidth={2} />,
      color: Colors.metric.humidity,
    },
    {
      label: 'Tốc độ gió',
      value: `${current.windSpeed}`,
      sublabel: `km/h · ${getWindDirectionShort(current.windDirection)}`,
      icon: <Wind size={20} color={Colors.metric.wind} strokeWidth={2} />,
      color: Colors.metric.wind,
    },
    {
      label: 'Chỉ số UV',
      value: `${current.uvIndex ?? 0}`,
      sublabel: getUvLevel(current.uvIndex ?? 0),
      icon: <SunDim size={20} color={Colors.metric.uv} strokeWidth={2} />,
      color: Colors.metric.uv,
    },
    {
      label: 'Lượng mưa',
      value: `${current.precipitation}`,
      sublabel: 'mm',
      icon: <CloudRainWind size={20} color={Colors.metric.rain} strokeWidth={2} />,
      color: Colors.metric.rain,
    },
    {
      label: 'Áp suất',
      value: `${current.pressure ?? '—'}`,
      sublabel: 'hPa',
      icon: <Gauge size={20} color={Colors.metric.pressure} strokeWidth={2} />,
      color: Colors.metric.pressure,
    },
  ];

  return (
    <GlassCard style={styles.cardOverride}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Chỉ số thời tiết</Text>
      </View>
      <View style={styles.grid}>
        {metrics.map((item, index) => (
          <View key={index} style={styles.metricCell}>
            <View style={styles.metricHeader}>
              {item.icon}
              <Text style={styles.metricLabel}>{item.label}</Text>
            </View>
            <Text style={[styles.metricValue, { color: item.color }]}>
              {item.value}
            </Text>
            {item.sublabel && (
              <Text style={styles.metricSublabel}>{item.sublabel}</Text>
            )}
            {/* UV progress bar */}
            {item.label === 'Chỉ số UV' && current.uvIndex != null && (
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${getUvProgress(current.uvIndex)}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  cardOverride: {
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  metricCell: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
    marginLeft: 6,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  metricSublabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.55)',
    marginTop: 2,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
