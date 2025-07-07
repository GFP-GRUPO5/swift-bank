import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const verificationCodeStyles = StyleSheet.create({
  logo: {
    alignItems: "center",
    marginTop: 56,
    marginBottom: 72
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 48,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 32,
    color: colors.typography.body,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.typography.body,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2c2c2c",
    padding: 16,
    borderRadius: 24,
    marginBottom: 32,
    position: "relative",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  }
})