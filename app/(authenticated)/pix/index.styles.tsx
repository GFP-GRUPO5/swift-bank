import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  hintText: {
    fontSize: 12,
    textAlign: "right",
    color: "#555",
    marginBottom: 64,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 16,
    backgroundColor: "#2c2c2c",
    borderRadius: 4,
    marginTop: "auto",
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
  loading: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});