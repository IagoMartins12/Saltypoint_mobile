import {Text, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

const ListInfo = ({text}: {text: string}) => {
  const {currentTheme} = useTheme();
  return (
    <View style={{flexDirection: 'row', width: '90%', gap: 5}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomIcon
          name="dot-single"
          size={20}
          pack="Entypo"
          color={
            currentTheme === 'light'
              ? COLORS.iconColorLight
              : COLORS.iconColorDark
          }
        />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <MyText
          style={{
            fontSize: FONTSIZE.size_14,
          }}>
          {text}
        </MyText>
      </View>
    </View>
  );
};

export default ListInfo;
