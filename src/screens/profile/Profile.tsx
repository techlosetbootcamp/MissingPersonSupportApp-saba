
import { useProfile } from './useProfile';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/Navigation';

const { width } = Dimensions.get('window');

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    name,
    email,
    photo,
    setName,
    selectImage,
    handleSave,
    signOut,
  } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FilterReport')}>
          <Image source={require('../../assets/Backspace.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <TouchableOpacity onPress={signOut}>
          <Image source={require('../../assets/Logout.png')} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={photo ? { uri: photo } : require('../../assets/kid3.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
            <Image source={require('../../assets/Edit.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={false}
            placeholder="Email"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

 


 


export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#0F0F0F'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 69,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62,
    marginBottom: 10,
  },
  editIcon: {
    position: 'relative',

      top:-40,
       left: 40,
  
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight:'bold',
    fontSize: 14,
    color: '#344054',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#5B59FE',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  
  },
  saveButtonText: {
  
    color: '#FAFAFC',
    fontWeight: 'bold',
    fontSize: 23,
  },
});
