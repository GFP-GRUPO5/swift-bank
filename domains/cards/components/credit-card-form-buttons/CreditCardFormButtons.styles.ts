import { StyleSheet } from "react-native";

export const creditCardFormButtonsStyles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 24,
  },
  button: {
    backgroundColor: "#2C2C2C",
    width: "40%",
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});