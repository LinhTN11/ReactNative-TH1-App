import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DailyForecastItem, CurrentWeather } from '../types/weather';
import { Thermometer, Wind, ArrowDown, ArrowUp } from './WeatherIcons';

interface WeatherInsightCardProps {
  today?: DailyForecastItem;
  tomorrow?: DailyForecastItem;
  current: CurrentWeather;
}

export const WeatherInsightCard: React.FC<WeatherInsightCardProps> = ({
  today,
  tomorrow,
  current,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Compute temperature difference between tomorrow and today
  const tempDiff =
    today && tomorrow
      ? tomorrow.tempMax - today.tempMax
      : -2;

  const isLower = tempDiff < 0;
  const absDiff = Math.abs(tempDiff);

  const getSubtitle = () => {
    if (absDiff === 0) {
      return "Tomorrow's temperature will be similar to today.";
    }
    if (isLower) {
      return absDiff >= 3
        ? "Tomorrow's temperature will be much lower than today."
        : "Tomorrow's temperature will be slightly cooler.";
    }
    return absDiff >= 3
      ? "Tomorrow's temperature will be significantly warmer."
      : "Tomorrow's temperature will be slightly higher.";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setActiveTab(prev => (prev === 0 ? 1 : 0))}
        style={styles.innerContent}
      >
        {activeTab === 0 ? (
          <View style={styles.cardRow}>
            {/* Left Content */}
            <View style={styles.leftCol}>
              <View style={styles.tagRow}>
                <Thermometer size={14} color="#FFFFFF" strokeWidth={2.2} />
                <Text style={styles.tagText}>Enjoy the day...</Text>
              </View>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {getSubtitle()}
              </Text>
            </View>

            {/* Right Badge */}
            <View style={styles.rightBadge}>
              {isLower ? (
                <ArrowDown size={20} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <ArrowUp size={20} color="#FFFFFF" strokeWidth={3} />
              )}
              <Text style={styles.badgeNumber}>{absDiff}°</Text>
            </View>
          </View>
        ) : (
          <View style={styles.cardRow}>
            {/* Secondary Tab: Wind & Humidity Insight */}
            <View style={styles.leftCol}>
              <View style={styles.tagRow}>
                <Wind size={14} color="#FFFFFF" strokeWidth={2.2} />
                <Text style={styles.tagText}>Air & Humidity</Text>
              </View>
              <Text style={styles.descriptionText} numberOfLines={2}>
                Humidity is {current.humidity}% with gentle winds at {current.windSpeed} km/h.
              </Text>
            </View>

            {/* Right Badge */}
            <View style={styles.rightBadge}>
              <Text style={styles.badgeNumber}>{current.humidity}%</Text>
            </View>
          </View>
        )}

        {/* Carousel Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, activeTab === 0 && styles.activeDot]} />
          <View style={[styles.dot, activeTab === 1 && styles.activeDot]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  innerContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    flex: 1,
    paddingRight: 14,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
    marginLeft: 6,
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  rightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  badgeNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
});
