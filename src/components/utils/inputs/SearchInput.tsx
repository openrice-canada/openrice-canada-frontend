import { IoSearch } from "react-icons/io5";

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
  return (
    <div className="flex items-center h-12 w-full">
      <input
        className="border border-gray-400 rounded-tl-md rounded-bl-md px-4 outline-none h-full w-full"
        type={type}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-gray-700 h-full w-14 flex justify-center items-center rounded-tr-md rounded-br-md hover:scale-110 hover:rounded-sm duration-500"
      >
        <IoSearch color="#FFFFFF" />
      </button>
    </div>
  );
};

export default SearchInput;
