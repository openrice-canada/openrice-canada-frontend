interface FileInputProps {
  label?: string;
  placeholder: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
  className: string;
  labelClassName?: string;
  fileInputRef?: React.LegacyRef<HTMLInputElement>;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  placeholder,
  onChange,
  type,
  className,
  labelClassName,
  fileInputRef,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={`${
            labelClassName
              ? `text-sm font-semibold ${labelClassName}`
              : "text-sm font-semibold"
          }`}
        >
          {label}
        </label>
      )}
      {fileInputRef ? (
        <input
          className={`border border-gray-400 rounded-md p-2 ${className}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={fileInputRef}
        />
      ) : (
        <input
          className={`border border-gray-400 rounded-md p-2 ${className}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FileInput;
