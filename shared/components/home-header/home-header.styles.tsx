import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationIconWrapper: {
    position: "relative",
  },
  notificationDot: {
    height: 6,
    width: 6,
    backgroundColor: "red",
    position: "absolute",
    borderRadius: 100,
    right: 4,
    top: 2,
  },
});