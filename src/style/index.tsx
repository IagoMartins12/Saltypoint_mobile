import {Dimensions, StyleSheet} from 'react-native';
import {BORDERRADIUS, COLORS} from '../theme/theme';

export const global = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
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

  notRoundedButton: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FF6347',
  },

  notRoundedButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    color: '#fff',
  },

  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    marginHorizontal: 10,
  },
});
