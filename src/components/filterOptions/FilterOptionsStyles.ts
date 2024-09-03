import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {fontSize: 14, fontWeight: 'bold', color: '#000'},

  filterButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#101828', // Required for iOS shadow
    shadowOffset: {width: 0, height: 1}, // Required for iOS shadow
    shadowOpacity: 0.09, // Equivalent to #1018280F for the first shadow
    shadowRadius: 2, // Equivalent to 2px blur radius for the first shadow
    elevation: 2,
  },
  filterButtonText: {fontSize: 14, fontWeight: 'bold', color: '#344054'},
});
