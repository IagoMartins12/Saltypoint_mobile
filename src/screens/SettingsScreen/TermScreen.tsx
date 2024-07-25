import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import SectionTitle from '../../components/SectionTitle';
import {COLORS, FONTSIZE} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../../components/Text';

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

  const {currentTheme} = useTheme();
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
              styles.mainContainer,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <View style={{gap: 15}}>
              <View style={styles.section}>
                <View style={styles.textContainer}>
                  <MyText style={styles.text}>
                    Somos um serviço online e, consequentemente, coletamos e
                    recebemos informações dos usuários que trafegam por nossas
                    páginas e utilizam nosso software.
                  </MyText>
                </View>
                <View style={styles.textContainer}>
                  <MyText style={styles.text}>
                    Todas estas informações são mantidas em absoluto sigilo e
                    não são compartilhadas, cedidas ou vendidas a outras
                    organizações para fins comerciais, exceto se tivermos sua
                    permissão ou nas condições detalhadas a seguir:
                  </MyText>
                </View>
                <MyText style={styles.listItem}>
                  Por determinação judicial ou em caso de investigação de
                  fraudes ou suspeita de atitudes ilegais ou que estejam em
                  desacordo com nossos termos de uso.
                </MyText>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <MyText style={styles.sectionTitle}>
                  Coleta de informações
                </MyText>
                <MyText style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </MyText>
                <MyText style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </MyText>
              </View>

              {/* Informações pessoais coletadas pela Salty Point */}
              <View style={styles.section}>
                <MyText style={styles.sectionTitle}>
                  Informações pessoais coletadas pela Salty Point
                </MyText>
                <MyText style={styles.text}>
                  São coletados os dados de identificação como nome, endereço de
                  correio eletrônico e informações agregadas ao pedido de
                  delivery padrão (como endereço, referência e observações) que
                  são informações fornecidas voluntariamente pelo usuário a
                  título de viabilizar o serviço de delivery e/ou retirada em
                  loja.
                </MyText>
              </View>

              {/* O que o Usuário pode fazer */}
              <View style={styles.section}>
                <MyText style={styles.sectionTitle}>
                  O que o Usuário pode fazer
                </MyText>
                <MyText style={styles.text}>
                  O usuário tem direito de acessar, modificar, corrigir e
                  eliminar os dados fornecidos por eles mesmos. Se o usuário
                  atualizar qualquer informação, a Salty Point poderá manter uma
                  cópia das informações anteriores fornecidas por ele em nossos
                  arquivos e documentações sobre uso do sistema.
                </MyText>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <MyText style={styles.sectionTitle}>
                  Coleta de informações
                </MyText>
                <MyText style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </MyText>
                <MyText style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </MyText>
              </View>

              {/* Coleta de informações */}
              <View style={styles.section}>
                <MyText style={styles.sectionTitle}>
                  Coleta de informações
                </MyText>
                <MyText style={styles.text}>
                  As informações que são coletadas estão relacionadas a seus
                  dados cadastrais e servem para identificá-lo como
                  contratante/usuário de nossos produtos.
                </MyText>
                <MyText style={styles.text}>
                  Além disso, utilizamos os dados fornecidos para a melhoria da
                  prestação de nossos serviços e qualidade nossos produtos,
                  contato e identificação dos clientes, quando necessária.
                </MyText>
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
  },
  textContainer: {
    marginBottom: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
  },
  listItem: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '300',
    marginLeft: 10,
  },
});

export default TermScreen;
