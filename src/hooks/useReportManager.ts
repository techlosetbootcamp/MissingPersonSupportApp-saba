import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useDispatch'; // Adjust the path as needed
import { RootState } from '../redux/store'; // Adjust the path as needed
import { updateFormField, submitReport, resetForm } from '../redux/slices/reportFormSlice';
import { fetchReports, setSearchQuery, setSelectedGender, filterProfiles } from '../redux/slices/filterReportSlice';

export function useCombinedHook() {
  const dispatch = useAppDispatch();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: new Date().toISOString(), // Store date as string
    nickname: '',
    height: '',
    weight: '',
    eyeColor: '',
    hairColor: '',
    hairLength: '',
    photo: null as string | null,
    lastSeen: '',
    lastLocation: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleInputChange = (key: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    dispatch(updateFormField({ key, value }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date(formData.dateOfBirth);
    const isoString = currentDate.toISOString();
    handleInputChange('dateOfBirth', isoString); // Store as ISO string
    setShowDatePicker(false);
  };

  const selectPhoto = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (response.assets && response.assets.length > 0) {
      handleInputChange('photo', response.assets[0].uri || null);
    }
  };

  const submitReportForm = async () => {
    const { fullName, gender, dateOfBirth, lastSeen, lastLocation, height, weight, eyeColor, hairColor, hairLength, nickname, photo } = formData;

    if (!fullName || !gender || !dateOfBirth || !lastSeen || !lastLocation || !height || !weight || !eyeColor || !hairColor || !nickname || !hairLength || !photo) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      await dispatch(submitReport(formData)).unwrap();
      Alert.alert('Success', 'Missing person report has been submitted.');

      dispatch(resetForm());
      setFormData({
        fullName: '',
        gender: '',
        dateOfBirth: new Date().toISOString(),
        nickname: '',
        lastLocation: '',
        lastSeen: '',
        height: '',
        weight: '',
        eyeColor: '',
        hairColor: '',
        hairLength: '',
        photo: null,
      });
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  };

  // Profiles state
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profilesError, setProfilesError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Reports')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        querySnapshot => {
          const profilesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProfiles(profilesData);
        },
        err => {
          console.error('Error fetching profiles:', err);
          setProfilesError('Error fetching profiles');
        }
      );

    return () => unsubscribe();
  }, []);

  const openModal = (profile: any) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProfile(null);
  };

  // Filter state
  const { filteredProfiles, selectedGender, searchQuery } = useSelector(
    (state: RootState) => state.filterReport
  );

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(filterProfiles());
  };

  const handleGenderChange = (gender: string | null) => {
    dispatch(setSelectedGender(gender));
    dispatch(filterProfiles());
  };

  return {
    formData,
    showDatePicker,
    setShowDatePicker,
    showPicker,
    setShowPicker,
    date,
    setDate,
    handleInputChange,
    handleDateChange,
    selectPhoto,
    submitReport: submitReportForm,
    profiles,
    profilesError,
    modalVisible,
    selectedProfile,
    openModal,
    closeModal,
    filteredProfiles,
    selectedGender,
    searchQuery,
   
    handleSearchQueryChange,
    handleGenderChange,
  };
}
