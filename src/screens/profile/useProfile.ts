import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAsync } from '../../redux/slices/profileSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks/useDispatch';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { Alert } from 'react-native';

export const useProfile = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);

  const user: FirebaseAuthTypes.User | null = auth().currentUser;
  const dispatch = useAppDispatch();
  const { status, error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      setPhoto(user.photoURL);
    }
  }, [user]);

  const updateProfile = () => {
    if (user) {
      dispatch(updateProfileAsync({ name, photo }));
    }
  };

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset: Asset = response.assets[0];
        setPhoto(selectedAsset.uri || null);
      }
    });
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
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Signed Out', 'You have been signed out successfully.');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return {
    name,
    email,
    photo,
    setName,
    setPhoto,
    updateProfile,
    selectImage,
    handleSave,
    signOut,
    status,
    error,
  };
};
