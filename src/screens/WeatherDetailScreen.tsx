import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  BackHandler,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WeatherData, DailyForecastItem, HourlyForecastItem } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';
import { getWeatherDisplay } from '../utils/weatherBackgrounds';
import { GlassCard } from '../components/ui/GlassCard';
import { WeatherIcon, Droplet, Thermometer, Wind, Sunrise, Sunset } from '../components/WeatherIcons';
import { Eye, Gauge, SunDim, CloudRainWind, DewPointIcon, CloudCover, ArrowLeft } from '../components/WeatherIconsExtra';
import { WindCompass, getWindDirectionName } from '../components/WindCompass';
import { Colors } from '../theme/colors';

interface WeatherDetailScreenProps {
  weatherData: WeatherData;
  selectedDayIndex?: number;
  selectedHourIndex?: number;
  onGoBack: () => void;
}

/**
 * Format sunrise/sunset time string
 */
function formatSunTime(isoStr?: string): string {
  if (!isoStr) return '—';
  try {
    const parts = isoStr.split('T');
    if (parts.length > 1) {
      return parts[1].substring(0, 5);
    }
    return isoStr;
  } catch {
    return isoStr;
  }
}

/**
 * Get UV level description
 */
function getUvLevel(uv: number): string {
  if (uv <= 2) return 'Thấp';
  if (uv <= 5) return 'Trung bình';
  if (uv <= 7) return 'Cao';
  if (uv <= 10) return 'Rất cao';
  return 'Cực kỳ cao';
}

