import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CityLocation, WeatherData } from '../types/weather';
import { POPULAR_CITIES, fetchWeatherForecast } from '../services/weatherApi';
import { getWeatherDisplay } from '../utils/weatherBackgrounds';
import { WeatherHeader } from '../components/WeatherHeader';
import { CurrentWeather } from '../components/CurrentWeather';
import { HourlyForecast } from '../components/HourlyForecast';
import { WeatherInsightCard } from '../components/WeatherInsightCard';
import { DailyForecast } from '../components/DailyForecast';
import { CitySearchModal } from '../components/CitySearchModal';

export const WeatherScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]); // Default Hanoi
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const loadWeather = useCallback(async (city: CityLocation, isPullRefresh: boolean = false) => {
    if (isPullRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await fetchWeatherForecast(city);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load weather forecast:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(selectedCity);
  }, [selectedCity, loadWeather]);

  const handleRefresh = () => {
    loadWeather(selectedCity, true);
  };

  const handleSelectCity = (city: CityLocation) => {
    setSelectedCity(city);
  };

  const weatherDisplay = weatherData
    ? getWeatherDisplay(weatherData.current.weatherCode, weatherData.current.isDay)
    : getWeatherDisplay(0, true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={weatherDisplay.backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Soft overlay gradient/tint for high contrast & text readability */}
        <View style={[styles.backdropOverlay, { backgroundColor: weatherDisplay.overlayColor }]}>
          {isLoading && !weatherData ? (
            <View style={styles.centerLoading}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>Đang tải dữ liệu thời tiết...</Text>
            </View>
          ) : weatherData ? (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={[
                styles.scrollContent,
                { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 24 },
              ]}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  tintColor="#FFFFFF"
                  colors={['#38BDF8', '#FFFFFF']}
                />
              }
            >
              {/* Header: Location & Refresh */}
              <WeatherHeader
                city={weatherData.city}
                lastUpdated={weatherData.lastUpdated}
                onOpenSearch={() => setIsSearchVisible(true)}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />

              {/* Hero Section: Left-aligned 23°, Condition, High/Low, Feels like */}
              <CurrentWeather
                current={weatherData.current}
                todayForecast={weatherData.daily[0]}
              />

              {/* Card 1: Glassmorphic Hourly Forecast with trend line */}
              <HourlyForecast
                hourly={weatherData.hourly}
                summaryText={weatherDisplay.summary}
              />

              {/* Card 2: Insight / Temperature change comparison card */}
              <WeatherInsightCard
                today={weatherData.daily[0]}
                tomorrow={weatherData.daily[1]}
                current={weatherData.current}
              />

              {/* Card 3: Multi-day Forecast */}
              <DailyForecast daily={weatherData.daily} />
            </ScrollView>
          ) : null}
        </View>
      </ImageBackground>

      {/* City Search Modal */}
      <CitySearchModal
        visible={isSearchVisible}
        currentCity={selectedCity}
        onClose={() => setIsSearchVisible(false)}
        onSelectCity={handleSelectCity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
