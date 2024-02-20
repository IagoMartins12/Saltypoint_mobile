import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGlobalStore from '../hooks/store/useGlobalStore';
import MyText from '../components/Text';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import ProductCartCard from '../components/ProductCartCard';
import {global} from '../style';
import {useRef, useState} from 'react';
import ProductRecomendCard from '../components/ProductRecomendCard';
import CustomIcon from '../components/CustomIcon';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';
import CartInfo from '../components/CartInfo';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import CouponsModal from '../components/Modals/CouponsModal';
import CartStep from '../components/CartScreen/CartStep';
import CartTotalFixed from '../components/CartScreen/CartTotalFixed';
import AddressStep from '../components/CartScreen/AddressStep';

export enum STEPS {
  CART = 0,
  ADDRESS = 1,
}

const CartScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [step, setStep] = useState(STEPS.CART);
  const [modalOpen, setModalOpen] = useState(false);
  const translateY = useSharedValue(Dimensions.get('window').height);

  const cartNotEmpty = true;

  const {products} = useGlobalStore();
  const ListRef = useRef<FlatList>();

  const showModal = () => {
    console.log('chamou');
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

  const comeBack = () => {
    navigation.pop();
  };
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.mainContainer}>
          {cartNotEmpty ? (
            <View style={{flex: 1}}>
              {step === STEPS.CART ? (
                <CartStep
                  ListRef={ListRef}
                  showModal={showModal}
                  totalProducts={totalProducts}
                />
              ) : null}

              {step === STEPS.ADDRESS ? (
                <AddressStep
                  comeBack={comeBack}
                  ListRef={ListRef}
                  showModal={showModal}
                  totalProducts={totalProducts}
                />
              ) : null}

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
