import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { CityLocation } from '../types/weather';

/**
 * Request location permission from the user
 */
async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền truy cập vị trí',
          message: 'Ứng dụng cần truy cập vị trí để hiển thị thời tiết khu vực của bạn.',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Cho phép',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  }
  // iOS handles permissions via Info.plist
  return true;
}

/**
 * Get current device location and reverse geocode to CityLocation
 */
export async function getCurrentLocation(): Promise<CityLocation | null> {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    return null;
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocode using Open-Meteo geocoding
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${latitude}&longitude=${longitude}&count=1&language=vi&format=json`;
          const response = await fetch(url);

          // Since Open-Meteo geocoding doesn't support reverse geocoding directly,
          // we'll use a simple nominatim fallback
          const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`;
          const nominatimRes = await fetch(nominatimUrl, {
            headers: { 'User-Agent': 'WeatherApp/1.0' },
          });

          if (nominatimRes.ok) {
            const data = await nominatimRes.json();
            const cityName = data.address?.city
              || data.address?.town
              || data.address?.village
              || data.address?.county
              || 'Vị trí hiện tại';
            const country = data.address?.country || '';

            resolve({
              id: 'current_location',
              name: cityName,
              country,
              latitude,
              longitude,
              admin1: data.address?.state || '',
            });
          } else {
            // Fallback: use coordinates as name
            resolve({
              id: 'current_location',
              name: 'Vị trí hiện tại',
              country: '',
              latitude,
              longitude,
              admin1: '',
            });
          }
        } catch {
          resolve({
            id: 'current_location',
            name: 'Vị trí hiện tại',
            country: '',
            latitude,
            longitude,
            admin1: '',
          });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  });
}
