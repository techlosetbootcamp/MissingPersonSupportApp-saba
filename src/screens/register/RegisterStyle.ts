import { StyleSheet } from "react-native";
 export const styles = StyleSheet.create({

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
      fontFamily:"Familjen Grotesk",
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
      fontFamily:"Familjen Grotesk",
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
    
      marginLeft: 6,
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
   
    footerText: {
      fontFamily:'Familjen Grotesk',
      fontSize: 16,
      color: '#5B59FE',
      marginTop: 34,
      textAlign: 'center',
      fontWeight: '400',
      textDecorationLine: 'underline',
    },
  });