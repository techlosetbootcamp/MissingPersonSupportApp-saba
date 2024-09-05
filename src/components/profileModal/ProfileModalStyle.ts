import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
  },
  modalContent: {
    width: '90%',
    height: '73%',
    backgroundColor: colors.whitish,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },

  modalDetails: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
    textAlign: 'center',
    color: colors.charcoal,
    fontFamily: 'Familjen Grotesk',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: colors.charcoal,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: colors.whitish,

    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.skyBlue,
  },

  modalButtonText: {
    color: colors.skyBlue,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  modalButtonReport: {
    color: colors.whitish,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  buttonAlign: {
    marginTop: '20%',
  },
});
