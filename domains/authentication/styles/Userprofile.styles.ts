import { StyleSheet } from "react-native";

export const UserProfileStyle = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: "700"
    },
    settingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 8
    },
    textInputName: {
        width: 170,
        borderWidth: 1,
        borderColor: "#2C2C2C",
        borderRadius: 8,
        padding: 8,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8
    },
    textEmail: {
        marginBottom: 8
    },
    textSubtitle: {
        fontWeight: "600",
    },
    passwordContainer: {
        position: 'relative',
        width: 170

    },
    textInputPassword: {
        borderWidth: 1,
        borderColor: "#2C2C2C",
        borderRadius: 8,
        padding: 8,
        width: 170,
        marginBottom: 8
    },
    textInputNewPassword: {
        borderWidth: 1,
        borderColor: "#2C2C2C",
        borderRadius: 8,
        padding: 8,
        width: 170
    },
    eyeIcon: {
        position: 'absolute',
        right: 8,
        top: 14
    },
    containerNewPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8
    },
    textButtonChangePassword: {
        color: '#FFF',
        fontWeight: "600"
    },
    buttonCreateNewAccount: {
        backgroundColor: "#2C2C2C",
        padding: 16,
        marginTop: 16,
        borderRadius: 24
    },
    textButtonCreateNewAccount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        alignSelf: "center"
    },
    containerAccount: {
        marginVertical: 16,
        position: 'relative',
        gap: 8
    },
    greenIndicator: {
        position: 'absolute',
        top: 16,
        right: 16,
        height: 8,
        width: 8,
        borderRadius: 6,
        backgroundColor: '#A7C957',
    },
    titleAccount: {
        marginBottom: 8,
        fontWeight: "700",
        fontSize: 16
    },
    buttonLogOut: {
        backgroundColor: "#F4442E",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 24,
        marginBottom: 16
    },
    textButtonLogOut: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 700
    }
})