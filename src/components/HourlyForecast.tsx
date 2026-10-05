import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HourlyForecastItem } from '../types/weather';
import { WeatherIcon, Droplet, Sunset, Sunrise } from './WeatherIcons';
import { GlassCard } from './ui/GlassCard';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  summaryText?: string;
  onHourPress?: (hourIndex: number) => void;
}

/**
 * Format ISO time to Vietnamese hour format (e.g. Bây giờ, 15:00)
 */
function formatHourAmPm(timeStr: string, isNow?: boolean): string {
  if (isNow) return 'Bây giờ';
  try {
    const date = new Date(timeStr);
    const hours = date.getHours();
    return `${hours.toString().padStart(2, '0')}:00`;
  } catch {
    return timeStr;
  }
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourly,
  summaryText = 'Thời tiết thuận lợi, trời quang mây tạnh.',
  onHourPress,
}) => {
  return (
    <GlassCard style={styles.container}>
      {/* Top summary header text */}
      <Text style={styles.summaryText}>{summaryText}</Text>

      {/* Hourly Items horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourly.map((item, index) => {
          const hourLabel = formatHourAmPm(item.time, item.isNow);
          const date = new Date(item.time);
          const hour = date.getHours();
          const isDayTime = hour >= 6 && hour < 18;
          const isSunsetHour = hour === 18;
          const isSunriseHour = hour === 6;

          return (
            <TouchableOpacity
              key={`${item.time}-${index}`}
              style={styles.hourCol}
              onPress={() => onHourPress?.(index)}
              activeOpacity={onHourPress ? 0.7 : 1}
            >
              {/* Hour time text */}
              <Text style={[styles.hourText, item.isNow && styles.nowText]}>
                {hourLabel}
              </Text>

              {/* Standard Lucide Weather Icon */}
              <View style={styles.iconContainer}>
                {isSunsetHour ? (
                  <Sunset size={24} color="#FB923C" strokeWidth={2} />
                ) : isSunriseHour ? (
                  <Sunrise size={24} color="#FBBF24" strokeWidth={2} />
                ) : (
                  <WeatherIcon
                    code={item.weatherCode}
                    isDay={isDayTime}
                    size={24}
                  />
                )}
              </View>

              {/* Temperature */}
              <Text style={styles.tempText}>{item.temperature}°</Text>

              {/* Continuous trend line segment with dot */}
              <View style={styles.trendRow}>
                <View
                  style={[
                    styles.trendLineLeft,
                    index === 0 && styles.trendLineHidden,
                  ]}
                />
                <View style={styles.trendDot} />
                <View
                  style={[
                    styles.trendLineRight,
                    index === hourly.length - 1 && styles.trendLineHidden,
                  ]}
                />
              </View>

              {/* Rain Probability with Lucide Droplet icon */}
              <View style={styles.rainRow}>
                <Droplet
                  size={12}
                  color={item.precipitationProbability > 0 ? '#67E8F9' : 'rgba(255, 255, 255, 0.4)'}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.rainText,
                    item.precipitationProbability > 0 && styles.rainTextActive,
                  ]}
                >
                  {item.precipitationProbability}%
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    paddingRight: 10,
  },
  hourCol: {
    alignItems: 'center',
    width: 62,
    marginRight: 6,
  },
  hourText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  nowText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  iconContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tempText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },
  trendLineLeft: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(253, 224, 71, 0.65)',
  },
  trendLineRight: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(253, 224, 71, 0.65)',
  },
  trendLineHidden: {
    backgroundColor: 'transparent',
  },
  trendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEF08A',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginHorizontal: 1,
  },
  rainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rainText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.65)',
    marginLeft: 3,
    fontWeight: '500',
  },
  rainTextActive: {
    color: '#67E8F9',
    fontWeight: '600',
  },
});
