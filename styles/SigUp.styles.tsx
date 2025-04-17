import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 56,
    textAlign: "center",
    marginBottom: 72,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 20,
    color: colors.typography.body,
    fontWeight: "400",
    marginBottom: 32,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.typography.body,
    marginBottom: 8,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 8,
  },
  passwordConfirmedContainer: {
    position: "relative",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  forgotPasswordLink: {
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: 12,
    color: colors.typography.body,
    paddingRight: 8,
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
  },
  loadingIndicator: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  signInText: {
    fontSize: 16,
    color: colors.typography.body,
    textAlign: "center",
    marginBottom: 8,
  },
  signInLink: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "center",
    color: colors.typography.body,
  },
  checkbox: {
    margin: 8,
    textAlign: "center",
  },
  policyText: {
    fontSize: 14,
    color: colors.typography.body,
    textAlign: "center",
    marginBottom: 8,
  },
  policyContainer: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
  },
});
