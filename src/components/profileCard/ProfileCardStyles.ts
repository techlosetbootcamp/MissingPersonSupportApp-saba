import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.whitish,
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: 115,
    height: 154,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
    color: colors.charcoal,
  },
  details: {
    fontFamily:'Familjen Grotesk',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '400',
    color: colors.charcoal,
  },
  detailsButton: {
    width: 93,
    marginTop: 8,
    backgroundColor: colors.skyBlue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: colors.whitish,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
