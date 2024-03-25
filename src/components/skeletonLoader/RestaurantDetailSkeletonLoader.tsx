import ContentLoader from "react-content-loader";
import RestaurantOverviewButton from "../utils/buttons/RestaurantOverviewButton";

const RestaurantDetailSkeletonLoader: React.FC = () => {
  const buttons = ["Reviews", "Photos", "Menus"];

  return (
    <div className="max-w-5xl mx-auto py-3">
      <ContentLoader
        speed={1}
        width={1180}
        height={280}
        viewBox="0 0 1180 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="16" y="2" rx="6" ry="6" width="395" height="280" />
        <rect x="444" y="6" rx="1" ry="1" width="227" height="26" />
        <rect x="444" y="39" rx="1" ry="1" width="197" height="18" />
        <rect x="444" y="62" rx="1" ry="1" width="82" height="21" />
        <rect x="444" y="89" rx="1" ry="1" width="480" height="21" />
      </ContentLoader>
      <div className="flex justify-center">
        <div className="flex gap-16">
          <RestaurantOverviewButton button={"Reviews"} active={true} />
          {buttons
            .filter((button) => button !== "Reviews")
            .map((button, index) => (
              <RestaurantOverviewButton button={button} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeletonLoader;
