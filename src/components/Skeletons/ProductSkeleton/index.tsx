import {StyleSheet, Text, View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

interface teste {
  testee?: string;
}
const ProductSkeleton: React.FC<teste> = ({testee}) => {
  return (
    <SkeletonContent containerStyle={{flex: 1, width: 300}} isLoading={false} />
  );
};

const styles = StyleSheet.create({});

export default ProductSkeleton;
