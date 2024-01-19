import {Text, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';

const ListInfo = ({text}: {text: string}) => {
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
          color={COLORS.primaryBlackHex}
        />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: FONTSIZE.size_14,
            color: COLORS.primaryBlackHex,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default ListInfo;
