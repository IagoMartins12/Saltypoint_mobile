import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../CustomIcon';
import {global} from '../../style';

interface SectionTitleProps {
  comeBack: () => void;
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({comeBack, title}) => {
  return (
    <View
      style={[
        global.shadow,
        {
          height: '0.5%',
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      <View style={{width: '15%'}}>
        <TouchableOpacity
          onPress={comeBack}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 30,
            backgroundColor: '#f0efef',
            borderRadius: 100,
          }}>
          <CustomIcon name="arrow-left" size={17} pack="SimpleLineIcons" />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          textAlign: 'center',
          width: '70%',
          fontWeight: '600',
          fontSize: 22,
          color: '#000000',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default SectionTitle;
