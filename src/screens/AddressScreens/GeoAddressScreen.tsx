import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {checkIfAddressIsValid} from '../../utils';
import {getAddressPerGeoLocation} from '../../services';
import {useEffect} from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import useGeoAddressLocation from '../../hooks/store/useGeoAddressLocation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SectionTitle from '../../components/SectionTitle';
import {global} from '../../style';

const GeoAddressScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const location = useGeoLocation();
  const {setGeoAddress, GeoAddress} = useGeoAddressLocation();
  const apiKey = 'AIzaSyAHf2daxc7jfa2_Z6ShUv_FRyW3vUR2Ja8';

  const requiredTypes = [
    'street_address',
    'route',
    'postal_code',
    'establishment',
    'point_of_interest',
    'premise',
    'sublocality',
  ];

  const getAddressFromResult = result => {
    if (result.types.some(type => type === 'postal_code_prefix')) {
      return result.address_components[1].long_name;
    } else if (result.types.some(type => type === 'sublocality')) {
      return result.address_components[0].long_name;
    } else {
      return result.address_components[2].long_name;
    }
  };

  const handleResultClick = (result, isValidAddress) => {
    navigation.navigate('SaveAddress', {
      result,
    });
    if (!isValidAddress) {
      return;
      //   return toast.error('Esse bairro não está na nossa área de entrega.');
    }
    // setResult(result);
    // setStep(3);
  };

  const comeBack = () => {
    navigation.pop();
  };

  const goToAddressScreen = () => {
    navigation.navigate('SaveAddress');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAddressPerGeoLocation(
          location.coordinates?.lat,
          location.coordinates?.lng,
          apiKey,
        );

        if (response.ok) {
          const data = await response.json();

          setGeoAddress(data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (location.loaded) {
      fetchData();
    }
  }, [location, apiKey]);

  return (
    <View style={{flex: 1}}>
      <SectionTitle comeBack={comeBack} />
      <View style={global.mainContainer}>
        {!location.loaded ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderContent}>
              {/* <PuffLoader /> */}
              <Text style={styles.loaderText}>Aguardando localização...</Text>
            </View>
          </View>
        ) : location.error ? (
          <View style={styles.errorContainer}>
            <View style={styles.errorContent}>
              {/* <BsWifiOff size={55} /> */}
              <Text style={styles.errorText}>Erro ao buscar localização</Text>
            </View>

            <TouchableOpacity
              // onPress={() => {
              //   setStep(3);
              // }}
              style={styles.button}>
              <Text style={styles.buttonText}>Inserir endereço</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Selecione um dos resultados abaixo
            </Text>
            <ScrollView style={styles.scrollContainer}>
              {GeoAddress?.results ? (
                <>
                  {GeoAddress.results
                    .filter(result =>
                      result.types.some(type => requiredTypes.includes(type)),
                    )
                    .map((result, i) => {
                      const address = getAddressFromResult(result);

                      const isValidAddress = checkIfAddressIsValid(address);

                      return (
                        <TouchableOpacity
                          style={styles.resultItem}
                          key={i}
                          onPress={() => {
                            handleResultClick(result, isValidAddress);
                          }}>
                          <Text>{result.formatted_address}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  <TouchableOpacity
                    onPress={goToAddressScreen}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                      Não achei meu endereço
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  // onPress={() => {
                  //   setStep(3);
                  // }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Não achei meu endereço</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'red',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  resultItem: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    paddingVertical: 10,
    borderColor: 'gray',
    cursor: 'pointer',
  },
});

export default GeoAddressScreen;
