const RestaurantOverviewButton: React.FC<{
  button: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}> = ({ button, active, setActive }) => {
  return (
    <h1
      className={`text-2xl font-bold mt-6 hover:text-orange-600 ${
        active && "text-orange-400"
      }`}
    >
      <button onClick={() => setActive(button)}>{button}</button>
    </h1>
  );
};

export default RestaurantOverviewButton;
