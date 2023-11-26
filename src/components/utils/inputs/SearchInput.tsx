import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, IRootState } from "../../../store";
import { getDishesThunk } from "../../../redux/dish/dishSlice";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
  type,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const dishes = useSelector((state: IRootState) => state.dish.dishes);

  useEffect(() => {
    dispatch(getDishesThunk());
  }, [dispatch]);

  return (
    <div className="flex items-center h-12 w-full relative">
      <input
        className="border border-gray-400 rounded-tl-md rounded-bl-md px-4 outline-none h-full w-full"
        type={type}
        placeholder={placeholder || ""}
        value={value}
        onChange={(e) => {
          onChange(e);
          setIsSearching(false);
        }}
        onClick={() => {
          setIsSearching(true);
        }}
      />
      <button
        type="submit"
        className="bg-gray-700 h-full w-14 flex justify-center items-center rounded-tr-md rounded-br-md hover:scale-110 hover:rounded-sm duration-500"
      >
        <IoSearch color="#FFFFFF" />
      </button>
      {isSearching && dishes.length > 0 && (
        <div className="absolute top-13 w-80 h-80 flex flex-wrap overflow-y-auto bg-white border rounded-lg p-2 z-4">
          {dishes.map((dish) => {
            return (
              <Link
                className="px-3 py-4 rounded-3xl hover:bg-slate-200 duration-300 font-bold"
                to={`/restaurants?dish=${dish.name}`}
                key={dish.name}
                onClick={() => setIsSearching(false)}
              >
                {dish.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
