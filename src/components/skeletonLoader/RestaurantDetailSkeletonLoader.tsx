import ContentLoader from "react-content-loader";

const RestaurantDetailSkeletonLoader = () => (
  <ContentLoader
    speed={1}
    width={340}
    height={164}
    viewBox="0 0 340 164"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="5" y="1" rx="3" ry="3" width="140" height="21" />
    <rect x="6" y="100" rx="3" ry="3" width="37" height="20" />
    <rect x="6" y="59" rx="3" ry="3" width="260" height="36" />
    <rect x="5" y="28" rx="0" ry="0" width="223" height="23" />
  </ContentLoader>
);

export default RestaurantDetailSkeletonLoader;
