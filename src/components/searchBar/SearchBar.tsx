import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {IMAGES} from '../../constants/constants';
import {styles} from './SearchBarStyles';
import {colors} from '../../constants/colors';
import {SearchBarProps} from '../../types/types';

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or location"
        placeholderTextColor={colors.bigBlack}
        value={value}
        onChangeText={onChange}
      />
      <Image source={IMAGES?.search} />
    </View>
  );
};

export default SearchBar;
