import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomIcon from '../../CustomIcon';
import {ModalProps} from '../ForgetPasswordModal';
import {COLORS, FONTSIZE} from '../../../theme/theme';
import MyText from '../../Text';
import CouponCard from '../../CouponCard';
import useKeyboardOpen from '../../../hooks/useKeyboardOpen';
import EmptyAnimation from '../../Lottie/EmptyAnimation';

const CouponsModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  hideModal,
  translateY,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const isOpen = useKeyboardOpen();

  // Altura compartilhada animada
  const modalHeight = useSharedValue(
    isOpen
      ? Dimensions.get('screen').height * 0.6
      : Dimensions.get('screen').height * 0.9,
  );

  // Atualizar a altura compartilhada animada quando o teclado for aberto/fechado
  useEffect(() => {
    modalHeight.value = withTiming(
      isOpen
        ? Dimensions.get('screen').height * 0.6
        : Dimensions.get('screen').height * 0.9,
      {duration: 150}, // Duração da animação de 150 milissegundos
    );
  }, [isOpen]);
  // Estilo animado para o modal
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      height: modalHeight.value,
    };
  });

  const handleOverlayPress = (e: GestureResponderEvent) => {
    hideModal();
    setTimeout(() => setModalOpen(!modalOpen), 300);
    setSearchText('');
  };

  const options = [
    {
      name: 'Cupons',
    },
    {
      name: 'Recompensas',
    },
  ];

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={modalOpen}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={{width: '100%'}}>
              <Pressable
                style={{
                  width: '100%',
                  height: '3%',
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={handleOverlayPress}>
                  <CustomIcon
                    name="arrow-down"
                    size={20}
                    pack="SimpleLineIcons"
                  />
                </TouchableOpacity>
              </Pressable>
            </View>
            <View style={{width: '100%', marginTop: 30}}>
              <View style={{width: '100%', flexDirection: 'row'}}>
                {options.map((op, i) => (
                  <Pressable
                    onPress={() => setSelectedOption(i)}
                    key={i}
                    style={{
                      width: '50%',
                      paddingBottom: 10,
                      borderBottomWidth: selectedOption === i ? 1 : 0,
                      borderColor:
                        selectedOption === i ? COLORS.secondaryRed : null,
                    }}>
                    <MyText
                      style={{
                        textAlign: 'center',
                        color:
                          selectedOption === i
                            ? COLORS.secondaryRed
                            : '#000000',
                      }}>
                      {op.name}
                    </MyText>
                  </Pressable>
                ))}
              </View>
              {selectedOption === 0 ? (
                <ScrollView>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      placeholder="Código de cupom"
                      style={{
                        padding: 10,
                        borderWidth: 0.5,
                        width: '65%',
                        marginHorizontal: 20,
                        marginVertical: 10,
                      }}
                      value={searchText}
                      onChangeText={ev => setSearchText(ev)}
                    />
                    <MyText
                      style={{
                        color: searchText ? COLORS.secondaryRed : '#000000',
                      }}>
                      Adicionar
                    </MyText>
                  </View>
                  <View style={{gap: 15, marginHorizontal: 20, marginTop: 10}}>
                    <EmptyAnimation text="Sem cupons disponiveis" />
                  </View>
                </ScrollView>
              ) : (
                <ScrollView>
                  <EmptyAnimation text="Sem cupons disponiveis" />
                </ScrollView>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fffbfb',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: 'center',
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#f0efef',
    borderRadius: 100,
    top: 15,
    left: 20,
    position: 'absolute',
  },
});

export default CouponsModal;
