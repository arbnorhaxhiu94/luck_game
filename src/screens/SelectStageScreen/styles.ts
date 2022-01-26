import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../assets/colors/colors";
import { SCREEN } from "../../config/Constants";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselContainer: {
        justifyContent: 'center',
        height: 540
    },
    stagesList: {
        width: SCREEN.width,
    },
    itemAnimatedView: {
        width: SCREEN.width,
        height: 540,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stageItem: {
        width: SCREEN.width * 3/4,
        height: SCREEN.width + 100,
        borderWidth: 5,
        borderRadius: 20,

        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: SCREEN.width*3/4-10, 
        height: SCREEN.width - 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    }
})