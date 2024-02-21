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
import ChangeCellphoneModal from '../../../components/Modals/ChangeCellphoneModal';

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

  const accressStep = () => {
    setStep(STEPS.ADDRESS);
  };

  const comeBack = () => {
    navigation.pop();
  };

  const addAddress = () => {
    navigation.navigate('Cep');
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <SectionTitle comeBack={comeBack} />

        <ScrollView style={styles.mainContainer}>
          <View style={styles.stepView}>
            <AddressStep addAddress={addAddress} />
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

  stepView: {
    justifyContent: 'space-between',
  },
});

export default AddressCartScreen;
