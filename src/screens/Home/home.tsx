import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {useHomeScreenManager} from './useHome';
import MissingPersonModal from '../../components/profileModal/ProfileModal';
import {HeroSection} from '../../components/hero/Hero';
import { IMAGES } from '../../constants/constants';

import {styles} from "./HomeStyles"

export default function HomeScreen() {
  const {
    searchQuery,
    handleSearchQueryChange,
    filteredProfiles,
    modalVisible,
    selectedProfile,
    openModal,
    closeModal,
    loading
  
  } = useHomeScreenManager();

  let error: undefined;

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      {error && (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      )}
      <HeroSection
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
      />

{loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#5A5DF6" />
        </View>
      ) : filteredProfiles.length === 0 ? (
        <Text style={styles.noDataText}>No profiles found.</Text>
      ) : (
        <ScrollView
          horizontal={true}
          style={styles.profilesContainer}
          showsHorizontalScrollIndicator={false}>
          {filteredProfiles.map(profile => (
            <View key={profile.id} style={styles.profileCard}>
              <ImageBackground
                source={{uri: profile.photo || IMAGES.kid}}
                style={styles.profileImage}
                imageStyle={{borderRadius: 10}}>
                <View style={styles.overlay}>
                  <Text style={styles.missingText}>MISSING</Text>
                  <Text style={styles.profileDetails}>
                    Name: {profile.fullName}
                    {'\n'}
                    Age: {profile.age} ({profile.gender}){'\n'}
                    Last Seen: {profile.lastSeen}
                    {'\n'}
                    Last Seen Location: {profile.lastLocation}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => openModal(profile)}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      )}

      <MissingPersonModal
        visible={modalVisible}
        onClose={closeModal}
        profile={selectedProfile}
      />
    </ScrollView>
  );
}
