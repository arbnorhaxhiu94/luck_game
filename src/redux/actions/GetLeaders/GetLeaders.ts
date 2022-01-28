import { Leaders } from "../../../models/Leaders";
import { GetLeadersActionTypes } from "../../action-types/GetLeaders/GetLeadersActionTypes";

interface GetLeadersRequest {
    type: GetLeadersActionTypes.GET_LEADERS_REQUEST
}

interface GetLeadersSuccess {
    type: GetLeadersActionTypes.GET_LEADERS_SUCCESS,
    payload: Leaders[]
}

interface GetLeadersError {
    type: GetLeadersActionTypes.GET_LEADERS_ERROR,
    error: string
}

export type GetLeadersAction = GetLeadersRequest | GetLeadersSuccess | GetLeadersError;