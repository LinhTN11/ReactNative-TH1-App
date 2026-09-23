export interface WeatherInfo {
  description: string;
  icon: string;
  backgroundColor: string;
  cardColor: string;
  accentColor: string;
}

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export function getWeatherInfo(code: number, isDay: boolean = true): WeatherInfo {
  switch (code) {
    case 0:
      return {
        description: isDay ? 'Trời quang đãng' : 'Trời quang ban đêm',
        icon: isDay ? '☀️' : '🌙',
        backgroundColor: isDay ? '#1E88E5' : '#0F172A',
        cardColor: isDay ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 41, 59, 0.7)',
        accentColor: isDay ? '#FFD54F' : '#94A3B8',
      };
    case 1:
      return {
        description: isDay ? 'Nắng nhẹ' : 'Ít mây ban đêm',
        icon: isDay ? '🌤️' : '🌤️',
        backgroundColor: isDay ? '#2196F3' : '#111827',
        cardColor: isDay ? 'rgba(255, 255, 255, 0.2)' : 'rgba(31, 41, 55, 0.7)',
        accentColor: '#FBBF24',
      };
    case 2:
      return {
        description: 'Mây rải rác',
        icon: isDay ? '⛅' : '☁️',
        backgroundColor: isDay ? '#3B82F6' : '#1E293B',
        cardColor: isDay ? 'rgba(255, 255, 255, 0.2)' : 'rgba(51, 65, 85, 0.7)',
        accentColor: '#93C5FD',
      };
    case 3:
      return {
        description: 'Nhiều mây, u ám',
        icon: '☁️',
        backgroundColor: isDay ? '#475569' : '#0F172A',
        cardColor: isDay ? 'rgba(255, 255, 255, 0.15)' : 'rgba(30, 41, 59, 0.7)',
        accentColor: '#CBD5E1',
      };
    case 45:
    case 48:
      return {
        description: 'Có sương mù',
        icon: '🌫️',
        backgroundColor: '#475569',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#E2E8F0',
      };
    case 51:
    case 53:
    case 55:
      return {
        description: 'Mưa phùn nhẹ',
        icon: '🌦️',
        backgroundColor: '#334155',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#60A5FA',
      };
    case 56:
    case 57:
      return {
        description: 'Mưa phùn buốt giá',
        icon: '🌨️',
        backgroundColor: '#1E293B',
        cardColor: 'rgba(255, 255, 255, 0.15)',
        accentColor: '#93C5FD',
      };
    case 61:
      return {
        description: 'Mưa rào nhẹ',
        icon: '🌧️',
        backgroundColor: '#1E3A8A',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#38BDF8',
      };
    case 63:
      return {
        description: 'Mưa vừa',
        icon: '🌧️',
        backgroundColor: '#1E3A8A',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#38BDF8',
      };
    case 65:
      return {
        description: 'Mưa to nặng hạt',
        icon: '🌧️',
        backgroundColor: '#0F172A',
        cardColor: 'rgba(255, 255, 255, 0.15)',
        accentColor: '#0284C7',
      };
    case 66:
    case 67:
      return {
        description: 'Mưa kèm tuyết buốt',
        icon: '🌨️',
        backgroundColor: '#1E293B',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#E0F2FE',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        description: 'Có tuyết rơi',
        icon: '❄️',
        backgroundColor: '#1E293B',
        cardColor: 'rgba(255, 255, 255, 0.2)',
        accentColor: '#BAE6FD',
      };
    case 80:
    case 81:
    case 82:
      return {
        description: 'Mưa rào từng cơn',
        icon: '🌦️',
        backgroundColor: '#1E3A8A',
        cardColor: 'rgba(255, 255, 255, 0.18)',
        accentColor: '#38BDF8',
      };
    case 85:
    case 86:
      return {
        description: 'Tuyết rơi hạt lớn',
        icon: '🌨️',
        backgroundColor: '#0F172A',
        cardColor: 'rgba(255, 255, 255, 0.2)',
        accentColor: '#E0F2FE',
      };
    case 95:
      return {
        description: 'Có sấm dông',
        icon: '⛈️',
        backgroundColor: '#18181B',
        cardColor: 'rgba(255, 255, 255, 0.15)',
        accentColor: '#FACC15',
      };
    case 96:
    case 99:
      return {
        description: 'Dông bão kèm mưa đá',
        icon: '⛈️',
        backgroundColor: '#09090B',
        cardColor: 'rgba(255, 255, 255, 0.15)',
        accentColor: '#F87171',
      };
    default:
      return {
        description: isDay ? 'Có mây' : 'Trời tối',
        icon: isDay ? '⛅' : '🌙',
        backgroundColor: isDay ? '#2563EB' : '#0F172A',
        cardColor: isDay ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 41, 59, 0.7)',
        accentColor: '#93C5FD',
      };
  }
}

/**
 * Format ISO date string into Vietnamese weekday or format
 */
export function formatDayOfWeek(dateStr: string, isToday: boolean = false): string {
  if (isToday) return 'Hôm nay';
  const date = new Date(dateStr);
  const day = date.getDay();
  switch (day) {
    case 0:
      return 'Chủ Nhật';
    case 1:
      return 'Thứ Hai';
    case 2:
      return 'Thứ Ba';
    case 3:
      return 'Thứ Tư';
    case 4:
      return 'Thứ Năm';
    case 5:
      return 'Thứ Sáu';
    case 6:
      return 'Thứ Bảy';
    default:
      return dateStr;
  }
}

/**
 * Format ISO time (e.g. 2026-09-23T08:00) into 08:00
 */
export function formatHour(timeStr: string): string {
  const parts = timeStr.split('T');
  if (parts.length > 1) {
    return parts[1].substring(0, 5);
  }
  const date = new Date(timeStr);
  return `${date.getHours().toString().padStart(2, '0')}:00`;
}
