/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { selectInputColourStyles } from "./selectInput.color.style";

export interface Category {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  optionList: Category[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  optionList,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <Select
        isClearable
        placeholder={placeholder}
        options={optionList}
        value={optionList.find((c) => c.value === value)}
        onChange={(e) => {
          onChange(e?.value);
        }}
        styles={selectInputColourStyles}
      />
    </div>
  );
};

export default SelectInput;
