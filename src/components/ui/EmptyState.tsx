import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, MapPin } from '../WeatherIcons';

interface EmptyStateProps {
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'Chưa có dữ liệu thời tiết.\nHãy chọn một thành phố để bắt đầu.',
  onAction,
  actionLabel = 'Chọn thành phố',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MapPin size={42} color="rgba(255, 255, 255, 0.5)" strokeWidth={1.8} />
      </View>
      <Text style={styles.title}>Chào bạn!</Text>
      <Text style={styles.message}>{message}</Text>
      {onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction} activeOpacity={0.7}>
          <Search size={16} color="#FFFFFF" strokeWidth={2.2} />
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.45)',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#38BDF8',
    marginLeft: 8,
  },
});
