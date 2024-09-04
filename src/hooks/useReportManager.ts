import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useAppDispatch} from './useDispatch';
import {RootState} from '../redux/store';
import {
  updateFormField,
  submitReport,
  resetForm,
} from '../redux/slices/reportFormSlice';
import {
  fetchReports,
  setSearchQuery,
  setSelectedGender,
  filterProfiles,
} from '../redux/slices/filterReportSlice';
import {useAppNavigation} from '../utils/AppNavigation';
import {ToastAndroid} from 'react-native';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {Profile} from '../types/types';

export function useCombinedHook() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: new Date().toISOString(),
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

  const handleInputChange = (
    key: keyof typeof formData,
    value: string | Date | number | null,
  ) => {
    setFormData(prev => ({...prev, [key]: value}));
    dispatch(updateFormField({key, value}));
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || new Date(formData?.dateOfBirth);
    const isoString = currentDate.toISOString();
    handleInputChange('dateOfBirth', isoString);
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
    const {
      fullName,
      gender,
      dateOfBirth,
      lastSeen,
      lastLocation,
      height,
      weight,
      eyeColor,
      hairColor,
      hairLength,
      nickname,
      photo,
    } = formData;

    if (
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !lastSeen ||
      !lastLocation ||
      !height ||
      !weight ||
      !eyeColor ||
      !hairColor ||
      !nickname ||
      !hairLength ||
      !photo
    ) {
      ToastAndroid.show('Please fill all required fields.', ToastAndroid.LONG);
      return;
    }

    try {
      await dispatch(submitReport(formData)).unwrap();

      ToastAndroid.show(
        'Missing person report has been submitted.',
        ToastAndroid.LONG,
      );
      navigation.navigate('Home');
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

  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profilesError, setProfilesError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('Reports')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        querySnapshot => {
          const profilesData = querySnapshot.docs.map(doc => ({
            unique: doc.id,
            ...(doc.data() as Profile),
          }));
          setProfiles(profilesData);
          setLoading(false);
        },
        err => {
          setProfilesError('Error fetching profiles');
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  const openModal = (profile: Profile) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProfile(null);
  };

  const {filteredProfiles, selectedGender, searchQuery} = useSelector(
    (state: RootState) => state.filterReport,
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
    loading,
    handleSearchQueryChange,
    handleGenderChange,
  };
}
