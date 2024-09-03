
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      marginTop: 10,
      paddingHorizontal: 16,
      width: '80%',
      borderColor: '#0F0F0F',
      borderWidth: 0.5,
    },
    header: {
      alignItems: 'center',
      marginVertical: 20,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    bannerContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    bannerImage: {
      width: '90%',
      height: 200,
      borderRadius: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 23,
      fontWeight: '400',
      color: '#0F0F0F',
      fontFamily: 'Familjen Grotesk',
    },
    seeMore: {
      fontFamily: 'Familjen Grotesk',
      fontSize: 16,
      color: '#0802A3',
      fontWeight: '400',
      textDecorationLine: 'underline',
    },
  });