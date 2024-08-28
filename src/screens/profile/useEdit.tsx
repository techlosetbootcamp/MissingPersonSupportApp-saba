import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Alert, ToastAndroid } from 'react-native';

const useEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      if (currentUser) {
        // Update Name and Profile Picture
        await currentUser.updateProfile({
          displayName: name,
          photoURL: photo || currentUser.photoURL,
        });

        // Update Email
        await currentUser.updateEmail(email);

        ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
      console.log('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response?.assets?.[0]?.uri) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return {
    name, setName, email, setEmail, photo, handleSaveChanges, handleChoosePhoto, loading,
  };
};

export default useEdit;
