import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';



export default function ForgotPassword(prop:any) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Reset email sent! Check your inbox.');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => prop.navigation.navigate('Login')}>
            <Image source={require('../../assets/Backspace.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        <Image
          source={require('../../assets/ForgotPass.png')}
          style={styles.image}
        />

        <Text style={styles.instructions}>
          Please enter the email address associated with your account. We'll
          send you a verification code to reset your password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/Icon.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Send Reset Code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 29,
    marginBottom: 56,
  },
  backButton: {
    marginRight: 10,
  },

  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000000',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 34,
  },
  instructions: {
    fontSize: 16,
    fontWeight: '400',
    color: '#222526',
    marginBottom: 24,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,

    color: '#121212',
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    height: 44,
  },
  button: {
    width: '80%',
    height: 52,
    backgroundColor: '#5B59FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FAFAFC',
    fontSize: 23,
    fontWeight: '600',
  },
});
