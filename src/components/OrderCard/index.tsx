import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomIcon from '../CustomIcon';
import OrderItemCard from '../OrderItemCard';
import {COLORS} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';
import {Order, OrderType} from '../../types/ModelsType';
import useGlobalStore from '../../hooks/store/useGlobalStore';
import {formatOrderDate} from '../../utils';

interface OrderProps {
  order: OrderType;
  onPress: (id: string) => void;
}
const OrderCard: React.FC<OrderProps> = ({onPress, order}) => {
  const {currentTheme} = useTheme();
  const {states} = useGlobalStore();
  const getState = () => {
    return (
      states.find(s => s.id === order.state_id)?.state_name ??
      'Status desconhecido'
    );
  };

  const color =
    getState().toUpperCase() === 'ENTREGUE'
      ? COLORS.primaryGreenHex
      : getState().toUpperCase() === 'CANCELADO'
      ? COLORS.secondaryRed
      : COLORS.primaryYellow; //Botar amarelo dps

  const formattedData = formatOrderDate(order.order_date);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.cardColorLight
              : COLORS.cardColorDark,
        },
      ]}
      onPress={() => {
        onPress(order.id);
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.infoContainer}>
            <MyText style={styles.title}>Pizzaria Salty Point</MyText>
            <MyText
              style={[
                styles.subtitle,
                {
                  color,
                },
              ]}>
              {getState()}
            </MyText>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CustomIcon size={25} name="chevron-right" pack="Feather" />
          </View>
        </View>

        <View style={styles.itemsContainer}>
          {order.orderItems.slice(0, 1).map(item => (
            <OrderItemCard
              cart_product={item}
              formattedData={formattedData}
              quantity={order.orderItems.length}
              key={item.id}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f7f6f6', // Adapte a cor conforme necessário
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: 'gray', // Adapte a cor conforme necessário
    paddingBottom: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  logo: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  itemsContainer: {
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderCard;
