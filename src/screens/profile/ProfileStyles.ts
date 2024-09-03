import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
    
    },
    inputWithIcon: {
      flex: 1,
      height: 50,
      fontSize: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#0F0F0F'
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 69,
    },
    profileImage: {
      width: 125,
      height: 125,
      borderRadius: 62,
      marginBottom: 10,
    },
    editIcon: {
      position: 'relative',
  
        top:-40,
         left: 40,
    
    },
    inputContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    label: {
      fontWeight:'bold',
      fontSize: 14,
      color: '#344054',
      marginBottom: 6,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#5B59FE',
      paddingVertical: 15,
      borderRadius: 8,
      marginHorizontal: 20,
      marginBottom: 20,
      alignItems: 'center',
    
    },
    saveButtonText: {
    
      color: '#FAFAFC',
      fontWeight: 'bold',
      fontSize: 23,
    },
  });