import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/colors/colors";

export const styles = StyleSheet.create({
    dice: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'maroon',

        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    diceText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    whiteDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.WHITE
    }
});