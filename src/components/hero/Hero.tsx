import React from 'react';
import {View, TextInput, TouchableOpacity, Image, Text} from 'react-native';
import {useAppNavigation} from '../../utils/AppNavigation';
import {Logo} from '../../components/logo/Logo';
import {IMAGES} from '../../constants/constants';
import {styles} from './HeroStyles';
import {colors} from '../../constants/colors';
interface HeroSectionProps {
  searchQuery: string;
  handleSearchQueryChange: (text: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  handleSearchQueryChange,
}) => {
  const navigation = useAppNavigation();

  return (
    <>
      <View style={styles.header}>
        <Logo color={colors.skyBlue} size="45" />
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchQueryChange}
          />
          <TouchableOpacity>
            <Image source={IMAGES.search} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <Image source={IMAGES.banner} style={styles.bannerImage} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Profiles</Text>
        <TouchableOpacity>
          <Text
            style={styles.seeMore}
            onPress={() => navigation.navigate('FilterReport')}>
            See More
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
