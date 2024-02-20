import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MyText from '../../Text';
import {BORDERRADIUS, COLORS} from '../../../theme/theme';

interface CartTotalProps {
  onPress?: () => void;
}
const CartTotalFixed: React.FC<CartTotalProps> = ({onPress}) => {
  return (
    <View style={[styles.totalView, global.shadow]}>
      <View>
        <MyText style={styles.subTitleTotal}>Total</MyText>
        <MyText style={styles.titleTotal}>
          R$ 57,80
          <MyText style={styles.subTitleTotal}> / 2 itens</MyText>
        </MyText>
      </View>

      <TouchableOpacity style={styles.buttonView} onPress={onPress}>
        <Text style={{color: '#FFFFFF'}}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  totalView: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subTitleTotal: {
    fontSize: 14,
    fontWeight: '400',
  },

  titleTotal: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonView: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.secondaryRed,
  },
});

export default CartTotalFixed;
