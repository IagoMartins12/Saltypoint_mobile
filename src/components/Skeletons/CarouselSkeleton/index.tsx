import ContentLoader, {Rect} from 'react-content-loader/native';

const CarouselSkeleton = () => (
  <ContentLoader height={'100%'} width={'100%'}>
    <Rect rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
);

export default CarouselSkeleton;
