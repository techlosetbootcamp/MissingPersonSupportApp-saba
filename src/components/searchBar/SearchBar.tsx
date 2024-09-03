// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import {IMAGES} from '../../constants/constants';
interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or location"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
      />
      <Image source={IMAGES.search} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8 },
  searchInput: { flex: 1, height: 40 },
});
