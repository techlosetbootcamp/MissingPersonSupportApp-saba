import {StyleSheet,Dimensions} from 'react-native';
import {colors} from '../../constants/colors';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: colors.charcoal,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.whitish,
  },

  title: {
    fontSize: 23,
    fontWeight: '400',
    color: colors.charcoal,
    fontFamily: 'Familjen Grotesk',
    marginBottom: 16,
    marginTop: 16,
  },
  label: {
    color: colors.charcoal,
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },

  submitButton: {
     width: width * 0.6,
    backgroundColor: colors.skyBlue,
    paddingHorizontal: 17,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.buttonText,
   fontSize: width > 350 ? 23 : 18,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },

  alignButton: {
    alignItems: 'center',
  },
});
