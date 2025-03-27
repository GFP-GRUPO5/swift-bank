import { TextInputProps } from "react-native";
import { textInputStyles } from "./TextInput.styles";

interface Props extends TextInputProps {}

export function TextInput({ ...props }: Props) {
  return (
    <TextInput style={textInputStyles.input} { ...props } />
  )
}
