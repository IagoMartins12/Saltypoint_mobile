import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../theme/theme';
import MyText from '../../Text';
import CustomIcon from '../../CustomIcon';

const pizzaSize = [
  {
    name: 'Pizza',
    icon: <CustomIcon name="pizza" size={25} pack="Ionicons" color="#000000" />,
    id: '0',
  },
  {
    name: 'Brotinho',
    icon: <CustomIcon name="pizza" size={25} pack="Ionicons" color="#000000" />,
    id: '1',
  },
];

interface SelectProps {
  handleSizeSelect: (sizeId: string) => void;
  size: string;
}
const PizzaSize: React.FC<SelectProps> = ({handleSizeSelect, size}) => {
  return (
    <View style={styles.iconContainer}>
      {pizzaSize.map((op, i) => (
        <Pressable
          style={[
            styles.iconBox,
            {
              backgroundColor:
                op.id === size ? COLORS.secondaryRed : COLORS.primaryGray,

              borderWidth: op.id === size ? 1 : 0.5,
              borderColor: '#000000',
            },
          ]}
          key={i}
          onPress={() => handleSizeSelect(op.id)}>
          {op.icon}

          <MyText style={styles.iconText}>{op.name}</MyText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  iconBox: {
    width: '48%',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default PizzaSize;
