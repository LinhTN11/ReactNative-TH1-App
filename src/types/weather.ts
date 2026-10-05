export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  isDay: boolean;
  time: string;
  // Extended metrics
  uvIndex?: number;
  pressure?: number;
  visibility?: number;
  dewPoint?: number;
  cloudCover?: number;
  windGusts?: number;
}

export interface HourlyForecastItem {
  time: string;
  hourText: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  isNow?: boolean;
  // Extended
  humidity?: number;
  windSpeed?: number;
  windDirection?: number;
  uvIndex?: number;
  apparentTemperature?: number;
  precipitation?: number;
  visibility?: number;
  pressure?: number;
  dewPoint?: number;
  cloudCover?: number;
}

export interface DailyForecastItem {
  date: string;
  dayText: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax?: number;
  // Extended
  sunrise?: string;
  sunset?: string;
  uvIndexMax?: number;
  windSpeedMax?: number;
  windDirectionDominant?: number;
  precipitationHours?: number;
  apparentTempMax?: number;
  apparentTempMin?: number;
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

/** Navigation param list for type-safe routing */
export type RootStackParamList = {
  Home: undefined;
  WeatherDetail: {
    weatherData: WeatherData;
    selectedDayIndex?: number;
    selectedHourIndex?: number;
  };
};
