// ProfileCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ProfileCardProps {
  profile: {
    id: string;
    fullName: string;
    age: number;
    gender: string;
    lastSeen: string;
    lastLocation: string;
    photo: string;
  };
  onPress: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>Name: {profile.fullName}</Text>
        <Text style={styles.details}>
          Age: {profile.age} ({profile.gender})
        </Text>
        <Text style={styles.details}>Last Seen: {profile.lastSeen}</Text>
        <Text style={styles.details}>
          Last Seen Location: {profile.lastLocation}
        </Text>
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
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
