import { UpdateUsernameActionTypes } from "../../action-types/UpdateUsername/UpdateUsernameActionTypes";
import { UpdateUsernameAction } from "../../actions/UpdateUsername/UpdateUsernameAction"

export type UpdateUsernameStateType = {
    loading: boolean,
    success: boolean,
    error: string
}

const initialState: UpdateUsernameStateType = {
    loading: false,
    success: false,
    error: ''
}

export const UpdateUsernameReducer = (
    state = initialState,
    action: UpdateUsernameAction
): UpdateUsernameStateType => {
    switch (action.type) {
        case UpdateUsernameActionTypes.UPDATE_USERNAME_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UpdateUsernameActionTypes.UPDATE_USERNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success
            }
        case UpdateUsernameActionTypes.UPDATE_USERNAME_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case UpdateUsernameActionTypes.UPDATE_USERNAME_DEFAULT_SETTINGS:
            return {
                loading: false,
                success: false,
                error: ''
            }
        default:
            return {
                ...state
            }
    }
}