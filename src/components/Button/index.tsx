import {Text, TouchableOpacity} from 'react-native';
import {global} from '../../style';
import {FieldValues, UseFormHandleSubmit} from 'react-hook-form';

interface LargeButtonProps {
  text: string;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: (data: any) => void;
}
const LargeButton: React.FC<LargeButtonProps> = ({
  handleSubmit,
  text,
  onSubmit,
}) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit(onSubmit)}
      style={global.buttonStyle}>
      <Text style={{color: '#FFFFFF', paddingRight: 10}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LargeButton;
