import {Dimensions, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

const RewardInfo = () => {
  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        height: Dimensions.get('screen').height * 0.05,
        gap: 15,
      }}>
      <View
        style={{
          width: '15%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 40,
            borderRadius: 100,
            backgroundColor:
              currentTheme === 'light' ? COLORS.iconBgLight : COLORS.iconBgDark,
          }}>
          <CustomIcon
            name="gift-sharp"
            size={25}
            pack="Ionicons"
            color={
              currentTheme === 'light'
                ? COLORS.iconColorLight
                : COLORS.iconColorDark
            }
          />
        </View>
      </View>
      <View
        style={{
          width: '85%',
          backgroundColor: '#fffff',
        }}>
        <MyText
          style={{
            fontSize: FONTSIZE.size_16,
            fontWeight: 'bold',
          }}>
          Refrigerante Lata
        </MyText>
        <MyText
          style={{
            fontSize: FONTSIZE.size_14,
            fontWeight: '500',
          }}>
          Resgate com 150 pontos
        </MyText>
      </View>
    </View>
  );
};

export default RewardInfo;
