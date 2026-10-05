import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { WeatherScreen } from '../../screens/WeatherScreen';
import { RootStackParamList } from '../../types/weather';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0F172A' },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Home" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
