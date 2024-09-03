import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      alignItems: 'center',
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    headerWrapper: {
      width: '100%', 
      alignItems: 'flex-start', 
      marginBottom: 20,
      marginLeft:30, 
    },
    image: {
      alignSelf: 'center',
      marginBottom: 34,
    },
    instructions: {
      fontFamily:'Familjen Grotesk',
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
      marginLeft: '10%', 
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
  });
  