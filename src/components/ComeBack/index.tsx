import {TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ComeBack = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const comeBack = () => {
    navigation.pop();
  };
  return (
    <TouchableOpacity
      onPress={comeBack}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        backgroundColor: '#f0efef',
        borderRadius: 100,
        top: 25,
        left: 20,
        position: 'absolute',
      }}>
      <CustomIcon name="arrow-left" size={20} pack="SimpleLineIcons" />
    </TouchableOpacity>
  );
};

export default ComeBack;
