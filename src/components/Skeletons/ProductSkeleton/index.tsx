import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductCardSkeleton = () => (
  <ContentLoader
    height={220}
    width={'48%'}
    style={{
      borderRadius: 15,
    }}>
    <Rect rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
);

export default ProductCardSkeleton;
