import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
    const updatedValue =
      key === 'dateOfBirth' && value instanceof Date
        ? value.toISOString()
        : value;

    setFormData(prev => ({...prev, [key]: updatedValue}));
    dispatch(updateFormField({key, value: updatedValue}));
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
      const uri = response.assets[0].uri;

      if (uri) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const reference = storage().ref(filename);

        try {
          await reference.putFile(uri);
          const downloadUrl = await reference.getDownloadURL();
          handleInputChange('photo', downloadUrl);
        } catch (error) {
          Alert.alert('Upload Error', 'Failed to upload image.');
        }
      } else {
        Alert.alert('Error', 'No valid image URI found.');
      }
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
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profilesError, setProfilesError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        },
        err => {
          setProfilesError('Error fetching profiles');
          setLoading(false);
        },
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
