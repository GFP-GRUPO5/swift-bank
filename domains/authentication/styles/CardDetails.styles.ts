import { StyleSheet } from "react-native";

export const cardDetailsStyle = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    selectedCard: {
        backgroundColor: "#2C2C2C",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 12
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:16
    },
    text:{
        color:"#2C2C2C"
    },
    selectedText:{
        color:"#FFF"
    },
    info:{
        flexDirection: "row", 
        gap: 32, 
        marginTop: 4
    }
})