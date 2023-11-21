import Select from 'react-select';

interface ICategory {
  value: string;
  label: string;
}

type SelectInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (...event: unknown[]) => void
    optionList: ICategory[];
  };
  
  const TextInput = ({
    label,
    placeholder,
    value,
    onChange,
    optionList,
  }: SelectInputProps) => {
    return (
      <div className="flex flex-col">
        <label>{label}</label>
        <Select
          isClearable
          placeholder={placeholder}
          options={optionList}
          value={optionList.find(c => c.value === value)}
          onChange={e => {
            onChange(e?.value);
           }}
        />
      </div>
    );
  };
  
  export default TextInput;
  