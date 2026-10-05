import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CityLocation, WeatherData } from '../types/weather';
import { POPULAR_CITIES, fetchWeatherForecast, findCurrentHourIndex } from '../services/weatherApi';
import { getCurrentLocation } from '../services/locationService';
import { getWeatherDisplay } from '../utils/weatherBackgrounds';
import { WeatherHeader } from '../components/WeatherHeader';
import { CurrentWeather } from '../components/CurrentWeather';
import { HourlyForecast } from '../components/HourlyForecast';
import { WeatherInsightCard } from '../components/WeatherInsightCard';
import { DailyForecast } from '../components/DailyForecast';
import { WeatherMetrics } from '../components/WeatherMetrics';
import { CitySearchModal } from '../components/CitySearchModal';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { WeatherDetailScreen } from './WeatherDetailScreen';

export const WeatherScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Detail view state (inline navigation)
  const [detailView, setDetailView] = useState<{
    show: boolean;
    dayIndex?: number;
    hourIndex?: number;
  }>({ show: false });

  // Try to get device location on first mount
  useEffect(() => {
    (async () => {
      try {
        const location = await getCurrentLocation();
        if (location) {
          setSelectedCity(location);
        }
      } catch {
        // Silently fall back to default city
      }
    })();
  }, []);

  const weatherDataRef = React.useRef<WeatherData | null>(null);
  weatherDataRef.current = weatherData;

  const loadWeather = useCallback(async (city: CityLocation, isPullRefresh: boolean = false) => {
    if (isPullRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setHasError(false);

    try {
      const data = await fetchWeatherForecast(city);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load weather forecast:', err);
      if (!weatherDataRef.current) {
        setHasError(true);
      }
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

  const currentHourIdx = weatherData
    ? findCurrentHourIndex(weatherData.hourly.map(h => h.time))
    : 0;

  // Next 24 hours starting from current hour for the main screen card
  const mainScreenHourly = weatherData
    ? weatherData.hourly.slice(currentHourIdx, currentHourIdx + 24)
    : [];

  const handleDayPress = (dayIndex: number) => {
    setDetailView({ show: true, dayIndex, hourIndex: undefined });
  };

  const handleHourPress = (hourIndex: number) => {
    const fullIndex = currentHourIdx + hourIndex;
    setDetailView({ show: true, hourIndex: fullIndex });
  };

  const handleDetailGoBack = () => {
    setDetailView({ show: false });
  };

  // If detail view is active, show it
  if (detailView.show && weatherData) {
    return (
      <WeatherDetailScreen
        weatherData={weatherData}
        selectedDayIndex={detailView.dayIndex}
        selectedHourIndex={detailView.hourIndex}
        onGoBack={handleDetailGoBack}
      />
    );
  }

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
        <View style={[styles.backdropOverlay, { backgroundColor: weatherDisplay.overlayColor }]}>
          {/* Loading State */}
          {isLoading && !weatherData ? (
            <LoadingState />
          ) : hasError && !weatherData ? (
            /* Error State */
            <ErrorState onRetry={() => loadWeather(selectedCity)} />
          ) : weatherData ? (
            /* Main Content */
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

              {/* Hero Section */}
              <CurrentWeather
                current={weatherData.current}
                todayForecast={weatherData.daily[0]}
              />

              {/* Hourly Forecast */}
              <HourlyForecast
                hourly={mainScreenHourly}
                summaryText={weatherDisplay.summary}
                onHourPress={handleHourPress}
              />

              {/* Insight Card */}
              <WeatherInsightCard
                today={weatherData.daily[0]}
                tomorrow={weatherData.daily[1]}
                current={weatherData.current}
              />

              {/* Weather Metrics Dashboard */}
              <WeatherMetrics current={weatherData.current} />

              {/* Daily Forecast */}
              <DailyForecast
                daily={weatherData.daily}
                onDayPress={handleDayPress}
              />
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
});
