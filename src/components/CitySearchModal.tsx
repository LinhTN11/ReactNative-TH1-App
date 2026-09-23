import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { CityLocation } from '../types/weather';
import { POPULAR_CITIES, searchCities } from '../services/weatherApi';
import { Search, X, MapPin } from './WeatherIcons';

interface CitySearchModalProps {
  visible: boolean;
  currentCity: CityLocation;
  onClose: () => void;
  onSelectCity: (city: CityLocation) => void;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  visible,
  currentCity,
  onClose,
  onSelectCity,
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityLocation[]>(POPULAR_CITIES);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setSearchResults(POPULAR_CITIES);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCities(text);
      setSearchResults(results);
    } catch {
      // Keep existing list on error
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (city: CityLocation) => {
    onSelectCity(city);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Apple iOS Grabber Handle */}
          <View style={styles.grabber} />

          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Thời tiết</Text>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Xong</Text>
            </TouchableOpacity>
          </View>

          {/* iOS Style Search Box */}
          <View style={styles.searchBox}>
            <Search size={17} color="rgba(255, 255, 255, 0.6)" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Tìm theo tên thành phố..."
              placeholderTextColor="rgba(255, 255, 255, 0.45)"
              value={query}
              onChangeText={handleSearch}
              autoFocus={false}
              autoCapitalize="words"
            />
            {query.length > 0 ? (
              <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearBtn}>
                <View style={styles.clearCircle}>
                  <X size={12} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Subtitle */}
          <Text style={styles.sectionSubtitle}>
            {query.trim().length > 0 ? 'KẾT QUẢ TÌM KIẾM' : 'ĐỊA ĐIỂM PHỔ BIẾN'}
          </Text>

          {/* Results List - Apple Card Style */}
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#38BDF8" />
              <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.name === currentCity.name;
                return (
                  <TouchableOpacity
                    style={[styles.cityCard, isSelected && styles.selectedCityCard]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cardLeft}>
                      <Text style={styles.cityName}>{item.name}</Text>
                      <Text style={styles.citySubtext} numberOfLines={1}>
                        {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                      </Text>
                    </View>

                    <View style={styles.cardRight}>
                      {isSelected ? (
                        <View style={styles.currentBadge}>
                          <MapPin size={13} color="#38BDF8" style={styles.badgePin} />
                          <Text style={styles.currentBadgeText}>Đang xem</Text>
                        </View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Không tìm thấy thành phố phù hợp</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 36,
    maxHeight: '88%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  grabber: {
    width: 38,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  cancelBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#38BDF8',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 15,
  },
  clearBtn: {
    padding: 4,
  },
  clearCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.55)',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCityCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.45)',
  },
  cardLeft: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  citySubtext: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  badgePin: {
    marginRight: 4,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
