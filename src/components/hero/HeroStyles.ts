import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whitish,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 16,
    width: '80%',
    borderColor: colors.bigBlack,
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
    color: colors.bigBlack,
    fontFamily: 'Familjen Grotesk',
  },
  seeMore: {
    fontFamily: 'Familjen Grotesk',
    fontSize: 16,
    color: colors.navyBlue,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
