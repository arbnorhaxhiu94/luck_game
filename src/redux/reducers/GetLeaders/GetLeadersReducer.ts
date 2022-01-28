import { Leaders } from "../../../models/Leaders"
import { GetLeadersActionTypes } from "../../action-types/GetLeaders/GetLeadersActionTypes";
import { GetLeadersAction } from "../../actions/GetLeaders/GetLeaders";

export type GetLeadersStateType = {
    loading: boolean,
    data: Leaders[],
    error: string
}

const initialState: GetLeadersStateType = {
    loading: false,
    data: [],
    error: ''
}

export const GetLeadersReducer = (
    state = initialState,
    action: GetLeadersAction
): GetLeadersStateType => {
    switch (action.type) {
        case GetLeadersActionTypes.GET_LEADERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GetLeadersActionTypes.GET_LEADERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GetLeadersActionTypes.GET_LEADERS_ERROR:
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