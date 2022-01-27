import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/colors/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.WHITE,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 2
    },
    trophy: {
        width: 30,
        height: 30
    },
    winsContainer: {
        width: 40, 
        alignItems: 'center'
    }
})