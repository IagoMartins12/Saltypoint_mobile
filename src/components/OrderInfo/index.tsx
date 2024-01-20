import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OrderSpanInfo from '../OrderSpanInfo';
import {COLORS} from '../../theme/theme';

interface OrderComponentType {}
const CurrentOrderInfo: React.FC<OrderComponentType> = ({}) => {
  //   const {address} = usePrivateStore();
  //   const {typePagament, states} = useGlobalStore();

  //   const getSubtotal = () => {
  //     const subtotal = order.orderItems.reduce((total, item) => {
  //       return total + parseFloat(item.value);
  //     }, 0);

  //     return subtotal;
  //   };

  //   const getAddressInfo = () => {
  //     return address.find(a => a.id === order?.user_adress_id);
  //   };

  //   const getTaxa = (district: String | undefined) => {
  //     if (!district) return;
  //     const lowercaseAddress = district.toLowerCase();

  //     const rate = APP_SETTINGS.districtRate.some(district =>
  //       lowercaseAddress.includes(district.toLowerCase()),
  //     );

  //     return rate;
  //   };

  //   const getFullAddressInfo = () => {
  //     const addr = address.find(a => a.id === order?.user_adress_id);

  //     if (!addr) return 'Endereço não encontrado';

  //     return `${addr.address}, ${addr.number} - ${addr.district} - ${addr.city} / ${addr.uf}`;
  //   };

  //   const getTypePagament = () => {
  //     return (
  //       typePagament.find(type => type.id === order.type_pagament_id)
  //         ?.type_pagament_name ?? 'Forma de pagamento não encontrada'
  //     );
  //   };

  //   const getState = () => {
  //     return (
  //       states.find(s => s.id === order.state_id)?.state_name ??
  //       'Status desconhecido'
  //     );
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.text2xl}>Subtotal:</Text>
          <Text style={styles.textGray}>R$ 30.00</Text>
        </View>

        {/* {order.discount_coupon_id && ( */}
        <View style={styles.rowContainer}>
          <Text style={styles.text2xl}>Cupom:</Text>
          <Text style={[styles.textBase, styles.textGreen]}>
            {/* - R$ {order.discount_value?.toFixed(2)} */}- R$ 5,00
          </Text>
        </View>
        {/* // )} */}

        {/* {order.reward_id && order.discount_value !== 0 && (
          <View style={styles.rowContainer}>
            <Text style={[styles.textBase, styles.infoLabel]}>Recompensa:</Text>
            <Text style={[styles.textBase, styles.textGreen]}>
              - R$ {order.discount_value?.toFixed(2)}
            </Text>
          </View>
        )} */}

        {/* {order.user_adress_id && ( */}
        <View style={styles.rowContainer}>
          <Text style={styles.text2xl}>Taxa:</Text>
          <Text style={styles.textGray}>R$ 3.00</Text>
        </View>
        {/* )} */}

        <View style={styles.rowContainer}>
          <Text style={styles.text3xl}>Total:</Text>
          <Text style={[styles.text3xl]}>
            R$ 55,00
            {/* R$ {order.total_amount.toFixed(2)} */}
          </Text>
        </View>
      </View>

      <View>
        {/* {order.user_adress_id ? ( */}
        {/* <OrderSpanInfo label="Entrega em" content={getFullAddressInfo()} /> */}
        {/* ) : ( */}
        <OrderSpanInfo
          label="Entrega em"
          content="Estrada de ligação, 22 - Residencial Sol Nascente - São Paulo / SP"
        />
        {/* )} */}
        {/* {getAddressInfo()?.reference && ( */}
        {/* <Text style={[styles.textBase, styles.infoLabel]}>
          Ponto de referencia: Ao lado da farmacia
        </Text> */}
        {/* )} */}
      </View>

      <View>
        <OrderSpanInfo label="Data do pedido" content="20/01/2024" />

        <OrderSpanInfo
          label="Forma de pagamento"
          content={'Cartão de credito'}
        />

        <OrderSpanInfo label="Status do pedido" content="Em produção" />

        <OrderSpanInfo label="Numero de contato" content={'(11) 98859-8530'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 10,
    gap: 6,
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBase: {
    fontSize: 14,
    fontFamily: 'light',
    color: COLORS.primaryBlackHex,
  },
  textGreen: {
    color: 'green',
    fontWeight: '400',
    fontSize: 16,
  },
  textGray: {
    color: 'rgba(156, 163, 175, 1)',
    fontWeight: '400',
    fontSize: 16,
  },
  text2xl: {
    fontSize: 20,
    color: COLORS.primaryBlackHex,
    fontWeight: '300',
  },
  text3xl: {
    fontSize: 24,
    lineHeight: 40,
    color: COLORS.primaryBlackHex,
    fontWeight: '400',
  },
  infoLabel: {
    fontSize: 16,
    paddingBottom: 2,
    color: COLORS.primaryBlackHex,
  },
});

export default CurrentOrderInfo;
