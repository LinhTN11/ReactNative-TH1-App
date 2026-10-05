import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'normal' | 'strong';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 'normal',
}) => {
  const baseColor =
    intensity === 'light'
      ? Colors.glass.backgroundLight
      : intensity === 'strong'
        ? Colors.glass.backgroundStrong
        : Colors.glass.background;

  return (
    <View style={[styles.card, { backgroundColor: baseColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: Colors.glass.borderRadius,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
});
