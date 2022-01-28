import { User } from "../../../models/User";
import { UserActionTypes } from "../../action-types/User/UserActionTypes";
import { UserAction } from "../../actions/User/UserAction";

export type UserStateType = {
    loading: boolean,
    user: User | null,
    error: string
}

const initialState: UserStateType = {
    loading: false,
    user: null,
    error: ''
}

export const UserReducer = (
    state = initialState,
    action: UserAction
): UserStateType => {
    switch (action.type) {
        case UserActionTypes.SET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UserActionTypes.SET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case UserActionTypes.SET_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}