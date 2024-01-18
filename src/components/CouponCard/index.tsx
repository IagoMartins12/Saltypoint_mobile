import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {global} from '../../style';
import {COLORS} from '../../theme/theme';

const CouponCard = () => {
  const handleCopyLink = async () => {
    // try {
    //   await Clipboard.setString(coupon.cupom_name); // Import Clipboard from react-native
    //   toast.success('Copiado!');
    // } catch (error) {
    //   console.error('Error copying to clipboard:', error);
    // }
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={handleCopyLink}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/coupon.png')}
          //   source={{
          //     uri: 'https://res.cloudinary.com/ds51jm1dx/image/upload/v1696436766/wqjyff5dp0yzyyu97jnk.png',
          //   }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.couponNameText}>Desconto de 15%</Text>
          <Text style={styles.discountText}>#F3S564</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={styles.validityText}>Validade:</Text>
          <Text style={styles.normalText}>20/01/2024</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  imageContainer: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
    justifyContent: 'space-between',
  },
  discountText: {
    fontWeight: '300',
    fontSize: 16,
    color: '#000000',
  },
  couponNameText: {
    fontWeight: 'normal',
    fontSize: 22,
    color: '#000000',
  },

  validityText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primaryRedHex,
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#000000',
  },
});

export default CouponCard;
