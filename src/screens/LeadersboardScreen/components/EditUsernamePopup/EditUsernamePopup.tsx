import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import TextInput from "../../../../components/TextInput";
import { styles } from "./styles";

interface EditUsernamePopupProps {
    visible: boolean,
    closePopup(): void
}

const EditUsernamePopup = ({
    visible,
    closePopup
}: EditUsernamePopupProps) => {

    const [ username, setUsername ] = useState<string>('');

    return (
        <Modal 
            transparent
            visible={visible}
            onRequestClose={() => {return}} >
            <TouchableWithoutFeedback 
                onPress={closePopup}
                style={{flex: 1, zIndex: 1}} >
                <View style={styles.screen}>
                    <View style={[styles.container, {zIndex: 2}]}>
                        <Text 
                            text={'Edit username'}
                            textAlign={'center'}
                            fontWeight={'bold'}
                            fontSize={16}
                            color={Colors.DARK_BLUE_EXTREME} />
                        <View style={{height: 20}} />
                        <TextInput 
                            placeholder={'Type your username...'}
                            onChangeText={(text) => setUsername(text)} />
                        <View style={{height: 20}} />
                        <Button 
                            text={'Confirm'}
                            onPress={closePopup}
                            width={'100%'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default EditUsernamePopup;