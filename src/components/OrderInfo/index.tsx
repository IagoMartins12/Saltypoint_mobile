import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OrderSpanInfo from '../OrderSpanInfo';
import {COLORS} from '../../theme/theme';
import MyText from '../Text';
import {OrderType, Type_Pagament, User_Adress} from '../../types/ModelsType';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import {APP_SETTINGS} from '../../config';
import {formatOrderDate} from '../../utils';

interface OrderComponentType {
  order: OrderType;
}
const CurrentOrderInfo: React.FC<OrderComponentType> = ({order}) => {
  const {address} = usePrivateStore();
  const {typePagament, states, generalData} = useGlobalStore();

  const getSubtotal = () => {
    const subtotal = order.orderItems.reduce((total, item) => {
      return total + parseFloat(item.value);
    }, 0);

    return subtotal;
  };

  const getAddressInfo = () => {
    return address.find((a: User_Adress) => a.id === order?.user_adress_id);
  };

  const getTaxa = (district: String | undefined) => {
    if (!district) return;
    const lowercaseAddress = district.toLowerCase();

    const rate = APP_SETTINGS.districtRate.some(district =>
      lowercaseAddress.includes(district.toLowerCase()),
    );

    return rate;
  };

  const getFullAddressInfo = () => {
    const addr = getAddressInfo();

    if (!addr) return 'Endereço não encontrado';

    return `${addr.address}, ${addr.number} - ${addr.district} - ${addr.city} / ${addr.uf}`;
  };

  const getTypePagament = () => {
    return (
      typePagament.find(
        (type: Type_Pagament) => type.id === order.type_pagament_id,
      )?.type_pagament_name ?? 'Forma de pagamento não encontrada'
    );
  };

  const getState = () => {
    return (
      states.find(s => s.id === order.state_id)?.state_name ??
      'Status desconhecido'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <View style={styles.rowContainer}>
          <MyText style={styles.text2xl}>Subtotal:</MyText>
          <MyText style={styles.textGray}>R$ {getSubtotal().toFixed(2)}</MyText>
        </View>

        {order.discount_coupon_id && (
          <View style={styles.rowContainer}>
            <MyText style={styles.text2xl}>Cupom:</MyText>
            <MyText style={[styles.textBase, styles.textGreen]}>
              - R$ {order.discount_value?.toFixed(2)}
            </MyText>
          </View>
        )}

        {order.reward_id && order.discount_value !== 0 && (
          <View style={styles.rowContainer}>
            <MyText style={[styles.textBase, styles.infoLabel]}>
              Recompensa:
            </MyText>
            <MyText style={[styles.textBase, styles.textGreen]}>
              - R$ {order.discount_value?.toFixed(2)}
            </MyText>
          </View>
        )}

        {order.user_adress_id && (
          <View style={styles.rowContainer}>
            <MyText style={styles.text2xl}>Taxa:</MyText>
            <MyText style={styles.textGray}>
              R${' '}
              {getTaxa(getAddressInfo()?.district)
                ? generalData?.deliveryFeeOutside.toFixed(2)
                : generalData?.deliveryFeeInside.toFixed(2)}
            </MyText>
          </View>
        )}
        <View style={styles.rowContainer}>
          <MyText style={styles.text3xl}>Total:</MyText>
          <MyText style={[styles.text3xl]}>
            R$ {order.total_amount.toFixed(2)}
          </MyText>
        </View>
      </View>

      <View>
        {order.user_adress_id ? (
          <OrderSpanInfo label="Entrega em" content={getFullAddressInfo()} />
        ) : (
          <OrderSpanInfo
            label="Retirada em"
            content="Estrada de ligação, 22 - Residencial Sol Nascente - São Paulo / SP"
          />
        )}
        {getAddressInfo()?.reference && (
          <OrderSpanInfo
            label="Ponto de referencia"
            content={getAddressInfo()?.reference}
          />
        )}
      </View>

      <View>
        <OrderSpanInfo
          label="Data do pedido"
          content={formatOrderDate(order.order_date)}
        />

        <OrderSpanInfo label="Forma de pagamento" content={getTypePagament()} />

        <OrderSpanInfo label="Status do pedido" content={getState()} />

        <OrderSpanInfo
          label="Numero de contato"
          content={order.contact_phone}
        />
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
    fontWeight: '300',
  },
  text3xl: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: '400',
  },
  infoLabel: {
    fontSize: 16,
    paddingBottom: 2,
  },
});

export default CurrentOrderInfo;
