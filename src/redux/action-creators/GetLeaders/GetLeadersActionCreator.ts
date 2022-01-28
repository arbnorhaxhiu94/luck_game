import { Dispatch } from "react"
import { GetLeadersActionTypes } from "../../action-types/GetLeaders/GetLeadersActionTypes"
import { GetLeadersAction } from "../../actions/GetLeaders/GetLeaders"
import firestore from '@react-native-firebase/firestore';
import { Leaders } from "../../../models/Leaders";

export const getLeaders = () => {
    return async(dispatch: Dispatch<GetLeadersAction>) => {
        dispatch({
            type: GetLeadersActionTypes.GET_LEADERS_REQUEST
        });
        await firestore()
            .collection('Leaders')
            .orderBy('wins', 'desc')
            .limit(20)
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                let leaders: Leaders[] = [];
            
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    console.log(typeof(documentSnapshot.data().id))
                    let leader: Leaders = {
                        id: documentSnapshot.data()?.id,
                        username: documentSnapshot.data()?.username,
                        wins: documentSnapshot.data()?.wins
                    }
                    leaders.push(leader);
                });

                dispatch({
                    type: GetLeadersActionTypes.GET_LEADERS_SUCCESS,
                    payload: leaders
                });
            })
            .catch((e) => {
                dispatch({
                    type: GetLeadersActionTypes.GET_LEADERS_ERROR,
                    error: e
                });
            })
    }
}