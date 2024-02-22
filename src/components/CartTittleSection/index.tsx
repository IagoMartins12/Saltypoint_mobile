import {StyleSheet, View} from 'react-native';
import MyText from '../Text';
import {COLORS, FONTSIZE} from '../../theme/theme';

interface Props {
  title: string;
  secondTitle?: string;
  showModal?: (currentTarget: 'Address' | 'Cellphone') => void;
  currentTarget?: 'Address' | 'Cellphone';
}
const CartTittleSection: React.FC<Props> = ({
  showModal,
  title,
  currentTarget,
  secondTitle,
}) => {
  return (
    <View style={styles.titleView}>
      <MyText style={styles.textTittle}>{title}</MyText>

      {secondTitle ? (
        <MyText
          style={styles.redTextTittle}
          onPress={() => {
            showModal(currentTarget);
          }}>
          {secondTitle}
        </MyText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  textTittle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '600',
  },

  redTextTittle: {
    color: COLORS.secondaryRed,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
  },
});

export default CartTittleSection;
