import { sendEmail } from '../../utils/email'; 
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
 

type MissingPerson = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  lastSeen: string;
  lastLocation: string;
  photo: string;
};

const AllMissingPersonsScreen = ({ navigation}:any) => {
  const [profiles, setProfiles] = useState<MissingPerson[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<MissingPerson[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<MissingPerson | null>(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Reports')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        querySnapshot => {
          const profilesData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              fullName: data.fullName,
              age: data.age,
              gender: data.gender,
              lastSeen: data.lastSeen,
              lastLocation: data.lastLocation,
              photo: data.photo,
            };
          });
          setProfiles(profilesData);
          setFilteredProfiles(profilesData);
        },
        err => {
          console.error('Error fetching profiles:', err);
          setError('Error fetching profiles');
        }
      );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = profiles;

    if (selectedGender) {
      filtered = filtered.filter(profile => profile.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        profile =>
          profile.fullName.toLowerCase().includes(query) ||
          profile.lastLocation.toLowerCase().includes(query)
      );
    }

    setFilteredProfiles(filtered);
  }, [selectedGender, searchQuery, profiles]);

  const handleDetailsPress = (profile: MissingPerson) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  const handleReportFound = () => {
    if (selectedProfile && currentUser) {
      firestore()
        .collection('News')
        .add({
          fullName: selectedProfile.fullName,
          photo: selectedProfile.photo,
          currentLocation,
          description,
          reportedBy: currentUser.displayName || currentUser.email,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setModalVisible(false);
          setCurrentLocation('');
          setDescription('');
          console.log('News report added successfully!');
        })
        .catch(error => {
          console.error('Error adding news report:', error);
        });
    } else {
      console.error('No profile selected or user not logged in');
    }
  };

  const renderItem = ({ item }: { item: MissingPerson }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>Name: {item.fullName}</Text>
        <Text style={styles.details}>Age: {item.age} ({item.gender})</Text>
        <Text style={styles.details}>Last Seen: {item.lastSeen}</Text>
        <Text style={styles.details}>Last Seen Location: {item.lastLocation}</Text>
        <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetailsPress(item)}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Icon name="arrow-back" size={24} color="#000" /> */}
<Image source={require('../../assets/Backspace.png')} />

        </TouchableOpacity>
        <Text style={styles.header}>All Missing Persons</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or location"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* <Icon name="search" size={20} color="#999" style={styles.searchIcon} /> */}
        <Image source={require('../../assets/Search.png')} />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter By: </Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedGender('Male')}>
          <Text style={styles.filterButtonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedGender('Female')}>
          <Text style={styles.filterButtonText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedGender('Trans')}>
          <Text style={styles.filterButtonText}>Trans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedGender(null)}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      ) : (
        <FlatList
          data={filteredProfiles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      {selectedProfile && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              <Image source={{ uri: selectedProfile.photo }} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedProfile.fullName}</Text>
              <Text style={styles.modalDetails}>{selectedProfile.age} Years Old {selectedProfile.gender}</Text>
              <Text style={styles.modalDetails}>Last Seen Time: {selectedProfile.lastSeen}</Text>
              <Text style={styles.modalDetails}>Last Seen Location: {selectedProfile.lastLocation}</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Current Location"
                placeholderTextColor="#999"
                value={currentLocation}
                onChangeText={setCurrentLocation}
              />
              <TextInput
                style={[styles.modalInput, { height: 100 }]}
                placeholder="More Description"
                placeholderTextColor="#999"
                multiline={true}
                value={description}
                onChangeText={setDescription}
              />

              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#5046E5' }]} onPress={handleReportFound}>
                <Text style={styles.modalButtonText}>Report Found</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#5046E5' }]} onPress={() => sendEmail('Contact Regarding Missing Person', `Details about ${selectedProfile.fullName}`)}>
                <Text style={styles.modalButtonText}>Contact Via Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AllMissingPersonsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#000000',
  },
  filterButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: 8,
    paddingHorizontal: 12,
  
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#344054',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: 115,
    height: 154,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
    
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'#000000'
  },
  details: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
     color:'#000000'
  },
  detailsButton: {
    width:93,
    marginTop: 8,
    backgroundColor: '#5B59FE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '73%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  modalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'#000000',
  },
  modalDetails: {
    color:'#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: '#5B59FE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
