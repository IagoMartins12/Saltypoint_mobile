import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../theme/theme';
import useTheme from '../../../hooks/useTheme';
import MyText from '../../Text';

const pizzaFlavour = [
  {
    name: '1 Sabor',
    id: '0',
  },
  {
    name: '2 Sabores',
    id: '1',
  },
];

interface SelectProps {
  handleFlavourSelect: (flavourId: string | null) => void;

  flavour: string;
}
const SelectFlavour: React.FC<SelectProps> = ({
  handleFlavourSelect,
  flavour,
}) => {
  const {currentTheme} = useTheme();
  return (
    <View>
      <View
        style={[
          styles.hrStyle,
          {
            borderColor:
              currentTheme === 'dark'
                ? COLORS.borderColorDark
                : COLORS.borderColorLight,
          },
        ]}>
        <MyText>Quantos sabores? </MyText>
      </View>

      {pizzaFlavour.map((p, i) => (
        <View
          style={[
            styles.hrStyle,
            styles.flavourBox,
            {
              borderColor:
                currentTheme === 'dark'
                  ? COLORS.borderColorDark
                  : COLORS.borderColorLight,
            },
          ]}
          key={i}>
          <MyText>{p.name}</MyText>
          <TouchableOpacity
            style={[
              styles.roundedButton,
              {
                backgroundColor:
                  flavour === p.id ? COLORS.secondaryRed : COLORS.primaryGray,
              },
            ]}
            onPress={() => {
              handleFlavourSelect(p.id);
            }}>
            <View
              style={[
                styles.insideRoundedButton,
                {
                  backgroundColor:
                    flavour === p.id ? '#ffffff' : COLORS.primaryGray,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hrStyle: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  flavourBox: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  roundedButton: {
    width: 25,
    height: 25,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryRed,
  },

  insideRoundedButton: {
    width: 10,
    height: 10,
    borderRadius: 1000,
  },
});

export default SelectFlavour;
