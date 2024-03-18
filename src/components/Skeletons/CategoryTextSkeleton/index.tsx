import ContentLoader, {Rect} from 'react-content-loader/native';

const CategoryTextSkeleton = () => (
  <ContentLoader height={10} width={'40%'}>
    <Rect rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
);

export default CategoryTextSkeleton;
