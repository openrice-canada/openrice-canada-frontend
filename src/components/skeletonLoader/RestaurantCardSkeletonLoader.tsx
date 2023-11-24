import ContentLoader from "react-content-loader";

const RestaurantCardSkeletonLoader: React.FC<{ width: string }> = ({
  width,
}) => (
  <ContentLoader
    speed={1}
    width={width}
    height={285}
    viewBox={`0 0 ${width} 285`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="363" height="190" />
    <rect x="48" y="202" rx="0" ry="0" width="80" height="20" />
    <rect x="48" y="230" rx="0" ry="0" width="120" height="20" />
    <rect x="48" y="257" rx="0" ry="0" width="200" height="20" />
  </ContentLoader>
);

export default RestaurantCardSkeletonLoader;
