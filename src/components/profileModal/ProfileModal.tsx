

import React from 'react';
import { Modal, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useReportFound } from '../../hooks/useReportFound';
import { sendEmail } from '../../utils/email';

type MissingPerson = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  lastSeen: string;
  lastLocation: string;
  photo: string;
};

type MissingPersonModalProps = {
  visible: boolean;
  onClose: () => void;
  profile: MissingPerson | null;
};

const MissingPersonModal: React.FC<MissingPersonModalProps> = ({ visible, onClose, profile }) => {
  const { currentLocation, setCurrentLocation, description, setDescription, handleReportFound } =
    useReportFound(onClose, profile);

  if (!profile) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Image source={{ uri: profile.photo }} style={styles.modalImage} />
          <Text style={styles.modalName}>{profile.fullName}</Text>
          <Text style={styles.modalDetails}>
            {profile.age} Years Old {profile.gender}
          </Text>
          <Text style={styles.modalDetails}>Last Seen Time: {profile.lastSeen}</Text>
          <Text style={styles.modalDetails}>Last Seen Location: {profile.lastLocation}</Text>

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

          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: '#5046E5' }]}
            onPress={() => sendEmail('Contact Regarding Missing Person', `Details about ${profile.fullName}`)}
          >
            <Text style={styles.modalButtonText}>Contact Via Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};






const styles = StyleSheet.create({
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
    color: '#000000',
  },
  modalDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#000000',
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

export default MissingPersonModal;
