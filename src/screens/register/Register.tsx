
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    isSelected,
    setSelection,
   
   
    register,
   
  } = useAuth();

  const onRegister = () => {
    if (email && password && username) {
      register();
    } else {
     
      Alert.alert('Please fill in all fields');
    }
  };

 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../assets/RegVector.png')}
          style={styles.topRightImage}
          resizeMode="contain"
        />

        <Text style={styles.logoText}>Findr</Text>
        <Text style={styles.subtitle}>Join the Search for Hope</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, { color: '#101828', fontSize: 16, fontWeight: '400' }]}
            placeholder="Enter your name"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <View style={styles.inputWithIcon}>
            <Image source={require('../../assets/Icon.png')} style={styles.icon} />
            <TextInput
              style={[styles.inputField, { color: '#101828', fontSize: 16, fontWeight: '400' }]}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.helperText}>Your email address is your username.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.passwordText}>Your password must be 8 characters.</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isSelected}
            onClick={() => setSelection(!isSelected)}
            rightTextStyle={styles.checkboxLabel}
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>

        <View style={styles.leftAlignedContainer}>
          <Text style={styles.helperText}>Save my login details for next time.</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footerText}>Need Help or Have Questions?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  leftAlignedContainer: {
    width: '80%',
    alignItems: 'flex-start',
    marginLeft: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  logoText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#5B59FE',
    marginTop: 60,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',

    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  subtitle: {
    fontSize: 23,
    color: '#121212',
    marginBottom: 34,
    fontWeight: '400',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#121212',
    fontWeight: '500',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 24,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  helperText: {
    fontSize: 14,
    color: '#667085',
    marginTop: 6,

    fontWeight: '400',
  },

  passwordText: {
    fontSize: 14,
    color: '#121212',
    marginTop: 6,
    textAlign: 'left',
    fontWeight: '400',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  checkboxLabel: {
    marginLeft: 6,
    fontSize: 14,
    color: '#121212',
    fontWeight: '500',
  },
  checkboxLabel2: {
    marginLeft: 6,
    fontSize: 14,
    color: '#121212',
    fontWeight: '500',
    display: 'none',
  },
  button: {
    width: '80%',
    height: 52,
    backgroundColor: '#5B59FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#FAFAFC',
    fontSize: 23,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 16,
    color: '#5B59FE',
    marginTop: 31,
    textAlign: 'center',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Register;
