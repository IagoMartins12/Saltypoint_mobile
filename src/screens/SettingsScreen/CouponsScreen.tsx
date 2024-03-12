import {StyleSheet, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import {global} from '../../style';

import SectionTitle from '../../components/SectionTitle';
import {COLORS} from '../../theme/theme';
import CouponCard from '../../components/CouponCard';
import useTheme from '../../hooks/useTheme';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import EmptyAnimation from '../../components/Lottie/EmptyAnimation';

const CouponsScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {currentTheme} = useTheme();
  const {coupons} = usePrivateStore();
  const onSwipeLeft = () => {
    navigation.navigate('Settings');
  };
  const comeBack = () => {
    navigation.pop();
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
            {coupons.length > 0 ? (
              <View style={{gap: 15, flex: 1}}>
                {coupons.map((c, i) => (
                  <CouponCard key={i} coupon={c} />
                ))}
              </View>
            ) : (
              <EmptyAnimation text="Você não possui nenhum cupom disponivel" />
            )}
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default CouponsScreen;
