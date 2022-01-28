import React, { Dispatch, useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Colors } from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import TextInput from "../../../../components/TextInput";
import { actionCreators, State } from "../../../../redux";
import { UpdateUsernameActionTypes } from "../../../../redux/action-types/UpdateUsername/UpdateUsernameActionTypes";
import { UpdateUsernameAction } from "../../../../redux/actions/UpdateUsername/UpdateUsernameAction";
import { UpdateUsernameStateType } from "../../../../redux/reducers/UpdateUsername/UpdateUsernameReducer";
import { UserStateType } from "../../../../redux/reducers/User/UserReducer";
import LoadingView from "../../../LoadingView";
import { styles } from "./styles";

interface EditUsernamePopupProps {
    visible: boolean,
    closePopup(): void
}

const EditUsernamePopup = ({
    visible,
    closePopup
}: EditUsernamePopupProps) => {

    const dispatch1 = useDispatch<Dispatch<UpdateUsernameAction>>();

    const dispatch = useDispatch();
    const { setUserData, updateUsername, getLeaders } = bindActionCreators(actionCreators, dispatch);

    const userState: UserStateType = useSelector((state: State) => state.userReducer);
    const updateUsernameState: UpdateUsernameStateType = useSelector((state: State) => state.updateUsernameReducer);

    const [ username, setUsername ] = useState<string>('');

    useEffect(() => {
        if (updateUsernameState.success) {
            if (userState.user) {
                setUserData({
                    id: userState.user.id,
                    username: username,
                    wins: userState.user.wins
                });
            }
            getLeaders();
        }
    }, [updateUsernameState.success])

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
                        {updateUsernameState.loading ? 
                        <LoadingView />
                        : updateUsernameState.error ?
                        <>
                            <Text 
                                text={userState.error}
                                textAlign={'center'}
                                color={Colors.ORANGE} />
                            <View style={{height: 20}} />
                            <Button 
                                text={'OK'}
                                width={'100%'}
                                onPress={() => {
                                    dispatch1({
                                        type: UpdateUsernameActionTypes.UPDATE_USERNAME_DEFAULT_SETTINGS
                                    });
                                    closePopup();
                                }} />
                        </>
                        : updateUsernameState.success ? 
                        <>
                            <Text 
                                text={'Username updated successfully.'}
                                textAlign={'center'}
                                color={Colors.GREEN} />
                            <View style={{height: 20}} />
                            <Button 
                                text={'OK'}
                                width={'100%'}
                                onPress={() => {
                                    dispatch1({
                                        type: UpdateUsernameActionTypes.UPDATE_USERNAME_DEFAULT_SETTINGS
                                    });
                                    closePopup();
                                }} />
                        </>
                        :
                        <>
                            <TextInput 
                                placeholder={'Type your new username...'}
                                onChangeText={(text) => setUsername(text)} />
                            <View style={{height: 20}} />
                            <Button 
                                text={'Confirm'}
                                onPress={() => {
                                    if (userState.user) {
                                        updateUsername({
                                            id: userState.user.id,
                                            username: username,
                                            wins: userState.user.wins
                                        });
                                    }
                                }}
                                width={'100%'} />
                        </>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default EditUsernamePopup;