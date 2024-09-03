import {colors} from "../../constants/colors"
import {
  
    StyleSheet,
  } from 'react-native';
 export const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
    profilesContainer: {
      margin: '5%',
      paddingHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: 'ffff',
    },
    profileCard: {
      backgroundColor: '#ffff',
      width: 200,
      marginRight: 15,
      borderRadius: 10,
    },
    profileImage: {
      width: '100%',
      height: 304,
      borderRadius: 10,
    },
    overlay: {
      flex: 1,
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    missingText: {
      backgroundColor: colors.crimson,
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: '400',
      padding: 5,
      textAlign: 'center',
      borderRadius: 5,
    },
    profileDetails: {
      fontWeight: '400',
      fontSize: 11,
      color: 'white',
      position: 'absolute',
      bottom: 34,
      padding: 16,
    },
    detailsButton: {
      backgroundColor: colors.skyBlue,
      margin: 16,
      borderRadius: 8,
      alignItems: 'center',
      width: 78,
      height: 24,
      padding: 5,
    },
    detailsButtonText: {
      color: '#fff',
      fontSize: 11,
    },
  });
  