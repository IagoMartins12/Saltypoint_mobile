import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGlobalStore from '../hooks/store/useGlobalStore';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';

import {useRef, useState} from 'react';

import {useSharedValue, withTiming} from 'react-native-reanimated';
import CouponsModal from '../components/Modals/CouponsModal';
import CartStep from '../components/CartScreen/CartStep';
import CartTotalFixed from '../components/CartScreen/CartTotalFixed';

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

  const accressStep = () => {
    navigation.push('AddressCart');
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.mainContainer}>
          {cartNotEmpty ? (
            <View style={{flex: 1}}>
              <CartStep
                ListRef={ListRef}
                showModal={showModal}
                totalProducts={totalProducts}
              />

              <CartTotalFixed onPress={accressStep} />
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
});

export default CartScreen;
