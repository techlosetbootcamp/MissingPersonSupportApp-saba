import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
      // marginBottom: 30,
      left: 30,
      top: -17,
      textAlign: 'center',
    },
    welcomeText: {
      fontSize: 45,
      fontWeight: '700',
      color: '#0F0F0F',
      marginBottom: 30,
      marginTop:15,
      fontFamily:'Familjen Grotesk',
    },
    inputLabelContainer: {
      width: '80%',
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#344054',
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
      fontWeight: '400',
      fontSize: 14,
      color: '#667085',
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
      fontFamily:'Montserrat',
    },
  
  
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    link: {
      marginTop: 21,
      fontFamily:'Familjen Grotesk',
      fontSize: 11,
      color: '#0F0F0F',
      fontWeight: '400',
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
      marginBottom: 25,
      width: '80%',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#ddd',
    },
    orText: {
      fontFamily:'Familjen Grotesk',
      fontWeight: '400',
      fontSize: 16,
      color: '#0F0F0F',
      marginHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#F2F5FF',
      padding: 10,
      backgroundColor: '#F2F5FF',
    },
  });