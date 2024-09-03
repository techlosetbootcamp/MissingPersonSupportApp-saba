import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({


    horizontalLine: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginBottom: 16,
     
    },
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
   
    title: {
      fontSize: 23,
      fontWeight: '400',
      color: '#000000',
      fontFamily: 'Familjen Grotesk',
      marginBottom: 16,
      marginTop: 16,
    },
    label: {
      color: '#000000',
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      fontSize: 16,
    },
  
    
  
    submitButton: {
      width: '50%',
      backgroundColor: '#5B59FE',
      paddingHorizontal: 17,
      paddingVertical: 7,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#FAFAFC',
      fontSize: 23,
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
    },
  
    alignButton: {
      alignItems: 'center',
    },
  
  });