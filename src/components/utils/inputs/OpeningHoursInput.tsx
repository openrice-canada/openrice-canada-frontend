import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface OpeningHoursInputProps {
  label: string;
  placeholder: string;
  value: Date;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OpeningHoursInput: React.FC<OpeningHoursInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <DatePicker
        placeholderText={placeholder}
        onChange={(date, e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        selected={value}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
};

export default OpeningHoursInput;
