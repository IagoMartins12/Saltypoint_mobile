import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';
import {COLORS, FONTSIZE} from '../../theme/theme';
import RewardInfo from '../../components/RewardInfo';
import FidelityAccordeonSection from '../../components/FidelityAccordeonSection';
import useTheme from '../../hooks/useTheme';
import MyText from '../../components/Text';

const FidelityScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {currentTheme} = useTheme();
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
            comeBack();
          }
        }}>
        <View style={{flex: 1}}>
          <SectionTitle comeBack={comeBack} />

          <ScrollView
            style={{
              flex: 1,
              backgroundColor:
                currentTheme === 'light' ? '' : COLORS.backgroundColorDark,
            }}>
            <View
              style={[
                styles.boxContainer,
                {
                  backgroundColor:
                    currentTheme === 'light'
                      ? COLORS.cardColorLight
                      : COLORS.cardColorDark,
                },
              ]}>
              <MyText
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Programa de fidelidade
              </MyText>

              <MyText
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                Ganhe 1 ponto a cada R$ 1,00, e troque por recompensas
                incríveis.
              </MyText>

              <TouchableOpacity
                style={[
                  global.buttonStyle,
                  {
                    backgroundColor:
                      currentTheme === 'light'
                        ? '#000000'
                        : COLORS.backgroundColorDark,
                  },
                ]}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    paddingRight: 10,
                    fontWeight: 'bold',
                  }}>
                  ENTRE E PARTICIPE
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 40,
              }}>
              <MyText
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Beneficios que você pode ganhar
              </MyText>
            </View>

            <View
              style={[
                styles.rewardsDiv,
                {
                  backgroundColor:
                    currentTheme === 'light'
                      ? COLORS.cardColorLight
                      : COLORS.cardColorDark,
                },
              ]}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i, key) => (
                <View
                  key={key}
                  style={{
                    paddingHorizontal: 20,
                    gap: 10,
                  }}>
                  <RewardInfo />
                  {i !== 8 ? <View style={styles.hrStyle} /> : null}
                </View>
              ))}
            </View>

            <View style={styles.rewardsText}>
              <MyText textSize="smallText">*Prêmio não acumulativo</MyText>
            </View>

            <FidelityAccordeonSection showAllContent />
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: Dimensions.get('window').height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderBottomWidth: 2,
  },

  rewardsDiv: {
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 25,
    paddingVertical: 20,
    gap: 20,
  },

  customIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    top: -20,
    left: 180,
    borderRadius: 100,
    borderWidth: 1,
    position: 'absolute',
  },

  rewardsText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    marginHorizontal: 25,
  },

  accordeonBoxTittle: {
    paddingVertical: 20,
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
  accordeonBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  accordeonTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
  },
});

export default FidelityScreen;
