import {Dimensions, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';
import {Reward} from '../../types/ModelsType';

const RewardInfo = ({reward}: {reward: Reward}) => {
  const {currentTheme} = useTheme();

  const iconSize = 22;

  const color =
    currentTheme === 'light' ? COLORS.iconColorLight : COLORS.iconColorDark;

  const checkIcon = () => {
    if (reward.name.toUpperCase().includes('CUPOM')) {
      return (
        <CustomIcon
          name="gift-sharp"
          size={iconSize}
          pack="Ionicons"
          color={color}
        />
      );
    } else if (reward.name.toUpperCase().includes('PIZZA')) {
      return (
        <CustomIcon
          name="pizza-slice"
          size={iconSize}
          pack="FontAwesome5"
          color={color}
        />
      );
    } else if (reward.name.toUpperCase().includes('BROTINHO')) {
      return (
        <CustomIcon
          name="pizza-slice"
          size={iconSize}
          pack="FontAwesome5"
          color={color}
        />
      );
    } else {
      return (
        <CustomIcon name="drink" size={iconSize} pack="Entypo" color={color} />
      );
    }
  };

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
          {checkIcon()}
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
          {reward.name}
        </MyText>
        <MyText
          style={{
            fontSize: FONTSIZE.size_14,
            fontWeight: '500',
          }}>
          Resgate com {reward.quantity_points} pontos
        </MyText>
      </View>
    </View>
  );
};

export default RewardInfo;
