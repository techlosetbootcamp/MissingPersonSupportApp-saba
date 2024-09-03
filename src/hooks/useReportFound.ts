// hooks/useReportFound.ts
import { useState } from 'react';
import { useAppDispatch } from './useDispatch'; // Adjust based on your project structure
import { addNewsReport } from '../redux/slices/newsSlice';
import auth from '@react-native-firebase/auth';
import {useAppNavigation} from '../utils/AppNavigation';
type MissingPerson = {
    id: string;
    fullName: string;
    age: number;
    gender: string;
    lastSeen: string;
    lastLocation: string;
    photo: string;
  };
export const useReportFound = (onClose: () => void, profile: MissingPerson | null) => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const currentUser = auth().currentUser;
  const navigation = useAppNavigation();
  const resetFields = () => {
    setCurrentLocation('');
    setDescription('');
  };

  const handleReportFound = () => {
    if (profile && currentUser) {
      dispatch(
        addNewsReport({
          fullName: profile.fullName,
          photo: profile.photo,
          currentLocation,
          description,
          reportedBy: currentUser.displayName || currentUser.email,
        })
      )
        .then(() => {
          onClose();
          resetFields();
          console.log('News report added successfully!');
          navigation.navigate("News")
        })
        .catch((error) => {
          console.error('Error adding news report:', error);
        });
    } else {
      console.error('No profile selected or user not logged in');
    }
  };

  return {
    currentLocation,
    setCurrentLocation,
    description,
    setDescription,
    handleReportFound,
  };
};
