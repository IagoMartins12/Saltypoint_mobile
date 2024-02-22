import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import CustomIcon from '../../CustomIcon';
import MyText from '../../Text';
import {Product, Type_Pagament} from '../../../types/ModelsType';
import {COLORS, FONTSIZE} from '../../../theme/theme';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import PaymentCard from '../../PaymentCard';
import {useState} from 'react';
import CartAddressCard from '../../CartAddressCard';
import CartCellphoneCard from '../../CartCellphoneCard';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import ChangeCellphoneModal from '../../Modals/ChangeCellphoneModal';
import AddressModal from '../../Modals/AddressModal';

interface AddressStepProps {
  addAddress: () => void;
}

const iconSize = 30;
const iconColor = '#000000';

export const userOptions = [
  {
    id: '0',
    name: 'Delivery',
    address: 'Luiza maria rosa',
    number: '222',
    district: 'Décima area',
    city: 'São paulo',
    uf: 'SP',
    reference: 'Esquina',
    icon: (
      <CustomIcon
        name="delivery-dining"
        size={iconSize}
        color={iconColor}
        pack="MaterialIcons"
      />
    ),
  },
  {
    id: '1',
    name: 'Retirar na loja',
    address: 'Estrada de ligação',
    number: '22',
    district: 'Sol nascente',
    city: 'São paulo',
    uf: 'SP',
    icon: (
      <CustomIcon
        name="home"
        size={iconSize}
        color={iconColor}
        pack="MaterialIcons"
      />
    ),
  },
];
// const AddressStep: React.FC<AddressStepProps> = ({addAddress}) => {
//   const [active, setActive] = useState<null | string>(null);
//   const [selectedDelivery, setSelectedDelivery] = useState<null | string>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalAddressOpen, setModalAddressOpen] = useState(false);

//   const translateY = useSharedValue(Dimensions.get('window').height);
//   const cellPhoneIcon = (
//     <CustomIcon
//       size={iconSize}
//       color={iconColor}
//       name="phone"
//       pack="MaterialCommunityIcons"
//     />
//   );

//   const showModal = (currentTarget: 'Address' | 'Cellphone') => {
//     console.log('chamou');
//     translateY.value = withTiming(0, {duration: 500});
//     if (currentTarget === 'Cellphone') {
//       return setModalOpen(true);
//     }

//     return setModalAddressOpen(true);
//   };

//   const hideModal = () => {
//     translateY.value = withTiming(Dimensions.get('window').height, {
//       duration: 500,
//     });
//   };
//   const {typePagament} = useGlobalStore();

//   const getIcon = (options: Type_Pagament) => {
//     if (options.type_pagament_name.toUpperCase().includes('CREDITO')) {
//       return (
//         <CustomIcon
//           name="credit-card"
//           size={iconSize}
//           color={iconColor}
//           pack="MaterialIcons"
//         />
//       );
//     }

//     if (options.type_pagament_name.toUpperCase().includes('DEBITO')) {
//       return (
//         <CustomIcon
//           name="credit-card"
//           size={iconSize}
//           color={iconColor}
//           pack="Feather"
//         />
//       );
//     }
//     if (options.type_pagament_name.toUpperCase().includes('DINHEIRO')) {
//       return (
//         <CustomIcon
//           name="money"
//           size={iconSize}
//           color={iconColor}
//           pack="MaterialIcons"
//         />
//       );
//     }
//     if (options.type_pagament_name.toUpperCase().includes('PIX')) {
//       return (
//         <CustomIcon
//           name="pix"
//           size={iconSize}
//           color={iconColor}
//           pack="MaterialIcons"
//         />
//       );
//     }
//   };
//   return (
//     <View style={[styles.paddingView, styles.couponView]}>
//       {/* Delivery Options  */}
//       <View style={styles.wFull}>
//         <View style={styles.titleView}>
//           <MyText style={styles.textTittle}>Entregar em</MyText>
//           <MyText
//             style={styles.redTextTittle}
//             onPress={() => {
//               showModal('Address');
//             }}>
//             Trocar
//           </MyText>
//         </View>

//         <View>
//           {userOptions.map(op => (
//             <CartAddressCard
//               address={op}
//               selectedDelivery={selectedDelivery}
//               setSelectedDelivery={setSelectedDelivery}
//             />
//           ))}
//         </View>
//       </View>

//       {/* Cellphone  */}
//       <View style={styles.wFull}>
//         <View style={styles.titleView}>
//           <MyText style={styles.textTittle}>Contato</MyText>
//         </View>

//         <View>
//           <CartCellphoneCard
//             cellphone="(11) 98859-8530"
//             icon={cellPhoneIcon}
//             showModal={showModal}
//           />
//         </View>
//       </View>

//       {/* typePagament  */}
//       <View style={styles.wFull}>
//         <View style={styles.titleView}>
//           <MyText style={styles.textTittle}>Forma de pagamento</MyText>
//         </View>

//         <View style={styles.typePagamentView}>
//           {typePagament.map(typePagament => {
//             const icon = getIcon(typePagament);
//             return (
//               <PaymentCard
//                 key={typePagament.id}
//                 typePagament={typePagament}
//                 active={active}
//                 setActive={setActive}
//                 icon={icon}
//               />
//             );
//           })}
//         </View>
//       </View>

//       {/* Modals  */}
//       <ChangeCellphoneModal
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         hideModal={hideModal}
//         translateY={translateY}
//       />
//       <AddressModal
//         modalOpen={modalAddressOpen}
//         translateY={translateY}
//         setModalOpen={setModalAddressOpen}
//         hideModal={hideModal}
//         addAddress={addAddress}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   paddingView: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },

//   couponView: {
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//     gap: 40,
//   },

//   wFull: {
//     width: '100%',
//     gap: 20,
//   },

//   couponTitle: {
//     fontSize: 15,
//     fontWeight: '500',
//   },

//   titleView: {
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },

//   textTittle: {
//     fontSize: FONTSIZE.size_18,
//     fontWeight: '600',
//   },

//   redTextTittle: {
//     color: COLORS.secondaryRed,
//     fontSize: FONTSIZE.size_14,
//     fontWeight: '600',
//   },

//   typePagamentView: {
//     gap: 10,
//   },
// });

// export default AddressStep;
