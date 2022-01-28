import { UpdateUsernameActionTypes } from "../../action-types/UpdateUsername/UpdateUsernameActionTypes";

interface UpdateUsernameRequest {
    type: UpdateUsernameActionTypes.UPDATE_USERNAME_REQUEST
}

interface UpdateUsernameSuccess {
    type: UpdateUsernameActionTypes.UPDATE_USERNAME_SUCCESS,
    success: boolean
}

interface UpdateUsernameError {
    type: UpdateUsernameActionTypes.UPDATE_USERNAME_ERROR,
    error: string
}

interface UpdateUsernameDefaultSettings {
    type: UpdateUsernameActionTypes.UPDATE_USERNAME_DEFAULT_SETTINGS
}

export type UpdateUsernameAction = UpdateUsernameRequest | 
                                    UpdateUsernameSuccess | 
                                    UpdateUsernameError | 
                                    UpdateUsernameDefaultSettings;