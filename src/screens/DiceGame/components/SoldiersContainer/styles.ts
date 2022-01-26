import { StyleSheet } from "react-native";
import { SCREEN } from "../../../../config/Constants";

export const styles = StyleSheet.create({
    box: {
        width: SCREEN.width/20,
        height: SCREEN.width/20,
        borderRadius: SCREEN.width/40,
    },
    soldiersContainer: {
        height: SCREEN.width/15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: { 
        width: SCREEN.width/20, 
        height: SCREEN.width/20 ,
    }
})