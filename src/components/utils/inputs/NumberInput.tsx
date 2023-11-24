interface NumberInputProps {
  label: string;
  placeholder: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  step: string;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  step,
  min,
  max,
}) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="border border-gray-400 rounded-md p-2 mt-1"
        type="number"
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  );
};

export default NumberInput;
