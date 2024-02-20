import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../../CustomIcon';
import MyText from '../../Text';
import ProductRecomendCard from '../../ProductRecomendCard';
import CartInfo from '../../CartInfo';
import {Product, Type_Pagament} from '../../../types/ModelsType';
import ProductCartCard from '../../ProductCartCard';
import {COLORS, FONTSIZE} from '../../../theme/theme';
import SectionTitle from '../../SectionTitle';
import useGlobalStore from '../../../hooks/store/useGlobalStore';
import PaymentCard from '../../PaymentCard';
import {useState} from 'react';
import CartAddressCard from '../../CartAddressCard';
import CartCellphoneCard from '../../CartCellphoneCard';

interface AddressStepProps {
  totalProducts: Product[];
  showModal: () => void;
  ListRef: React.MutableRefObject<FlatList<any>>;
  comeBack: () => void;
}
const AddressStep: React.FC<AddressStepProps> = ({
  totalProducts,
  showModal,
  ListRef,
  comeBack,
}) => {
  const [active, setActive] = useState<null | string>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<null | string>(null);
  const {typePagament} = useGlobalStore();

  const iconSize = 30;
  const iconColor = '#000000';

  const cellPhoneIcon = (
    <CustomIcon
      size={iconSize}
      color={iconColor}
      name="phone"
      pack="MaterialCommunityIcons"
    />
  );
  const userOptions = [
    {
      id: '1',
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
      id: '2',
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
  const getIcon = (options: Type_Pagament) => {
    if (options.type_pagament_name.toUpperCase().includes('CREDITO')) {
      return (
        <CustomIcon
          name="credit-card"
          size={iconSize}
          color={iconColor}
          pack="MaterialIcons"
        />
      );
    }

    if (options.type_pagament_name.toUpperCase().includes('DEBITO')) {
      return (
        <CustomIcon
          name="credit-card"
          size={iconSize}
          color={iconColor}
          pack="Feather"
        />
      );
    }
    if (options.type_pagament_name.toUpperCase().includes('DINHEIRO')) {
      return (
        <CustomIcon
          name="money"
          size={iconSize}
          color={iconColor}
          pack="MaterialIcons"
        />
      );
    }
    if (options.type_pagament_name.toUpperCase().includes('PIX')) {
      return (
        <CustomIcon
          name="pix"
          size={iconSize}
          color={iconColor}
          pack="MaterialIcons"
        />
      );
    }
  };
  return (
    <View>
      <View style={[styles.paddingView, styles.couponView]}>
        <View style={styles.wFull}>
          <View style={styles.titleView}>
            <MyText style={styles.textTittle}>Entregar em</MyText>
            <MyText style={styles.redTextTittle}>Trocar</MyText>
          </View>

          <View>
            {userOptions.map(op => (
              <CartAddressCard
                address={op}
                selectedDelivery={selectedDelivery}
                setSelectedDelivery={setSelectedDelivery}
              />
            ))}
          </View>
        </View>

        <View style={styles.wFull}>
          <View style={styles.titleView}>
            <MyText style={styles.textTittle}>Contato</MyText>
          </View>

          <View>
            <CartCellphoneCard
              cellphone="(11) 98859-8530"
              icon={cellPhoneIcon}
            />
          </View>
        </View>

        <View style={styles.wFull}>
          <View style={styles.titleView}>
            <MyText style={styles.textTittle}>Forma de pagamento</MyText>
          </View>

          <View style={styles.typePagamentView}>
            {typePagament.map(typePagament => {
              const icon = getIcon(typePagament);
              return (
                <PaymentCard
                  key={typePagament.id}
                  typePagament={typePagament}
                  active={active}
                  setActive={setActive}
                  icon={icon}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  couponView: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    gap: 40,
  },

  wFull: {
    width: '100%',
    gap: 20,
  },

  couponTitle: {
    fontSize: 15,
    fontWeight: '500',
  },

  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  textTittle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '600',
  },

  redTextTittle: {
    color: COLORS.secondaryRed,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
  },

  typePagamentView: {
    gap: 10,
  },
});

export default AddressStep;
