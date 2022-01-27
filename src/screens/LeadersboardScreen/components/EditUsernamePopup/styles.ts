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
        width: '90%',
        paddingTop: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    }
})