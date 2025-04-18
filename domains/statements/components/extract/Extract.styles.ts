import { StyleSheet } from "react-native";

export const extractStyles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title:{
        color:"#2C2C2C"
    },
    balance: {
        fontSize: 24,
        fontWeight: "bold"
    },
    buttonFunctionWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 8,
        marginTop: 32
    }
})