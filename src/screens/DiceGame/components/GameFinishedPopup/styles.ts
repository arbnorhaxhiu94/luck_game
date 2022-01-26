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
    },
    trophy: {
        width: 40,
        height: 40,
        marginBottom: 20,
        alignSelf: 'center'
    }
})