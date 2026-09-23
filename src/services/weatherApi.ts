import { CityLocation, WeatherData, DailyForecastItem, HourlyForecastItem } from '../types/weather';
import { formatDayOfWeek, formatHour } from '../utils/weatherCodes';

export const POPULAR_CITIES: CityLocation[] = [
  { id: 'hn', name: 'Hà Nội', country: 'Việt Nam', latitude: 21.0285, longitude: 105.8542, admin1: 'Thủ đô Hà Nội' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', country: 'Việt Nam', latitude: 10.8231, longitude: 106.6297, admin1: 'Miền Nam' },
  { id: 'dn', name: 'Đà Nẵng', country: 'Việt Nam', latitude: 16.0544, longitude: 108.2022, admin1: 'Miền Trung' },
  { id: 'hp', name: 'Hải Phòng', country: 'Việt Nam', latitude: 20.8449, longitude: 106.6881, admin1: 'Miền Bắc' },
  { id: 'ct', name: 'Cần Thơ', country: 'Việt Nam', latitude: 10.0452, longitude: 105.7469, admin1: 'Tây Nam Bộ' },
  { id: 'hue', name: 'Huế', country: 'Việt Nam', latitude: 16.4637, longitude: 107.5909, admin1: 'Thừa Thiên Huế' },
  { id: 'dl', name: 'Đà Lạt', country: 'Việt Nam', latitude: 11.9404, longitude: 108.4583, admin1: 'Lâm Đồng' },
  { id: 'tyo', name: 'Tokyo', country: 'Nhật Bản', latitude: 35.6762, longitude: 139.6503, admin1: 'Kanto' },
  { id: 'par', name: 'Paris', country: 'Pháp', latitude: 48.8566, longitude: 2.3522, admin1: 'Île-de-France' },
  { id: 'nyc', name: 'New York', country: 'Hoa Kỳ', latitude: 40.7128, longitude: -74.0060, admin1: 'New York' },
];

/**
 * Fetch forecast from Open-Meteo
 */
export async function fetchWeatherForecast(city: CityLocation): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }
    const data = await response.json();

    const currentHourIndex = findCurrentHourIndex(data.hourly.time);
    
    // Extract next 24 hours starting from current hour
    const hourlyItems: HourlyForecastItem[] = [];
    const maxHourly = Math.min(currentHourIndex + 24, data.hourly.time.length);
    for (let i = currentHourIndex; i < maxHourly; i++) {
      const isNow = i === currentHourIndex;
      hourlyItems.push({
        time: data.hourly.time[i],
        hourText: isNow ? 'Bây giờ' : formatHour(data.hourly.time[i]),
        temperature: Math.round(data.hourly.temperature_2m[i]),
        weatherCode: data.hourly.weather_code[i],
        precipitationProbability: data.hourly.precipitation_probability ? data.hourly.precipitation_probability[i] : 0,
        isNow,
      });
    }

    // Extract 7 days daily forecast
    const dailyItems: DailyForecastItem[] = [];
    const daysCount = Math.min(7, data.daily.time.length);
    for (let i = 0; i < daysCount; i++) {
      dailyItems.push({
        date: data.daily.time[i],
        dayText: formatDayOfWeek(data.daily.time[i], i === 0),
        weatherCode: data.daily.weather_code[i],
        tempMax: Math.round(data.daily.temperature_2m_max[i]),
        tempMin: Math.round(data.daily.temperature_2m_min[i]),
        precipitationSum: data.daily.precipitation_sum ? Math.round(data.daily.precipitation_sum[i] * 10) / 10 : 0,
        precipitationProbabilityMax: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[i] : 0,
      });
    }

    return {
      city,
      current: {
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        weatherCode: data.current.weather_code,
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m * 10) / 10,
        precipitation: data.current.precipitation || 0,
        isDay: data.current.is_day === 1,
        time: data.current.time,
      },
      hourly: hourlyItems,
      daily: dailyItems,
      lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (error) {
    console.warn('Network request failed, falling back to mock data:', error);
    return getFallbackWeatherData(city);
  }
}

/**
 * Search locations via Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<CityLocation[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return POPULAR_CITIES.filter(c => c.name.toLowerCase().includes(trimmed.toLowerCase()));
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=8&language=vi&format=json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      // Local fallback search
      return POPULAR_CITIES.filter(c => 
        c.name.toLowerCase().includes(trimmed.toLowerCase()) || 
        c.country.toLowerCase().includes(trimmed.toLowerCase())
      );
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      country: item.country || '',
      latitude: item.latitude,
      longitude: item.longitude,
      admin1: item.admin1 || '',
    }));
  } catch (error) {
    console.warn('City search failed, returning matching popular cities:', error);
    return POPULAR_CITIES.filter(c => 
      c.name.toLowerCase().includes(trimmed.toLowerCase()) || 
      c.country.toLowerCase().includes(trimmed.toLowerCase())
    );
  }
}

function findCurrentHourIndex(times: string[]): number {
  const now = new Date();
  const currentHourPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}`;
  
  const idx = times.findIndex(t => t.startsWith(currentHourPrefix));
  return idx >= 0 ? idx : 0;
}

/**
 * Fallback realistic weather data for offline mode
 */
export function getFallbackWeatherData(city: CityLocation): WeatherData {
  const isDay = true;
  const currentTemp = 28;

  const mockHourly: HourlyForecastItem[] = [];
  const baseHour = new Date().getHours();
  for (let i = 0; i < 24; i++) {
    const h = (baseHour + i) % 24;
    const hourStr = `${String(h).padStart(2, '0')}:00`;
    mockHourly.push({
      time: `2026-09-23T${hourStr}`,
      hourText: i === 0 ? 'Bây giờ' : hourStr,
      temperature: Math.round(26 + Math.sin((i / 24) * Math.PI * 2) * 5),
      weatherCode: i % 4 === 0 ? 61 : (i % 3 === 0 ? 2 : 1),
      precipitationProbability: Math.min(80, (i * 7) % 65),
      isNow: i === 0,
    });
  }

  const dayNames = ['Hôm nay', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật', 'Thứ Hai', 'Thứ Ba'];
  const mockDaily: DailyForecastItem[] = dayNames.map((name, idx) => ({
    date: `2026-09-${23 + idx}`,
    dayText: name,
    weatherCode: idx % 3 === 0 ? 61 : (idx % 2 === 0 ? 2 : 0),
    tempMax: 32 - (idx % 3),
    tempMin: 24 - (idx % 2),
    precipitationSum: idx % 3 === 0 ? 4.2 : 0.5,
    precipitationProbabilityMax: idx % 3 === 0 ? 65 : 20,
  }));

  return {
    city,
    current: {
      temperature: currentTemp,
      apparentTemperature: 30,
      weatherCode: 2,
      humidity: 78,
      windSpeed: 12.5,
      precipitation: 0,
      isDay,
      time: new Date().toISOString(),
    },
    hourly: mockHourly,
    daily: mockDaily,
    lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}
