import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DailyForecastItem } from '../types/weather';
import { WeatherIcon, Droplet } from './WeatherIcons';
import { ChevronRight } from './WeatherIcons';
import { GlassCard } from './ui/GlassCard';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  onDayPress?: (dayIndex: number) => void;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, onDayPress }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.listContainer}>
        {daily.map((item, index) => {
          const isToday = index === 0;
          const displayDay = isToday ? 'Hôm nay' : item.dayText;
          const rainProb = item.precipitationProbabilityMax ?? 0;

          return (
            <TouchableOpacity
              key={`${item.date}-${index}`}
              style={[
                styles.dayRow,
                index < daily.length - 1 && styles.borderBottom,
              ]}
              onPress={() => onDayPress?.(index)}
              activeOpacity={onDayPress ? 0.7 : 1}
            >
              {/* Day title */}
              <View style={styles.dayCol}>
                <Text style={[styles.dayText, isToday && styles.todayText]}>
                  {displayDay}
                </Text>
              </View>

              {/* Rain Chance */}
              <View style={styles.rainCol}>
                {rainProb > 0 ? (
                  <View style={styles.rainInner}>
                    <Droplet size={12} color="#67E8F9" strokeWidth={2} />
                    <Text style={styles.rainText}>{rainProb}%</Text>
                  </View>
                ) : null}
              </View>

              {/* Weather Icons (Day & Night icons) */}
              <View style={styles.iconsCol}>
                <View style={styles.iconWrapper}>
                  <WeatherIcon code={item.weatherCode} isDay={true} size={20} />
                </View>
                <View style={styles.iconWrapper}>
                  <WeatherIcon code={item.weatherCode} isDay={false} size={18} />
                </View>
              </View>

              {/* Temperatures: Max & Min */}
              <View style={styles.tempCol}>
                <Text style={styles.maxTemp}>{item.tempMax}°</Text>
                <Text style={styles.minTemp}>{item.tempMin}°</Text>
              </View>

              {/* Chevron indicator */}
              {onDayPress && (
                <View style={styles.chevronCol}>
                  <ChevronRight size={16} color="rgba(255, 255, 255, 0.4)" strokeWidth={2} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  listContainer: {
    width: '100%',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayCol: {
    width: 95,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  todayText: {
    fontWeight: '700',
  },
  rainCol: {
    width: 60,
    justifyContent: 'center',
  },
  rainInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rainText: {
    fontSize: 12,
    color: '#A5F3FC',
    fontWeight: '600',
    marginLeft: 3,
  },
  iconsCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginHorizontal: 4,
  },
  tempCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 75,
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 10,
  },
  minTemp: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  chevronCol: {
    marginLeft: 6,
  },
});
