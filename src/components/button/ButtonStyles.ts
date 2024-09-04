import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 52,
    backgroundColor: colors.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 23,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});
