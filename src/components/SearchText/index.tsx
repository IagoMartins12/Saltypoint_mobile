import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../CustomIcon';

interface SearchTextProps {
  text: string;
}
const SearchText: React.FC<SearchTextProps> = ({text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      <View style={styles.mainContainer}>
        <CustomIcon name="clock-rotate-left" size={20} pack="FontAwesome6" />
        <Text> {text} </Text>
      </View>

      <View>
        <CustomIcon name="close" size={20} pack="Ionicons" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',

    gap: 15,
    alignItems: 'center',
  },
});

export default SearchText;
