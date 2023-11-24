interface FileInputProps {
  label?: string;
  placeholder: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
  className: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  placeholder,
  onChange,
  type,
  className,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        className={`border border-gray-400 rounded-md p-2 ${className}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
