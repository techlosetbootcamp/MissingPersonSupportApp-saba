
import { View,Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export default function Login(prop: any) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    auth().signInWithEmailAndPassword(email,password)

.then(response => {
  Alert.alert('login successfully')
prop.navigation.navigate('Home')
console.log('response' , response)
})

.catch(error => {

  console.log('error' , error)
})


  }

  GoogleSignin.configure({
    webClientId: '305312098206-lo6d29tjpa69c5d0deecr69fab489il7.apps.googleusercontent.com',
  });



  const onGoogleButtonPress= async() => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.logo}>Findr</Text>
        <Text style={styles.subtitle}>Search for hope</Text>
        <Text style={styles.welcomeText}>Welcome Back</Text>

        <View style={styles.inputLabelContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
          <Image
              source={require('../../assets/Icon.png')}
              style={styles.icon}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              keyboardType="email-address"
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>
        </View>
        
        <Text style={styles.infoText}>Your email address is your username.</Text>

        <View style={styles.inputLabelContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
           
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              secureTextEntry
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText} >Log in</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => prop.navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Forget your password</Text>
          </TouchableOpacity>
          <Text style={styles.linkSeparator}>|</Text>

          <TouchableOpacity onPress={() => prop.navigation.navigate('Register')}>
            <Text style={styles.link}>Register for an account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.line}></View>
        </View>

        <TouchableOpacity onPress={onGoogleButtonPress}>
          <Image
            source={require('../../assets/GoogleIcon.png')}
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/LogVector.png')}
          style={styles.bottomImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    color: '#5B59FE',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#5B59FE',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 45,
    fontWeight: '700',
    color: '#0F0F0F',
    marginBottom: 30,
  },
  inputLabelContainer: {
    width: '80%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F0F0F',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#667085',
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
    width: '80%',
  },
  button: {
    width: '80%',
    height: 52,
    backgroundColor: '#5B59FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FAFAFC',
    fontSize: 23,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 21,
    fontSize: 11,
    color: '#0F0F0F',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  linkSeparator: {
    marginHorizontal: 10,
    color: '#0F0F0F',
    marginTop: 21,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding:10,
    backgroundColor:'#F2F5FF',
  },
});
