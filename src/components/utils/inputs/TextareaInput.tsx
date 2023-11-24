interface TextareaInputProps {
  label?: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  className: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <textarea
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextareaInput;
