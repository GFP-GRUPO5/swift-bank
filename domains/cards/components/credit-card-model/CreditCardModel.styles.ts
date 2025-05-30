import { StyleSheet } from "react-native";

export const creditCardModelStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 184,
    backgroundColor: "#2C2C2C",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  contact: {
    alignSelf: "flex-end",
  },
  data:{
    alignItems:"flex-start"
  },
  text: {
    color: "#FFF",
  },
  infos: {
    flexDirection: "row",
    gap: 32
  }
})