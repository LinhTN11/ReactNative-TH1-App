import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyForecastItem } from '../types/weather';
import { WeatherIcon, Droplet } from './WeatherIcons';

interface DailyForecastProps {
  daily: DailyForecastItem[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {daily.map((item, index) => {
          const isToday = index === 0;
          const displayDay = isToday ? 'Today' : item.dayText;
          const rainProb = item.precipitationProbabilityMax ?? 0;

          return (
            <View
              key={`${item.date}-${index}`}
              style={[
                styles.dayRow,
                index < daily.length - 1 && styles.borderBottom,
              ]}
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
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
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
    width: 65,
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
    width: 80,
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
});
