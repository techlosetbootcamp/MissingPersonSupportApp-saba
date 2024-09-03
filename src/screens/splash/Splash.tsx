

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Logo } from '../../components/logo/Logo';
import {useAppNavigation} from '../../utils/AppNavigation';
import {styles} from "./SplashStyles"
const Splash = () => {
  const navigation = useAppNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo color="#FFFFFF" size='65' />
    </View>
  );
};



export default Splash;
