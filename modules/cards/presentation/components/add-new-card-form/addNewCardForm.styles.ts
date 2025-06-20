import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const addNewCardFormStyles = StyleSheet.create({
  wrapper: {
    gap: 16,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.typography.body
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2C2C2C",
    marginBottom: 8,
  },
  info: {
    flexDirection: "row",
    gap: 32,
  },
  fieldContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#2c2c2c",
    padding: 16,
    borderRadius: 24,
  },
});
