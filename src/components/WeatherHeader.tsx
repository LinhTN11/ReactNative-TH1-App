import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { CityLocation } from '../types/weather';
import { MapPin, RefreshCw, ChevronDown } from './WeatherIcons';

interface WeatherHeaderProps {
  city: CityLocation;
  lastUpdated: string;
  onOpenSearch: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  city,
  lastUpdated,
  onOpenSearch,
  onRefresh,
  isRefreshing,
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Spin animation when refreshing
  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    if (isRefreshing) {
      animation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      Animated.timing(spinAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [isRefreshing, spinAnim]);

  const handlePressRefresh = () => {
    // Immediate spin on user press
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (!isRefreshing) {
        spinAnim.setValue(0);
      }
    });
    onRefresh();
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationSelector}
        onPress={onOpenSearch}
        activeOpacity={0.7}
      >
        <MapPin size={22} color="#FFFFFF" strokeWidth={2.2} style={styles.pinIcon} />
        <View style={styles.locationInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.cityName} numberOfLines={1}>
              {city.name}
            </Text>
            <ChevronDown size={16} color="rgba(255, 255, 255, 0.85)" style={styles.chevron} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={handlePressRefresh}
        disabled={isRefreshing}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <RefreshCw
            size={16}
            color="#FFFFFF"
            strokeWidth={2.2}
          />
        </Animated.View>
        {lastUpdated ? (
          <Text style={styles.updatedText}>{lastUpdated}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pinIcon: {
    marginRight: 8,
  },
  locationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  chevron: {
    marginLeft: 6,
    marginTop: 2,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(18, 28, 48, 0.85)',
    borderRadius: 20,
  },
  updatedText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
  },
});
