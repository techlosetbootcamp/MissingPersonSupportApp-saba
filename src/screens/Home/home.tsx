import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const onLogout = () => {
    auth()
      .signOut()
      .then(response => {
        console.log('response :', response);
        Alert.alert('User signed out!');
      })
      .catch(error => {
        console.log('error :', error);
        Alert.alert('Not able to logout!');
      });
  };

  return (
    <View >
      <Text >Logout Home Screen</Text>
      <TouchableOpacity onPress={onLogout} >
        <Text >Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({})
export default Home;