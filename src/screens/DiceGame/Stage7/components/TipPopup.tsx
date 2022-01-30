import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Colors } from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";

interface TipPopupProps {
    visible: boolean,
    closePopup(): void
}

export const TipPopup = ({
    visible,
    closePopup
}: TipPopupProps) => {
    return (
        <Modal 
            transparent
            visible={visible}
            onRequestClose={() => {return}} >
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Text 
                        text={'Important tip'}
                        textAlign={'center'}
                        fontSize={22}
                        fontWeight={'bold'}
                        color={Colors.ORANGE} />
                    <View style={{height: 20}} />
                    <Text 
                        text={'Final stage is different.\n Whoever gets two times at the cup first, will win.'}
                        textAlign={'center'}
                        fontSize={14}
                        color={Colors.DARK_BLUE_EXTREME} />
                    <View style={{height: 20}} />
                    <Button 
                        text={'GOT IT'}
                        onPress={closePopup}
                        width={'100%'} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    }
})