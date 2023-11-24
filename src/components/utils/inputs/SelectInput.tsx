import Select from "react-select";

interface Category {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (...event: unknown[]) => void;
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
      />
    </div>
  );
};

export default SelectInput;
