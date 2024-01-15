import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Substitua 'FontAwesome' pelo conjunto de ícones desejado
import Feather from 'react-native-vector-icons/Feather'; // Substitua 'FontAwesome' pelo conjunto de ícones desejado
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Substitua 'FontAwesome' pelo conjunto de ícones desejado

interface CustomIconProps {
  name: string;
  size: number;
  color?: string;
  pack?: 'FontAwesome' | 'Feather' | 'FontAwesome5';
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
};

export default CustomIcon;
