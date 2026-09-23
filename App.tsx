import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WeatherScreen } from './src/screens/WeatherScreen';

function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <WeatherScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});

export default App;
