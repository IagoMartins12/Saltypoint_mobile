import {Dimensions, Text, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';

const RewardInfo = () => {
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
            backgroundColor: '#f0efef',
          }}>
          <CustomIcon
            name="gift-sharp"
            size={25}
            pack="Ionicons"
            color={COLORS.primaryBlackHex}
          />
        </View>
      </View>
      <View
        style={{
          width: '85%',
          backgroundColor: '#fffff',
        }}>
        <Text
          style={{
            fontSize: FONTSIZE.size_16,
            fontWeight: 'bold',
            color: COLORS.primaryBlackHex,
          }}>
          Refrigerante Lata
        </Text>
        <Text
          style={{
            fontSize: FONTSIZE.size_14,
            fontWeight: '500',
            color: COLORS.primaryBlackHex,
          }}>
          Resgate com 150 pontos
        </Text>
      </View>
    </View>
  );
};

export default RewardInfo;
