import { Dispatch } from "react";
import { User } from "../../../models/User";
import { UpdateUsernameActionTypes } from "../../action-types/UpdateUsername/UpdateUsernameActionTypes";
import { UpdateUsernameAction } from "../../actions/UpdateUsername/UpdateUsernameAction";
import firestore from '@react-native-firebase/firestore';

export const updateUsername = (user: User) => {
    return async(dispatch: Dispatch<UpdateUsernameAction>) => {
        dispatch({
            type: UpdateUsernameActionTypes.UPDATE_USERNAME_REQUEST
        });
        await firestore()
        .collection('Leaders')
        .doc(user.id)
        .set({
            id: user.id,
            username: user.username,
            wins: user.wins
        })
        .then(() => {
            dispatch({
                type: UpdateUsernameActionTypes.UPDATE_USERNAME_SUCCESS,
                success: true
            });
        })
        .catch((e) => {
            dispatch({
                type: UpdateUsernameActionTypes.UPDATE_USERNAME_ERROR,
                error: e
            });
        })
    }
}