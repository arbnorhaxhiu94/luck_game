import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    rollButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',

        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    rollButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
});