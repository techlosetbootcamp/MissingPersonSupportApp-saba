import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  reportCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.whitish,
    padding: 16,
  },
  reportImage: {
    width: 115,
    height: 154,
    borderRadius: 10,
    marginRight: 16,
  },
  reportDetails: {
    flex: 1,
  },
  reportName: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    fontWeight: '400',
    color: colors.charcoal,
  },
  reportReporter: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '400',
    color: colors.charcoal,
  },
  reportLocation: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '400',
    color: colors.charcoal,
  },
  reportDescription: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '400',
    color: colors.charcoal,
  },
  contactButton: {
    width: 101,
    marginTop: 17,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.skyBlue,
    borderRadius: 5,
  },
  contactButtonText: {
    color: colors.whitish,
    fontSize: 11,
    textAlign: 'center',
  },
});
