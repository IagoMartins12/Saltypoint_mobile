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
import {useRef, useState} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import AddressStep from '../../../components/CartScreen/AddressStep';
import CartTotalFixed from '../../../components/CartScreen/CartTotalFixed';
import CouponsModal from '../../../components/Modals/CouponsModal';
import SectionTitle from '../../../components/SectionTitle';

export enum STEPS {
  CART = 0,
  ADDRESS = 1,
}

const AddressCartScreen = ({
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
    setStep(STEPS.ADDRESS);
  };

  const comeBack = () => {
    navigation.pop();
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <SectionTitle comeBack={comeBack} />

        <ScrollView style={styles.mainContainer}>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-between',
            }}>
            <AddressStep
              comeBack={comeBack}
              ListRef={ListRef}
              showModal={showModal}
              totalProducts={totalProducts}
            />

            <CouponsModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              hideModal={hideModal}
              translateY={translateY}
            />
          </View>
        </ScrollView>
        <CartTotalFixed onPress={accressStep} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default AddressCartScreen;
