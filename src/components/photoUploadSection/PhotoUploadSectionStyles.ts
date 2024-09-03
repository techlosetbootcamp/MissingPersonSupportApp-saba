
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Familjen Grotesk',
        marginBottom: 16,
        marginTop: 16,
      },
      photoUpload: {
        borderWidth: 2,
        borderColor: '#5A5DF6',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        height: 173,
        backgroundColor: '#FFFFFF',
        borderStyle: 'dashed', // Dashed border style
      },
      uploadContent: {
        alignItems: 'center',
      },
      uploadIcon: {
        marginBottom: 10, // Space between icon and text
      },
      uploadText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
      },
      browseText: {
        color: '#5A5DF6',
        fontSize: 16,
        fontWeight: '400',
      },
      uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
    
      format: {
        color: '#000000',
        fontSize: 11,
        fontWeight: '400',
      },
  // Add your styles here
});