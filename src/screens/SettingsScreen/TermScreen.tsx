import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import SectionTitle from '../../components/SectionTitle';
import {COLORS, FONTSIZE} from '../../theme/theme';

const TermScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
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
          <View style={{flex: 0.09, backgroundColor: COLORS.primaryBlackHex}}>
            <SectionTitle comeBack={comeBack} />
          </View>
          <ScrollView style={styles.mainContainer}>
            <View style={{gap: 15}}>
              <View style={styles.section}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    Somos um serviço online e, consequentemente, coletamos e
                    recebemos informações dos usuários que trafegam por nossas
                    páginas e utilizam nosso software.
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    Todas estas informações são mantidas em absoluto sigilo e
                    não são compartilhadas, cedidas ou vendidas a outras
                    organizações para fins comerciais, exceto se tivermos sua
                    permissão ou nas condições detalhadas a seguir:
                  </Text>
                </View>
                <Text style={styles.listItem}>
                  Por determinação judicial ou em caso de investigação de
                  fraudes ou suspeita de atitudes ilegais ou que estejam em
                  desacordo com nossos termos de uso.
                </Text>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Coleta de informações</Text>
                <Text style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </Text>
                <Text style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </Text>
              </View>

              {/* Informações pessoais coletadas pela Salty Point */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Informações pessoais coletadas pela Salty Point
                </Text>
                <Text style={styles.text}>
                  São coletados os dados de identificação como nome, endereço de
                  correio eletrônico e informações agregadas ao pedido de
                  delivery padrão (como endereço, referência e observações) que
                  são informações fornecidas voluntariamente pelo usuário a
                  título de viabilizar o serviço de delivery e/ou retirada em
                  loja.
                </Text>
              </View>

              {/* O que o Usuário pode fazer */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  O que o Usuário pode fazer
                </Text>
                <Text style={styles.text}>
                  O usuário tem direito de acessar, modificar, corrigir e
                  eliminar os dados fornecidos por eles mesmos. Se o usuário
                  atualizar qualquer informação, a Salty Point poderá manter uma
                  cópia das informações anteriores fornecidas por ele em nossos
                  arquivos e documentações sobre uso do sistema.
                </Text>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Coleta de informações</Text>
                <Text style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </Text>
                <Text style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </Text>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Coleta de informações</Text>
                <Text style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </Text>
                <Text style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
  textContainer: {
    marginBottom: 6,
    color: '#000000',
  },
  text: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '500',
    color: '#000000',
  },
  listItem: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '400',
    marginLeft: 10,
    color: '#000000',
  },
});

export default TermScreen;
