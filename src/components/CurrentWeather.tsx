import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurrentWeather as CurrentWeatherType, DailyForecastItem } from '../types/weather';
import { getWeatherDisplay } from '../utils/weatherBackgrounds';
import { ArrowUp, ArrowDown } from './WeatherIcons';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  todayForecast?: DailyForecastItem;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, todayForecast }) => {
  const display = getWeatherDisplay(current.weatherCode, current.isDay);

  const tempMax = todayForecast ? todayForecast.tempMax : current.temperature + 2;
  const tempMin = todayForecast ? todayForecast.tempMin : current.temperature - 3;

  return (
    <View style={styles.container}>
      {/* Huge Left-Aligned Temperature */}
      <View style={styles.tempRow}>
        <Text style={styles.temperatureText}>{current.temperature}</Text>
        <Text style={styles.degreeSymbol}>°</Text>
      </View>

      {/* Weather Condition Name */}
      <Text style={styles.conditionText}>{display.title}</Text>

      {/* High / Low Range with arrows */}
      <View style={styles.rangeRow}>
        <View style={styles.arrowItem}>
          <ArrowUp size={15} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.rangeText}>{tempMax}°</Text>
        </View>
        <Text style={styles.slashText}>/</Text>
        <View style={styles.arrowItem}>
          <ArrowDown size={15} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.rangeText}>{tempMin}°</Text>
        </View>
      </View>

      {/* Feels Like Text */}
      <Text style={styles.feelsLikeText}>
        Cảm giác như {current.apparentTemperature}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'flex-start',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperatureText: {
    fontSize: 82,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -2,
    lineHeight: 90,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  degreeSymbol: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  conditionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  arrowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  slashText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 8,
  },
  feelsLikeText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
