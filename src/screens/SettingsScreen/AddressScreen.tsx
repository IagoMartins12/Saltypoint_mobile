import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import {COLORS} from '../../theme/theme';
import CustomIcon from '../../components/CustomIcon';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import DeleteAddressModal from '../../components/Modals/DeleteAddressModal';

import AddressCard from '../../components/AddressCard';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import MyText from '../../components/Text';
import {User_Adress} from '../../types/ModelsType';
import useShowToast from '../../hooks/customHooks/useShowToast';

const AddressScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<null | string>(null);
  const {currentTheme} = useTheme();
  const {address} = usePrivateStore();
  const translateY = useSharedValue(Dimensions.get('window').height);
  const {showToast} = useShowToast();
  const showModal = () => {
    translateY.value = withTiming(0, {duration: 500});
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  const onSwipeLeft = () => {
    navigation.navigate('Settings');
  };

  const comeBack = () => {
    navigation.navigate('Settings');
  };

  const addAddress = () => {
    navigation.navigate('Cep');
  };

  const handleOpenDeleteModal = (id: string) => {
    setCurrentAddress(id);
    setModalOpen(!modalOpen);
    showModal();
  };

  const isValid = () => {
    const addressLenght = address.filter(
      (address: User_Adress) => address.isActive === 0,
    ).length;

    if (addressLenght <= 4) return true;

    return false;
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            onSwipeLeft();
          }
        }}>
        <View style={{flex: 1}}>
          <SectionTitle comeBack={comeBack} />
          <ScrollView
            style={[
              global.mainContainer,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <View style={styles.contentContainer}>
              {address.length > 0 &&
                address
                  .filter((address: User_Adress) => address.isActive === 0)
                  .map((address, i) => (
                    <AddressCard
                      address={address}
                      handleOpenDeleteModal={handleOpenDeleteModal}
                      key={i}
                    />
                  ))}
              {address.length === 0 && (
                <MyText style={styles.emptyResultText}>
                  Sem endereço cadastrado
                </MyText>
              )}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  isValid()
                    ? addAddress()
                    : showToast(
                        'Quantidade maxima de endereços atingida!',
                        'error',
                      );

                  addAddress();
                }}>
                <CustomIcon name="plus" size={25} color="red" pack="Feather" />
                <Text style={styles.addButtonText}>Adicionar endereço</Text>
              </TouchableOpacity>

              <DeleteAddressModal
                hideModal={hideModal}
                modalOpen={modalOpen}
                translateY={translateY}
                setModalOpen={setModalOpen}
                currentAddress={currentAddress}
              />
            </View>
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 12,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '70%',
    flexDirection: 'column',
  },
  addressType: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primaryBlackHex,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.primaryBlackHex,
    fontWeight: '400',
  },
  deleteIconContainer: {
    alignSelf: 'flex-end',
    width: '10%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '100%',
  },

  emptyResultText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    cursor: 'pointer',
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
    marginLeft: 5,
  },
});
export default AddressScreen;
