import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

type DateInputProps = {
	label: string;
	placeholder: string;
	value: Date;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateInput = ({
	label,
	placeholder,
	value,
	onChange,
}: DateInputProps) => {
	return (
		<div className='flex flex-col'>
			<label>{label}</label>
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

export default DateInput;
