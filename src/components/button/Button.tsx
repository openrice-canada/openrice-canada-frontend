type ButtonProps = {
    title: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button