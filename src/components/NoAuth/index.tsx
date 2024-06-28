import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useTheme from '../../hooks/useTheme';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';

interface Props {
  goToLogin: () => void;
}
const NoAuth: React.FC<Props> = ({goToLogin}) => {
  const {currentTheme} = useTheme();
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
        style={[
          styles.ButtonStyle,
          {
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.backgroundColorDark
                : COLORS.backgroundColorLight,
          },
        ]}>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: COLORS.backgroundColorDark,
          }}>
          Fazer login
        </MyText>
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
