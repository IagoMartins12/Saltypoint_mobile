import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type PackNames =
  | 'FontAwesome'
  | 'Feather'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Ionicons'
  | 'SimpleLineIcons'
  | 'Entypo'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons';

interface CustomIconProps {
  name: string;
  size: number;
  color?: string;
  pack?: PackNames;
  fill?: string;
}
const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size,
  color,
  pack = 'FontAwesome',
}) => {
  if (pack === 'FontAwesome') {
    return <FontAwesome name={name} size={size} color={color} />;
  }

  if (pack === 'Feather') {
    return <Feather name={name} size={size} color={color} />;
  }

  if (pack === 'FontAwesome5') {
    return <FontAwesome5 name={name} size={size} color={color} />;
  }

  if (pack === 'FontAwesome6') {
    return <FontAwesome6 name={name} size={size} color={color} />;
  }

  if (pack === 'Ionicons') {
    return <Ionicons name={name} size={size} color={color} />;
  }

  if (pack === 'SimpleLineIcons') {
    return <SimpleLineIcons name={name} size={size} color={color} />;
  }

  if (pack === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }

  if (pack === 'Entypo') {
    return <Entypo name={name} size={size} color={color} />;
  }

  if (pack === 'MaterialIcons') {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
};

export default CustomIcon;
