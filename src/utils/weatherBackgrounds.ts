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
      title: isDay ? 'Nắng quang đãng' : 'Đêm quang đãng',
      subtitle: isDay ? 'Trời quang đãng' : 'Trời đêm quang đãng',
      summary: isDay
        ? 'Trời quang đãng cả ngày, tầm nhìn rất tốt.'
        : 'Đêm quang đãng nhiều sao, thời tiết dễ chịu.',
      backgroundImage: isDay
        ? require('../assets/backgrounds/sunny.jpg')
        : require('../assets/backgrounds/night.jpg'),
      overlayColor: isDay ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Mainly Clear / Partly Sunny
  if (code === 1 || code === 2) {
    return {
      title: isDay ? 'Nắng nhẹ, có mây' : 'Có mây về đêm',
      subtitle: isDay ? 'Nắng nhẹ, có mây' : 'Có mây về đêm',
      summary: isDay
        ? 'Thời tiết dễ chịu, có nắng nhẹ chan hòa.'
        : 'Gió nhẹ thoang thoảng với mây trôi về đêm.',
      backgroundImage: isDay
        ? require('../assets/backgrounds/sunny.jpg')
        : require('../assets/backgrounds/night.jpg'),
      overlayColor: isDay ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Overcast
  if (code === 3) {
    return {
      title: 'Nhiều mây, u ám',
      subtitle: 'Nhiều mây, u ám',
      summary: 'Mây che phủ hầu hết các khu vực trong ngày.',
      backgroundImage: require('../assets/backgrounds/cloudy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.25)',
    };
  }

  // Fog
  if (code === 45 || code === 48) {
    return {
      title: 'Sương mù',
      subtitle: 'Sương mù',
      summary: 'Tầm nhìn hạn chế do sương mù vào buổi sáng.',
      backgroundImage: require('../assets/backgrounds/cloudy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.3)',
    };
  }

  // Drizzle
  if (code >= 51 && code <= 57) {
    return {
      title: 'Mưa phùn',
      subtitle: 'Mưa phùn nhẹ',
      summary: 'Dự báo có mưa phùn nhẹ ngắt quãng trong ngày.',
      backgroundImage: require('../assets/backgrounds/rainy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.3)',
    };
  }

  // Rain / Showers
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      title: 'Mưa rào',
      subtitle: 'Mưa rào',
      summary: 'Khả năng có mưa rào, hãy mang theo ô khi ra ngoài.',
      backgroundImage: require('../assets/backgrounds/rainy.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.35)',
    };
  }

  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return {
      title: 'Tuyết rơi',
      subtitle: 'Tuyết rơi',
      summary: 'Nhiệt độ xuống thấp kèm theo tuyết rơi rải rác.',
      backgroundImage: require('../assets/backgrounds/snow.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.2)',
    };
  }

  // Thunderstorm
  if (code >= 95) {
    return {
      title: 'Dông bão',
      subtitle: 'Dông sét',
      summary: 'Cảnh báo có dông sét mạnh kèm mưa tại khu vực này.',
      backgroundImage: require('../assets/backgrounds/thunderstorm.jpg'),
      overlayColor: 'rgba(0, 0, 0, 0.45)',
    };
  }

  // Default fallback
  return {
    title: isDay ? 'Nắng nhẹ, có mây' : 'Đêm quang đãng',
    subtitle: isDay ? 'Thời tiết thuận lợi' : 'Trời quang về đêm',
    summary: 'Thời tiết thuận lợi, trời quang mây tạnh.',
    backgroundImage: isDay
      ? require('../assets/backgrounds/sunny.jpg')
      : require('../assets/backgrounds/night.jpg'),
    overlayColor: 'rgba(0, 0, 0, 0.2)',
  };
}
