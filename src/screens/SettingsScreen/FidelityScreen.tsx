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

const FidelityScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
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
          <View
            style={{
              flex: 0.09,
              backgroundColor: COLORS.primaryBlackHex,
            }}>
            <SectionTitle comeBack={comeBack} />
          </View>

          <ScrollView style={{flex: 1}}>
            <View style={styles.boxContainer}>
              {/* <View style={styles.customIconBox}>
                <CustomIcon name="gift" size={20} pack="Feather" />
              </View> */}

              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: COLORS.primaryBlackHex,
                  fontWeight: 'bold',
                }}>
                Programa de fidelidade
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: COLORS.primaryBlackHex,
                  fontWeight: '500',
                }}>
                Ganhe 1 ponto a cada R$ 1,00, e troque por recompensas
                incríveis.
              </Text>

              <TouchableOpacity
                style={[
                  global.buttonStyle,
                  {backgroundColor: COLORS.primaryBlackHex},
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: COLORS.primaryBlackHex,
                }}>
                Beneficios que você pode ganhar
              </Text>
            </View>

            <View style={styles.rewardsDiv}>
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
              <Text>*Prêmio não acumulativo</Text>
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
    backgroundColor: '#ffffff',
  },

  rewardsDiv: {
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#ffffff',
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
