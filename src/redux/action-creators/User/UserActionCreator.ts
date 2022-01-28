import { Dispatch } from "react"
import { UserActionTypes } from "../../action-types/User/UserActionTypes"
import { UserAction } from "../../actions/User/UserAction"
import firestore from '@react-native-firebase/firestore';
import { User } from "../../../models/User";

export const setUserData = (user: User) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionTypes.SET_USER_REQUEST
        });
        firestore()
            .collection('Leaders')
            .doc(user.id)
            .set({
                id: user.id,
                username: user.username,
                wins: user.wins
            })
            .then(() => {
                console.log('Id: '+user.id);
                console.log('Username: '+user.username);
                console.log('Wins: '+ user.wins);

                const newUser: User = {
                    id: user.id,
                    username: user.username,
                    wins: user.wins
                }

                dispatch({
                    type: UserActionTypes.SET_USER_SUCCESS,
                    payload: newUser
                });
            })
            .catch((e) => {
                dispatch({
                    type: UserActionTypes.SET_USER_ERROR,
                    error: e
                });
            })
    }
}