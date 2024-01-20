import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import CustomIcon from '../CustomIcon';
import OrderItemCard from '../OrderItemCard';
import {COLORS} from '../../theme/theme';

interface OrderProps {
  onPress: () => void;
}
const OrderCard: React.FC<OrderProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Pizzaria Salty Point</Text>
            <Text style={styles.subtitle}>Em analise</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CustomIcon
              size={25}
              name="chevron-right"
              pack="Feather"
              color="#000000"
            />
          </View>
        </View>

        <View style={styles.itemsContainer}>
          <OrderItemCard />
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
    color: COLORS.primaryBlackHex,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.primaryBlackHex,
  },
  itemsContainer: {
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderCard;
