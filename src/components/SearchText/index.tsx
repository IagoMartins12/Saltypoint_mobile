import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

interface SearchTextProps {
  text: string;
}
const SearchText: React.FC<SearchTextProps> = ({text}) => {
  const {currentTheme} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <CustomIcon
          name="clock-rotate-left"
          size={20}
          pack="FontAwesome6"
          color={
            currentTheme === 'dark'
              ? COLORS.iconColorDark
              : COLORS.iconColorLight
          }
        />
        <MyText textSize="mediumText2"> {text} </MyText>
      </View>

      <View>
        <CustomIcon
          name="close"
          size={20}
          pack="Ionicons"
          color={
            currentTheme === 'dark'
              ? COLORS.iconColorDark
              : COLORS.iconColorLight
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  mainContainer: {
    flexDirection: 'row',

    gap: 15,
    alignItems: 'center',
  },
});

export default SearchText;
