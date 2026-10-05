# 🌤️ Weather Forecast App — React Native

Ứng dụng dự báo thời tiết di động với giao diện hiện đại, sử dụng dữ liệu thực từ [Open-Meteo API](https://open-meteo.com/).

## 📸 Tính năng

### ✅ Xem thời tiết hiện tại
- Hiển thị địa điểm (hỗ trợ geolocation thiết bị)
- Nhiệt độ, trạng thái thời tiết (mô tả tiếng Việt)
- Nhiệt độ cao nhất / thấp nhất / cảm nhận
- Background hình ảnh thay đổi theo điều kiện thời tiết

### ✅ Dự báo theo giờ (24h)
- Cuộn ngang với icon thời tiết, nhiệt độ, khả năng mưa
- Trend line nhiệt độ
- Tap vào giờ để xem chi tiết đầy đủ

### ✅ Dự báo nhiều ngày (7 ngày)
- Danh sách ngày với icon ban ngày/đêm
- Nhiệt độ cao/thấp + khả năng mưa
- Tap vào ngày để xem chi tiết

### ✅ Xem thông tin chi tiết
- Màn hình chi tiết cho ngày hoặc giờ được chọn
- Hiển thị đầy đủ: nhiệt độ cảm nhận, độ ẩm, gió, UV, mưa, áp suất, tầm nhìn, điểm sương, mây
- La bàn gió SVG trực quan
- Thời gian bình minh / hoàng hôn
- Dự báo theo giờ cho ngày được chọn

### ✅ Dashboard chỉ số thời tiết
Grid 2 cột hiển thị 6 chỉ số chính:
- 🌡️ Nhiệt độ cảm nhận
- 💧 Độ ẩm
- 💨 Tốc độ gió + hướng gió
- ☀️ Chỉ số UV (với thanh tiến trình)
- 🌧️ Lượng mưa
- 📊 Áp suất khí quyển

### ✅ Các trạng thái UI
- ⏳ Loading state (animated cloud + dots)
- ❌ Error state (retry button)
- 📭 Empty state (action button)

---

## 🏗️ Kiến trúc dự án

```
MyApp/
├── App.tsx                           # Entry point (GestureHandler + SafeArea + Navigator)
├── src/
│   ├── assets/backgrounds/           # Background images (sunny, night, cloudy, rainy, snow, thunderstorm)
│   ├── components/
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx      # React Navigation Stack
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx         # Reusable glassmorphism card
│   │   │   ├── LoadingState.tsx      # Animated loading indicator
│   │   │   ├── ErrorState.tsx        # Error display + retry
│   │   │   └── EmptyState.tsx        # Empty state + action
│   │   ├── CurrentWeather.tsx        # Hero section: temperature, condition
│   │   ├── HourlyForecast.tsx        # 24h horizontal scroll (tappable)
│   │   ├── DailyForecast.tsx         # 7-day list (tappable)
│   │   ├── WeatherMetrics.tsx        # 6-metric dashboard grid
│   │   ├── WeatherInsightCard.tsx    # Temperature comparison card
│   │   ├── WeatherHeader.tsx         # Location selector + refresh
│   │   ├── CitySearchModal.tsx       # Search cities modal
│   │   ├── WindCompass.tsx           # SVG compass for wind direction
│   │   ├── WeatherIcons.tsx          # Core SVG icon set
│   │   └── WeatherIconsExtra.tsx     # Extended icons (UV, pressure, etc.)
│   ├── screens/
│   │   ├── WeatherScreen.tsx         # Main screen (home)
│   │   └── WeatherDetailScreen.tsx   # Detail screen (day/hour)
│   ├── services/
│   │   ├── weatherApi.ts             # Open-Meteo API integration
│   │   └── locationService.ts        # Device geolocation + reverse geocode
│   ├── types/
│   │   └── weather.ts                # TypeScript interfaces
│   ├── utils/
│   │   ├── weatherCodes.ts           # WMO code → description/colors
│   │   └── weatherBackgrounds.ts     # Weather condition → background image
│   └── theme/
│       └── colors.ts                 # Design system color tokens
```

---

## 🛠️ Công nghệ sử dụng

| Tech | Version | Mục đích |
|------|---------|----------|
| React Native | 0.87.0 | Framework |
| React | 19.2.3 | UI Library |
| TypeScript | 6.x | Type safety |
| @react-navigation/native | latest | Screen navigation |
| @react-navigation/stack | latest | Stack navigator |
| react-native-safe-area-context | 5.x | Safe area insets |
| react-native-svg | 15.x | SVG icon rendering |
| react-native-screens | latest | Native screen optimization |
| react-native-gesture-handler | latest | Gesture support |
| @react-native-community/geolocation | latest | Device location |

---

## 🌐 API

**Open-Meteo** (https://open-meteo.com/) — Free, no API key required.

### Endpoints sử dụng:
- `/v1/forecast` — Current + hourly + daily weather data
- `/v1/search` (geocoding) — City search

### Dữ liệu lấy:
- **Current**: temperature, humidity, wind (speed + direction + gusts), pressure, cloud cover, weather code
- **Hourly**: temperature, weather code, precipitation probability, humidity, wind, UV, visibility, pressure, dew point, cloud cover
- **Daily**: max/min temperature, precipitation, UV max, wind max, sunrise/sunset, apparent temperature

---

## 🚀 Chạy ứng dụng

```bash
# Install dependencies
npm install

# Android
npx react-native run-android

# iOS
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## 📋 Quy ước code

- **Components**: PascalCase, mỗi component 1 file
- **Services**: camelCase, xử lý API và business logic
- **Types**: Interface cho mọi data model
- **Utils**: Pure functions, không side effects
- **Theme**: Centralized design tokens
