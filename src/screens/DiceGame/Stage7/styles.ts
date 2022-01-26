import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/colors/colors";
import { SCREEN } from "../../../config/Constants";

export const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'space-between',
        backgroundColor: Colors.BROWN
    },
    buttonDiceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    stageBackgroundImage: {
        position: 'absolute',
        width: SCREEN.width,
        height: SCREEN.width,
        backgroundColor: 'lightblue',
    },
    stageContainer: {
        width: SCREEN.width,
        height: SCREEN.width,
        borderRadius: 15,
        backgroundColor: 'lightblue',
        overflow: 'hidden',
        paddingLeft: 5
    },
    resultContainer: {
        position: 'absolute',
        flexDirection: 'row',
        right: 0,
        top: SCREEN.width/2 - 15,
        transform: [
            {rotate: '90deg'}
        ]
    },
    resultText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.DARK_BLUE
    }
});