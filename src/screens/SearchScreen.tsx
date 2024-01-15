import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import TitleSection from '../components/TitleSection';
import SearchComponent from '../components/SearchComponent';
import {BORDERRADIUS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';

const categories = ['Pizza', 'Esfiha', 'Combos', 'Refrigerantes', 'Promoção'];

const SearchScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [currentCategory, setCurrentCategory] = useState<null | number>(null);

  return (
    <View style={styles.mainContainer}>
      <TitleSection title="Pesquisar" />

      <SearchComponent />

      <View style={{marginVertical: 10, gap: 20}}>
        <Text style={styles.categoryText}>Categorias</Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 15,
          }}>
          {categories.map((category, key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryBox,
                {
                  backgroundColor:
                    currentCategory === key ? '#2FDBBC' : '#ffffff',
                  opacity:
                    currentCategory !== null && currentCategory !== key
                      ? 0.5
                      : 1,
                },
              ]}
              onPress={() => {
                setCurrentCategory(prev => (prev === key ? null : key));
              }}>
              <Text style={styles.categoryBoxName}>{category}</Text>
              {key === currentCategory ? (
                <CustomIcon
                  name="close"
                  size={25}
                  color="#000000"
                  pack="Ionicons"
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{marginVertical: 30, gap: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.categoryText}>Recentes</Text>
          <Text style={styles.categoryText}>Limpar</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  categoryText: {
    fontSize: FONTSIZE.size_14,
    fontWeight: '700',
    color: 'black',
  },

  categoryBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    gap: 15,
  },

  categoryBoxName: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
    color: 'black',
  },
});

export default SearchScreen;
