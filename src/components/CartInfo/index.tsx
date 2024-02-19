import {View} from 'react-native';
import MyText from '../Text';

interface InfoProps {
  label: string;
  text: string;
}
const CartInfo: React.FC<InfoProps> = ({label, text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <MyText style={{fontSize: 16, fontWeight: '500'}}>{label}</MyText>
      <MyText style={{fontSize: 16, fontWeight: '300'}}>{text}</MyText>
    </View>
  );
};

export default CartInfo;
