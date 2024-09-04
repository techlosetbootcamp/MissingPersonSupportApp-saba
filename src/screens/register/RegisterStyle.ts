import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  leftAlignedContainer: {
    width: '80%',
    alignItems: 'flex-start',
    marginLeft: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.whitish,
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
    color: colors.skyBlue,
    marginTop: 60,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Familjen Grotesk',
  },
  input: {
    width: '100%',

    borderWidth: 1,
    borderColor: colors.ashGray,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  subtitle: {
    fontFamily: 'Familjen Grotesk',
    fontSize: 23,
    color: colors.jetBlack,
    marginBottom: 34,
    fontWeight: '400',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.jetBlack,
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
    color: colors.slateGray,

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
    color: colors.jetBlack,
    fontWeight: '500',
  },

  footerText: {
    fontFamily: 'Familjen Grotesk',
    fontSize: 16,
    color: colors.skyBlue,
    marginTop: 34,
    textAlign: 'center',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
