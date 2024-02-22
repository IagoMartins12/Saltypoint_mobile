import {View} from 'react-native';
import MyText from '../Text';
import {COLORS} from '../../theme/theme';

interface InfoProps {
  label: string;
  text: string;
  color?: 'green' | 'red';
  boldText?: boolean;
}
const CartInfo: React.FC<InfoProps> = ({label, text, color, boldText}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <MyText
        style={{
          fontSize: boldText ? 20 : 16,
          fontWeight: boldText ? '600' : '400',
        }}>
        {label}
      </MyText>
      <MyText
        style={{
          fontSize: boldText ? 18 : 16,
          fontWeight: color === 'green' || boldText ? '600' : '300',
          color:
            color === 'green' ? COLORS.primaryGreenHex : COLORS.primaryBlackHex,
        }}>
        {text}
      </MyText>
    </View>
  );
};

export default CartInfo;
