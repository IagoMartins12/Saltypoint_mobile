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
import ForgetPasswordModal from '../../components/Modals/ForgetPasswordModal';
import ContactModal from '../../components/Modals/ContactModal';

const AddressScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const translateY = useSharedValue(Dimensions.get('window').height);

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
    navigation.pop();
  };

  const address = [
    {
      isActive: 1,
      id: '0',
      type_adress: 0,
      address: 'Estrada de ligação',
      number: 22,
      district: 'Sol nascente',
      city: 'São Paulo',
      uf: 'SP',
      reference: 'Ao lado da farmacia',
    },
    {
      isActive: 1,
      id: '1',
      type_adress: 1,
      address: 'Estrada de ligação',
      number: 22,
      district: 'Sol nascente',
      city: 'São Paulo',
      uf: 'SP',
    },
  ];

  const handleOpenDeleteModal = (id: string) => {
    setModalOpen(!modalOpen);
    showModal();
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
          <View style={{flex: 0.09, backgroundColor: COLORS.primaryBlackHex}}>
            <SectionTitle comeBack={comeBack} />
          </View>
          <ScrollView style={global.mainContainer}>
            <View style={styles.contentContainer}>
              {address.length > 0 &&
                address.map((address, i) => (
                  <View key={i} style={styles.addressItem}>
                    <View style={styles.iconContainer}>
                      {address.type_adress === 0 ? (
                        <CustomIcon
                          name="home"
                          size={30}
                          color="#000000"
                          pack="Feather"
                        />
                      ) : (
                        <CustomIcon
                          name="briefcase"
                          size={30}
                          color="#000000"
                          pack="Feather"
                        />
                      )}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.addressType}>
                        {address.type_adress === 0 ? 'Casa' : 'Trabalho'}
                      </Text>
                      <Text style={styles.addressText}>
                        {address.address}, {address.number}
                      </Text>
                      <Text style={styles.addressText}>{address.district}</Text>
                      <Text style={styles.addressText}>
                        {address.city} / {address.uf}
                      </Text>

                      {address.reference && (
                        <Text style={styles.addressText}>
                          {address.reference}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.deleteIconContainer}
                      onPress={() => handleOpenDeleteModal(address.id)}>
                      <CustomIcon
                        name="trash-2"
                        size={25}
                        color="red"
                        pack="Feather"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              {address.length === 0 && (
                <Text style={styles.emptyResultText}>
                  Sem endereço cadastrado
                </Text>
              )}

              <TouchableOpacity style={styles.addButton} onPress={showModal}>
                <CustomIcon name="plus" size={25} color="red" pack="Feather" />
                <Text style={styles.addButtonText}>Adicionar endereço</Text>
              </TouchableOpacity>

              <DeleteAddressModal
                hideModal={hideModal}
                modalOpen={modalOpen}
                translateY={translateY}
                setModalOpen={setModalOpen}
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