export const WeatherDetailScreen: React.FC<WeatherDetailScreenProps> = ({
  weatherData,
  selectedDayIndex = 0,
  selectedHourIndex,
  onGoBack,
}) => {
  const insets = useSafeAreaInsets();

  // Support Android hardware back button
  React.useEffect(() => {
    const backAction = () => {
      onGoBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onGoBack]);

  // Determine initial day index (from selectedDayIndex or from selectedHourIndex)
  const initialDayIndex = (() => {
    if (selectedDayIndex != null && selectedDayIndex >= 0 && selectedDayIndex < weatherData.daily.length) {
      return selectedDayIndex;
    }
    if (selectedHourIndex != null && weatherData.hourly[selectedHourIndex]) {
      const hDate = weatherData.hourly[selectedHourIndex].time.split('T')[0];
      const foundIdx = weatherData.daily.findIndex(d => d.date.split('T')[0] === hDate);
      if (foundIdx >= 0) return foundIdx;
    }
    return 0;
  })();

  const [activeDayIndex, setActiveDayIndex] = React.useState<number>(initialDayIndex);
  const [activeHourIndex, setActiveHourIndex] = React.useState<number | undefined>(selectedHourIndex);

  // Synchronize state when props change
  React.useEffect(() => {
    if (selectedDayIndex != null) {
      setActiveDayIndex(selectedDayIndex);
      setActiveHourIndex(undefined);
    }
  }, [selectedDayIndex]);

  React.useEffect(() => {
    if (selectedHourIndex != null) {
      setActiveHourIndex(selectedHourIndex);
      const hDate = weatherData.hourly[selectedHourIndex]?.time?.split('T')[0];
      if (hDate) {
        const foundIdx = weatherData.daily.findIndex(d => d.date.split('T')[0] === hDate);
        if (foundIdx >= 0) setActiveDayIndex(foundIdx);
      }
    }
  }, [selectedHourIndex, weatherData]);

  const day = weatherData.daily[activeDayIndex] || weatherData.daily[0];
  const hour = activeHourIndex != null ? weatherData.hourly[activeHourIndex] : null;

  // Use hourly data if a specific hour is selected, otherwise use daily data
  const isHourView = hour != null;
  const weatherCode = isHourView ? hour!.weatherCode : day.weatherCode;
  const isDay = isHourView
    ? (() => {
        const h = new Date(hour!.time).getHours();
        return h >= 6 && h < 18;
      })()
    : true;

  const weatherInfo = getWeatherInfo(weatherCode, isDay);
  const weatherDisplay = getWeatherDisplay(weatherCode, isDay);

  const title = isHourView
    ? `${hour!.hourText} · ${day.dayText}`
    : day.dayText;

  // Build detail metrics
  const detailMetrics = isHourView ? buildHourlyMetrics(hour!) : buildDailyMetrics(day, weatherData.current);
  const dayHourlyItems = getHoursForDay(weatherData.hourly, day.date);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={weatherDisplay.backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: weatherDisplay.overlayColor }]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 30 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button + Title */}
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onGoBack} style={styles.backButton} activeOpacity={0.7}>
                <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2.2} />
              </TouchableOpacity>
              <View style={styles.headerTitleCol}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.headerSubtitle}>{weatherData.city.name}</Text>
              </View>
            </View>

            {/* 7-Day Quick Selector Tab Bar */}
            <View style={styles.daySelectorContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daySelectorScroll}
              >
                {weatherData.daily.map((dItem, dIdx) => {
                  const isSelected = activeDayIndex === dIdx && !isHourView;
                  return (
                    <TouchableOpacity
                      key={`${dItem.date}-${dIdx}`}
                      style={[styles.dayTab, isSelected && styles.dayTabActive]}
                      onPress={() => {
                        setActiveDayIndex(dIdx);
                        setActiveHourIndex(undefined);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.dayTabName, isSelected && styles.dayTabNameActive]}>
                        {dIdx === 0 ? 'Hôm nay' : dItem.dayText}
                      </Text>
                      <Text style={[styles.dayTabTemp, isSelected && styles.dayTabTempActive]}>
                        {dItem.tempMax}° / {dItem.tempMin}°
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Hero: Big Temperature + Condition */}
            <View style={styles.heroSection}>
              <View style={styles.heroIconRow}>
                <WeatherIcon code={weatherCode} isDay={isDay} size={56} />
              </View>
              <Text style={styles.heroTemp}>
                {isHourView ? `${hour!.temperature}` : `${day.tempMax}`}
                <Text style={styles.heroDegree}>°</Text>
              </Text>
              <Text style={styles.heroCondition}>{weatherInfo.description}</Text>
              {!isHourView && (
                <Text style={styles.heroRange}>
                  ↑ {day.tempMax}° / ↓ {day.tempMin}°
                </Text>
              )}
            </View>

            {/* Hourly breakdown for the selected day */}
            <GlassCard style={styles.hourlyBreakdownCard}>
              <View style={styles.hourlyHeaderRow}>
                <Text style={styles.sectionTitle}>
                  {isHourView ? `Dự báo theo giờ (${day.dayText})` : `Dự báo theo giờ (${day.dayText})`}
                </Text>
                {isHourView && (
                  <TouchableOpacity
                    onPress={() => setActiveHourIndex(undefined)}
                    style={styles.resetHourBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.resetHourText}>Xem cả ngày</Text>
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hourlyScroll}
              >
                {dayHourlyItems.map((hItem, hIdx) => {
                  const hDate = new Date(hItem.time);
                  const hIsDay = hDate.getHours() >= 6 && hDate.getHours() < 18;
                  const isItemActive = hour?.time === hItem.time;
                  const fullIndex = weatherData.hourly.findIndex(h => h.time === hItem.time);

                  return (
                    <TouchableOpacity
                      key={hIdx}
                      style={[styles.hourlyCol, isItemActive && styles.hourlyColActive]}
                      onPress={() => {
                        if (isItemActive) {
                          setActiveHourIndex(undefined);
                        } else if (fullIndex >= 0) {
                          setActiveHourIndex(fullIndex);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.hourlyTime, isItemActive && styles.hourlyTimeActive]}>
                        {hItem.hourText}
                      </Text>
                      <WeatherIcon code={hItem.weatherCode} isDay={hIsDay} size={22} />
                      <Text style={[styles.hourlyTemp, isItemActive && styles.hourlyTempActive]}>
                        {hItem.temperature}°
                      </Text>
                      {hItem.precipitationProbability > 0 && (
                        <View style={styles.hourlyRainRow}>
                          <Droplet size={10} color="#67E8F9" strokeWidth={2} />
                          <Text style={styles.hourlyRain}>{hItem.precipitationProbability}%</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </GlassCard>

            {/* Detail Metrics Grid */}
            <GlassCard style={styles.metricsCard}>
              <Text style={styles.sectionTitle}>
                {isHourView ? `Thông tin chi tiết lúc ${hour!.hourText}` : 'Thông tin chi tiết cả ngày'}
              </Text>
              <View style={styles.metricsGrid}>
                {detailMetrics.map((metric, idx) => (
                  <View key={idx} style={styles.metricCell}>
                    <View style={styles.metricIconRow}>
                      {metric.icon}
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                    </View>
                    <Text style={[styles.metricValue, { color: metric.color }]}>
                      {metric.value}
                    </Text>
                    {metric.sublabel && (
                      <Text style={styles.metricSublabel}>{metric.sublabel}</Text>
                    )}
                  </View>
                ))}
              </View>
            </GlassCard>

            {/* Wind Compass (if wind data available) */}
            {(isHourView ? hour!.windDirection != null : day.windDirectionDominant != null) && (
              <GlassCard style={styles.compassCard}>
                <Text style={styles.sectionTitle}>Hướng gió</Text>
                <View style={styles.compassCenter}>
                  <WindCompass
                    direction={isHourView ? (hour!.windDirection ?? 0) : (day.windDirectionDominant ?? 0)}
                    speed={isHourView ? (hour!.windSpeed ?? 0) : (day.windSpeedMax ?? 0)}
                    size={140}
                  />
                </View>
              </GlassCard>
            )}

            {/* Sun Times (daily only) */}
            {!isHourView && (day.sunrise || day.sunset) && (
              <GlassCard style={styles.sunCard}>
                <Text style={styles.sectionTitle}>Mặt trời</Text>
                <View style={styles.sunRow}>
                  <View style={styles.sunItem}>
                    <Sunrise size={28} color="#FBBF24" strokeWidth={1.8} />
                    <Text style={styles.sunLabel}>Bình minh</Text>
                    <Text style={styles.sunTime}>{formatSunTime(day.sunrise)}</Text>
                  </View>
                  <View style={styles.sunDivider} />
                  <View style={styles.sunItem}>
                    <Sunset size={28} color="#FB923C" strokeWidth={1.8} />
                    <Text style={styles.sunLabel}>Hoàng hôn</Text>
                    <Text style={styles.sunTime}>{formatSunTime(day.sunset)}</Text>
                  </View>
                </View>
              </GlassCard>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

/**
 * Filter hourly items matching a given date
 */
function getHoursForDay(hourly: HourlyForecastItem[], dateStr: string): HourlyForecastItem[] {
  const norm = dateStr.split('T')[0];
  const matched = hourly.filter(h => h.time.split('T')[0] === norm);
  if (matched.length > 0) return matched;
  return hourly.filter(h => h.time.startsWith(norm));
}

interface MetricDisplay {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
}

function buildHourlyMetrics(hour: HourlyForecastItem): MetricDisplay[] {
  const metrics: MetricDisplay[] = [];

  if (hour.apparentTemperature != null) {
    metrics.push({
      label: 'Cảm nhận',
      value: `${hour.apparentTemperature}°`,
      icon: <Thermometer size={18} color={Colors.metric.temperature} strokeWidth={2} />,
      color: Colors.metric.temperature,
    });
  }
  if (hour.humidity != null) {
    metrics.push({
      label: 'Độ ẩm',
      value: `${hour.humidity}%`,
      icon: <Droplet size={18} color={Colors.metric.humidity} strokeWidth={2} />,
      color: Colors.metric.humidity,
    });
  }
  if (hour.windSpeed != null) {
    metrics.push({
      label: 'Gió',
      value: `${Math.round(hour.windSpeed * 10) / 10} km/h`,
      sublabel: hour.windDirection != null ? getWindDirectionName(hour.windDirection) : undefined,
      icon: <Wind size={18} color={Colors.metric.wind} strokeWidth={2} />,
      color: Colors.metric.wind,
    });
  }
  if (hour.uvIndex != null) {
    metrics.push({
      label: 'UV',
      value: `${Math.round(hour.uvIndex * 10) / 10}`,
      sublabel: getUvLevel(hour.uvIndex),
      icon: <SunDim size={18} color={Colors.metric.uv} strokeWidth={2} />,
      color: Colors.metric.uv,
    });
  }
  if (hour.precipitation != null) {
    metrics.push({
      label: 'Mưa',
      value: `${Math.round(hour.precipitation * 10) / 10} mm`,
      sublabel: `${hour.precipitationProbability}% khả năng`,
      icon: <CloudRainWind size={18} color={Colors.metric.rain} strokeWidth={2} />,
      color: Colors.metric.rain,
    });
  }
  if (hour.pressure != null) {
    metrics.push({
      label: 'Áp suất',
      value: `${Math.round(hour.pressure)}`,
      sublabel: 'hPa',
      icon: <Gauge size={18} color={Colors.metric.pressure} strokeWidth={2} />,
      color: Colors.metric.pressure,
    });
  }
  if (hour.visibility != null) {
    metrics.push({
      label: 'Tầm nhìn',
      value: `${Math.round(hour.visibility / 1000)} km`,
      icon: <Eye size={18} color={Colors.metric.visibility} strokeWidth={2} />,
      color: Colors.metric.visibility,
    });
  }
  if (hour.dewPoint != null) {
    metrics.push({
      label: 'Điểm sương',
      value: `${Math.round(hour.dewPoint)}°`,
      icon: <DewPointIcon size={18} color={Colors.metric.dewPoint} strokeWidth={2} />,
      color: Colors.metric.dewPoint,
    });
  }
  if (hour.cloudCover != null) {
    metrics.push({
      label: 'Mây che phủ',
      value: `${hour.cloudCover}%`,
      icon: <CloudCover size={18} color="#CBD5E1" strokeWidth={2} />,
      color: '#CBD5E1',
    });
  }
  return metrics;
}

function buildDailyMetrics(day: DailyForecastItem, current: any): MetricDisplay[] {
  const metrics: MetricDisplay[] = [];

  if (day.apparentTempMax != null) {
    metrics.push({
      label: 'Cảm nhận cao',
      value: `${day.apparentTempMax}°`,
      sublabel: day.apparentTempMin != null ? `Thấp: ${day.apparentTempMin}°` : undefined,
      icon: <Thermometer size={18} color={Colors.metric.temperature} strokeWidth={2} />,
      color: Colors.metric.temperature,
    });
  }
  if (day.uvIndexMax != null) {
    metrics.push({
      label: 'UV cao nhất',
      value: `${Math.round(day.uvIndexMax * 10) / 10}`,
      sublabel: getUvLevel(day.uvIndexMax),
      icon: <SunDim size={18} color={Colors.metric.uv} strokeWidth={2} />,
      color: Colors.metric.uv,
    });
  }
  if (day.windSpeedMax != null) {
    metrics.push({
      label: 'Gió mạnh nhất',
      value: `${Math.round(day.windSpeedMax)} km/h`,
      sublabel: day.windDirectionDominant != null
        ? getWindDirectionName(day.windDirectionDominant)
        : undefined,
      icon: <Wind size={18} color={Colors.metric.wind} strokeWidth={2} />,
      color: Colors.metric.wind,
    });
  }
  metrics.push({
    label: 'Lượng mưa',
    value: `${day.precipitationSum} mm`,
    sublabel: `${day.precipitationProbabilityMax ?? 0}% khả năng`,
    icon: <CloudRainWind size={18} color={Colors.metric.rain} strokeWidth={2} />,
    color: Colors.metric.rain,
  });
  if (day.precipitationHours != null && day.precipitationHours > 0) {
    metrics.push({
      label: 'Giờ mưa',
      value: `${day.precipitationHours}h`,
      icon: <Droplet size={18} color={Colors.metric.humidity} strokeWidth={2} />,
      color: Colors.metric.humidity,
    });
  }
  return metrics;
}

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
  overlay: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(18, 28, 48, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTitleCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  // Hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  heroIconRow: {
    marginBottom: 12,
  },
  heroTemp: {
    fontSize: 72,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroDegree: {
    fontSize: 42,
    fontWeight: '300',
  },
  heroCondition: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroRange: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 6,
  },
  // Metrics
  metricsCard: {
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  metricCell: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 16,
  },
  metricIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
    marginLeft: 6,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  metricSublabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.55)',
    marginTop: 2,
  },
  // Compass
  compassCard: {
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  compassCenter: {
    alignItems: 'center',
  },
  // Sun times
  sunCard: {
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  sunRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sunItem: {
    alignItems: 'center',
  },
  sunLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  sunTime: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  sunDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  // Day selector tabs
  daySelectorContainer: {
    marginVertical: 10,
  },
  daySelectorScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dayTab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    minWidth: 72,
  },
  dayTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dayTabName: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  dayTabNameActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dayTabTemp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 2,
  },
  dayTabTempActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Hourly breakdown
  hourlyBreakdownCard: {
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  hourlyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resetHourBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  resetHourText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hourlyScroll: {
    paddingRight: 10,
  },
  hourlyCol: {
    alignItems: 'center',
    width: 60,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 14,
    marginRight: 6,
  },
  hourlyColActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  hourlyTime: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
  hourlyTimeActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  hourlyTemp: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  hourlyTempActive: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  hourlyRainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  hourlyRain: {
    fontSize: 10,
    color: '#67E8F9',
    fontWeight: '600',
    marginLeft: 2,
  },
});
