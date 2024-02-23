import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import EmptyAnimation from '../../components/Lottie/EmptyAnimation';
import {useRef, useState} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import CouponsModal from '../../components/Modals/CouponsModal';
import CartTotalFixed from '../../components/CartScreen/CartTotalFixed';
import MyText from '../../components/Text';
import CustomIcon from '../../components/CustomIcon';
import ProductRecomendCard from '../../components/ProductRecomendCard';
import ProductCartCard from '../../components/ProductCartCard';
import CartInfo from '../../components/CartInfo';
import {COLORS} from '../../theme/theme';
import {global} from '../../style';

const CartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const translateY = useSharedValue(Dimensions.get('window').height);

  const cartNotEmpty = true;

  const {products} = useGlobalStore();
  const ListRef = useRef<FlatList>();

  const showModal = () => {
    translateY.value = withTiming(0, {duration: 500});
    setModalOpen(true);
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  const totalProducts = products.slice(0, 4);
  const totalProducts2 = products.slice(5, 9);

  const accressStep = () => {
    navigation.push('AddressCart');
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.mainContainer}>
          {cartNotEmpty ? (
            <View style={{flex: 1}}>
              <ScrollView>
                {/* Cart Products  */}
                <View style={[styles.productView, styles.paddingView]}>
                  {totalProducts.map((p, i) => (
                    <View key={i}>
                      <ProductCartCard product={p} />

                      {i !== totalProducts.length - 1 ? (
                        <View style={global.hrStyle} />
                      ) : null}
                    </View>
                  ))}
                </View>

                <MyText style={styles.textFlatList}> Peça também</MyText>

                {/* Cart Recomendations  */}
                <FlatList
                  ref={ListRef}
                  data={totalProducts2}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.paddingView,
                    styles.flatListView,
                  ]}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return <ProductRecomendCard product={item} key={item.id} />;
                  }}
                />

                {/* Cart coupons  */}
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
                        <MyText style={styles.couponTitle}>
                          Cupom / Recompensa
                        </MyText>
                        <MyText style={styles.couponSubTitle}>
                          Digite um código
                        </MyText>
                      </View>
                    </View>

                    <MyText style={styles.addText} onPress={showModal}>
                      Adicionar
                    </MyText>
                  </View>
                </View>

                {/* Cart infos  */}
                <View style={[styles.paddingView, styles.couponView]}>
                  <CartInfo label="Subtotal" text="R$ 57,80" />
                </View>
              </ScrollView>

              <CartTotalFixed
                onPress={accressStep}
                quantity={2}
                value={57}
                title="Total"
              />
              <CouponsModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                hideModal={hideModal}
                translateY={translateY}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <EmptyAnimation text="Sem produtos no carrinho" />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 50,
  },
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

export default CartScreen;
