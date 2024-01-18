import {Dimensions, StyleSheet} from 'react-native';
import {BORDERRADIUS, COLORS} from '../theme/theme';

export const global = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonStyle: {
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryRedHex,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyleWhite: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.25,
    borderRadius: BORDERRADIUS.radius_20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#130241',
    borderWidth: 1.25,
  },
});
