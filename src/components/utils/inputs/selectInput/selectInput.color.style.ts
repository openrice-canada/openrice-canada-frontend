import { StylesConfig } from "react-select";
import { Category } from "./SelectInput";

export const selectInputColourStyles: StylesConfig<Category, false> = {
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? "#333333" : "#9ca3af",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#333333",
      borderWidth: "0.15rem",
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#333333"
        : isFocused
        ? "#E5E7EB"
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#333333"
            : "#E5E7EB"
          : undefined,
      },
    };
  },
};
