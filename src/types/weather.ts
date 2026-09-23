export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  isDay: boolean;
  time: string;
}

export interface HourlyForecastItem {
  time: string;
  hourText: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  isNow?: boolean;
}

export interface DailyForecastItem {
  date: string;
  dayText: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax?: number;
}

export interface WeatherData {
  city: CityLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  lastUpdated: string;
}

export interface CityLocation {
  id: string | number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface WeatherTheme {
  primaryGradient: [string, string];
  cardBackground: string;
  textColor: string;
  subTextColor: string;
  icon: string;
  descriptionVi: string;
}
