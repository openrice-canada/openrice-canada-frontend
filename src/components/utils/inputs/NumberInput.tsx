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
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        className="border border-gray-400 rounded-md p-2"
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
