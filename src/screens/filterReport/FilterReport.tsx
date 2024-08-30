import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import MissingPersonModal from '../../components/profileModal/ProfileModal';

type MissingPerson = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  lastSeen: string;
  lastLocation: string;
  photo: string;
};

const AllMissingPersonsScreen = ({ navigation }: any) => {
  const [profiles, setProfiles] = useState<MissingPerson[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<MissingPerson[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<MissingPerson | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          renderItem={({ item }) => (
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
          )}
          keyExtractor={item => item.id}
        />
      )}

      <MissingPersonModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        profile={selectedProfile}
      />
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
    color: '#000000',
  },
  filterButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#344054',
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
    color: '#000000',
  },
  details: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
    color: '#000000',
  },
  detailsButton: {
    width: 93,
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
});
