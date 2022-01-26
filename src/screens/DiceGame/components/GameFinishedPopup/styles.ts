import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/colors/colors";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.TRANSPARENT_SHADOW
    },
    container: {
        width: '80%',
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    buttonsContainer: {
        flexDirection: 'row'
    }
})