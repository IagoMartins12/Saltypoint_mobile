import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useTheme from '../../hooks/useTheme';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import LoadingIndicator from '../Loading';

interface Props {
  goToLogin: () => void;
}
const NoAuth: React.FC<Props> = ({goToLogin}) => {
  const {currentTheme} = useTheme();
  const {products} = useGlobalStore();
  return (
    <View
      style={[
        styles.EmptyCartContainer,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        },
      ]}>
      <MyText style={{textAlign: 'center', fontSize: 22}}>
        Faça o login para acessar.
      </MyText>

      <TouchableOpacity
        onPress={goToLogin}
        disabled={!products ? true : false}
        style={[
          styles.ButtonStyle,
          {
            backgroundColor:
              currentTheme === 'light'
                ? '#e2e2e2c0'
                : COLORS.secondBackgroundDark,
          },
        ]}>
        {!products ? (
          <LoadingIndicator />
        ) : (
          <MyText
            style={{
              textAlign: 'center',
              fontSize: 18,
            }}>
            Fazer login
          </MyText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  LottieStyle: {
    height: 400,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },

  ButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BORDERRADIUS.radius_10,
  },
});

export default NoAuth;
