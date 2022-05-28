import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../redux/actions/Action";
import handler from '../../handling'
import {baseURLMiddleware} from '../../middleware/urlMiddleware'

export const initialState = { 
    uamMessage : null,
    uamList : []
}
// uamlistState
const usermanagementSlice = createSlice({
    name : "user_management",
    initialState,
    reducers : {
        userCreateReceived : (state, action) => {
            state.uamMessage = action.payload
        },
        uamGetReceived : (state, action) => {
            state.uamList = action.payload
        }
    }
})

export default usermanagementSlice.reducer
const {userCreateReceived, uamGetReceived} = usermanagementSlice.actions

export const pushCreateUsermanagement = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.UAMPostdev,
            method : 'POST',
            data : handler.HTTPUAM(object),
            onSuccess : userCreateReceived.type
        })
    )
}

export const fetchListUsermanagement = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.UAMGetdev,
            method : 'POST',
            data : handler.HTTPUAMList(),
            onSuccess : uamGetReceived.type
        })
    )
}