// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParams } from '../../navigation/Navigation';
// const { width } = Dimensions.get('window');

// const EditProfileScreen: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [photo, setPhoto] = useState<string | null>(null);

//   const user: FirebaseAuthTypes.User | null = auth().currentUser;
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
//   useEffect(() => {
//     if (user) {
//       setName(user.displayName || '');
//       setEmail(user.email || '');
//       setPhoto(user.photoURL);
//     }
//   }, [user]);

//   const selectImage = () => {
//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.error('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const selectedAsset: Asset = response.assets[0];
//         setPhoto(selectedAsset.uri || null);
//       }
//     });
//   };

//   const updateProfile = () => {
//     if (user) {
//       user.updateProfile({
//         displayName: name,
//         photoURL: photo,
//       })
//         .then(() => {
//           Alert.alert('Success', 'Profile updated successfully.');
//         })
//         .catch((error) => {
//           Alert.alert('Error', error.message);
//         });
//     }
//   };

//   const signOut = () => {
//     auth()
//       .signOut()
//       .then(() => {
//         Alert.alert('Signed Out', 'You have been signed out successfully.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Icons and Text */}
//       <View style={styles.header}>
//         <TouchableOpacity     onPress={() => navigation.navigate('FilterReport')}>
//           <Image source={require('../../assets/Backspace.png')} 
//         />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Edit Profile</Text>
//         <TouchableOpacity onPress={signOut}>
//           <Image source={require('../../assets/Logout.png')} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView >
//         {/* Profile Image with Edit Icon */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={photo ? { uri: photo } : require('../../assets/kid3.png')} // Default image path
//             style={styles.profileImage}
//           />
//           <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
//             <Image source={require('../../assets/Edit.png')} />
//           </TouchableOpacity>
//         </View>

//         {/* Name Field */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//             placeholder="Name"
//           />
//         </View>

//         {/* Email Field */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={email}
//             editable={false} // Email is not editable
//             placeholder="Email"
//           />
//         </View>
//       </ScrollView>

//       {/* Save Button at the Bottom */}
//       <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
//         <Text style={styles.saveButtonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/Navigation';
import { useProfile } from './useProfile';

const { width } = Dimensions.get('window');

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    name,
    email,
    photo,
    setName,
    setPhoto,
    updateProfile,
    status,
    error,
  } = useProfile();

  const selectImage = () => {
    // Your image picker logic here
  };

  const handleSave = () => {
    updateProfile();
    if (status === 'succeeded') {
      Alert.alert('Success', 'Profile updated successfully.');
    } else if (status === 'failed') {
      Alert.alert('Error', error || 'Failed to update profile.');
    }
  };

  const signOut = () => {
    // Your sign-out logic here
  };

  return (
    <View style={styles.container}>
      {/* Header with Icons and Text */}
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
        {/* Profile Image with Edit Icon */}
        <View style={styles.imageContainer}>
          <Image
            source={photo ? { uri: photo } : require('../../assets/kid3.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
            <Image source={require('../../assets/Edit.png')} />
          </TouchableOpacity>
        </View>

        {/* Name Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>

        {/* Email Field */}
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

      {/* Save Button at the Bottom */}
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
