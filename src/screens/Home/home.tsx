
import React from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useCombinedHook } from '../../hooks/useReportManager'; // Import your custom hook
import MissingPersonModal from '../../components/profileModal/ProfileModal';

import { useAppNavigation } from '../../utils/AppNavigation';

export default function HomeScreen() {
  const { profiles, modalVisible, selectedProfile, openModal, closeModal } = useCombinedHook();
  const navigation = useAppNavigation();


let error:undefined;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      <View style={styles.header}>
        <Text style={styles.logo}>Findr</Text>
        <Text style={styles.subtitle}>Search for hope</Text>

        
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity>
            <Image source={require('../../assets/Search.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/Banner.png')} style={styles.bannerImage} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Profiles</Text>
        <TouchableOpacity>
          <Text
            style={styles.seeMore}
            onPress={() => navigation.navigate('FilterReport')}
          >
            See More
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} style={styles.profilesContainer} showsHorizontalScrollIndicator={false}>
        {profiles.map(profile => (
          <View key={profile.id} style={styles.profileCard}>
            <ImageBackground
              source={{ uri: profile.photo || require('../../assets/kid3.png') }}
              style={styles.profileImage}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.missingText}>MISSING</Text>
                <Text style={styles.profileDetails}>
                  Name: {profile.fullName}{"\n"}
                  Age: {profile.age} ({profile.gender}){"\n"}
                  Last Seen: {profile.lastSeen}{"\n"}
                  Location: {profile.lastLocation}
                </Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => openModal(profile)}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      <MissingPersonModal
        visible={modalVisible}
        onClose={closeModal}
        profile={selectedProfile}
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    color: '#5B59FE',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#5B59FE',
    marginBottom: 26,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '80%',
    borderColor:'#0F0F0F',
   
    borderWidth:0.5,
  
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bannerImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color:'#0F0F0F',

  },
  seeMore: {
    fontSize: 16,
    color: '#0802A3',
    fontWeight: '400',
    textDecorationLine: 'underline', 
    
  },
  profilesContainer: {
    margin: '5%',
    paddingHorizontal: 10,
    flexDirection: 'row', 
    backgroundColor: 'ffff',
    // flexShrink:0,
    // flexGrow:0,
  
  },
  profileCard: {
    backgroundColor: '#ffff',
    width: 200,
    marginRight: 15, 
    borderRadius: 10,
   
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: 304,
    borderRadius: 10,
  
  },
  overlay: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  missingText: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
  },
  profileDetails: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#5A5DF6',

    borderRadius: 8,
    alignItems: 'center',
    width:78,
    height:24,
    padding:5,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 11,
  
  },

 
});









