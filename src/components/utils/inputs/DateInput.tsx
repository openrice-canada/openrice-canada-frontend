interface DateInputProps {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
}

const DateInput = ({ label, placeholder, value, onChange }: DateInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        className="border border-gray-400 rounded-md p-2"
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
};

export default DateInput;
