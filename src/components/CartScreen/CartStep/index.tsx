import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../../CustomIcon';
import MyText from '../../Text';
import ProductRecomendCard from '../../ProductRecomendCard';
import CartInfo from '../../CartInfo';
import {Product} from '../../../types/ModelsType';
import ProductCartCard from '../../ProductCartCard';
import {COLORS} from '../../../theme/theme';
import {global} from '../../../style';

interface CartStepProps {
  totalProducts: Product[];
  showModal: () => void;
  ListRef: React.MutableRefObject<FlatList<any>>;
}
const CartStep: React.FC<CartStepProps> = ({
  totalProducts,
  showModal,
  ListRef,
}) => {
  return (
    <ScrollView style={styles.containerView}>
      <View style={[styles.productView, styles.paddingView]}>
        {totalProducts.map((p, i) => (
          <>
            <ProductCartCard product={p} key={p.id} />

            {i !== totalProducts.length - 1 ? (
              <View style={global.hrStyle} key={i} />
            ) : null}
          </>
        ))}
      </View>

      <MyText style={styles.textFlatList}> Peça também</MyText>

      <FlatList
        ref={ListRef}
        data={totalProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.paddingView, styles.flatListView]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <ProductRecomendCard product={item} />;
        }}
      />

      <View style={[styles.paddingView, styles.couponView]}>
        <View style={styles.couponContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.couponIcon}>
              <CustomIcon
                name="ticket-outline"
                pack="Ionicons"
                size={15}
                color="#000000"
              />
            </View>

            <View>
              <MyText style={styles.couponTitle}>Cupom / Recompensa</MyText>
              <MyText style={styles.couponSubTitle}>Digite um código</MyText>
            </View>
          </View>

          <Text style={styles.addText} onPress={showModal}>
            Adicionar
          </Text>
        </View>
      </View>

      <View style={[styles.paddingView, styles.couponView]}>
        <CartInfo label="Subtotal" text="R$ 57,80" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerView: {},
  productView: {
    backgroundColor: '#FFFFFF',

    gap: 10,
  },

  textFlatList: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 20,
  },

  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  flatListView: {
    gap: 10,
  },

  couponView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  couponIcon: {
    height: 25,
    width: 25,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfcfcfFF',
  },

  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  couponTitle: {
    fontSize: 15,
    fontWeight: '500',
  },

  couponSubTitle: {
    fontSize: 14,
    fontWeight: '300',
  },

  addText: {
    fontSize: 15,
    color: COLORS.secondaryRed,
    fontWeight: '700',
  },

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
});

export default CartStep;
