import { ImageSourcePropType } from 'react-native';

export interface WeatherConditionDisplay {
  title: string;
  subtitle: string;
  summary: string;
  backgroundImage: ImageSourcePropType;
  overlayColor: string;
}

/**
 * Returns weather display configuration and background image based on WMO code
 */
export function getWeatherDisplay(code: number, isDay: boolean = true): WeatherConditionDisplay {
  // Clear Sky
  if (code === 0) {
    return {
      title: isDay ? 'Sunny' : 'Clear Night',
      subtitle: isDay ? 'Trời quang đãng' : 'Trời đêm quang đãng',
      summary: isDay
        ? 'You can see clear skies all day.'
        : 'Clear starry night with pleasant temperature.',
      backgroundImage: isDay
        ? require('../assets/backgrounds/sunny.jpg')
        : require('../assets/backgrounds/night.jpg'),
      overlayColor: isDay ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Mainly Clear / Partly Sunny
  if (code === 1 || code === 2) {
    return {
      title: isDay ? 'Partly Sunny' : 'Partly Cloudy',
      subtitle: isDay ? 'Nắng nhẹ, có mây' : 'Có mây về đêm',
      summary: isDay
        ? 'Pleasant conditions with gentle sunshine.'
        : 'Cool breeze with passing clouds tonight.',
      backgroundImage: isDay
        ? require('../assets/backgrounds/sunny.jpg')
        : require('../assets/backgrounds/night.jpg'),
      overlayColor: isDay ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Overcast
  if (code === 3) {
    return {
      title: 'Overcast',
      subtitle: 'Nhiều mây, u ám',
      summary: 'Cloudy skies prevailing throughout the region.',
      backgroundImage: require('../assets/backgrounds/cloudy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.25)',
    };
  }

  // Fog
  if (code === 45 || code === 48) {
    return {
      title: 'Foggy',
      subtitle: 'Sương mù',
      summary: 'Reduced visibility due to morning mist and fog.',
      backgroundImage: require('../assets/backgrounds/cloudy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.3)',
    };
  }

  // Drizzle
  if (code >= 51 && code <= 57) {
    return {
      title: 'Drizzle',
      subtitle: 'Mưa phùn nhẹ',
      summary: 'Light drizzle expected intermittently.',
      backgroundImage: require('../assets/backgrounds/rainy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.3)',
    };
  }

  // Rain / Showers
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      title: 'Rain Showers',
      subtitle: 'Mưa rào',
      summary: 'Rain showers likely, carry an umbrella when heading out.',
      backgroundImage: require('../assets/backgrounds/rainy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return {
      title: 'Snowfall',
      subtitle: 'Tuyết rơi',
      summary: 'Cold temperatures with light snow falling.',
      backgroundImage: require('../assets/backgrounds/snow.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.2)',
    };
  }

  // Thunderstorm
  if (code >= 95) {
    return {
      title: 'Thunderstorm',
      subtitle: 'Dông sét',
      summary: 'Severe thunderstorm warning in this area.',
      backgroundImage: require('../assets/backgrounds/thunderstorm.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.45)',
    };
  }

  // Default fallback
  return {
    title: isDay ? 'Partly Sunny' : 'Clear Night',
    subtitle: isDay ? 'Thời tiết thuận lợi' : 'Trời quang về đêm',
    summary: 'You can see clear skies all day.',
    backgroundImage: isDay
      ? require('../assets/backgrounds/sunny.jpg')
      : require('../assets/backgrounds/night.jpg'),
    overlayColor: 'rgba(0, 0, 0, 0.2)',
  };
}
