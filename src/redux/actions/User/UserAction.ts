import { User } from "../../../models/User";
import { UserActionTypes } from "../../action-types/User/UserActionTypes";

interface SetUserRequest {
    type: UserActionTypes.SET_USER_REQUEST
}

interface SetUserSuccess {
    type: UserActionTypes.SET_USER_SUCCESS,
    payload: User
}

interface SetUserError {
    type: UserActionTypes.SET_USER_ERROR,
    error: string
}

export type UserAction = SetUserRequest | SetUserSuccess | SetUserError;