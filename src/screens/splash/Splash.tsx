import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/Navigation';

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Findr</Text>
      <Text style={styles.subtitle}>Search for hope</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B59FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 64,
  

  },
  subtitle: {
    color: '#FFFFFF',
    fontFamily: 'Satisfy', 
    fontSize: 18,
    fontWeight: '400',
  
    textAlign: 'center',
 
  },
});

export default Splash;
