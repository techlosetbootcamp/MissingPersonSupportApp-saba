import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAsync } from '../../redux/slices/profileSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks/useDispatch';
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

  return {
    name,
    email,
    photo,
    setName,
    setPhoto,
    updateProfile,
    status,
    error,
  };
};
