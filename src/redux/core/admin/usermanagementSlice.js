import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../redux/actions/Action";
import handler from '../../handling'
import {baseURLMiddleware} from '../../middleware/urlMiddleware'

export const initialState = { 
    uamMessage : null
}

const usermanagementSlice = createSlice({
    name : "user_management",
    initialState,
    reducers : {
        userCreateReceived : (state, action) => {
            state.uamMessage = action.payload
        }
    }
})

export default usermanagementSlice.reducer
const {userCreateReceived} = usermanagementSlice.actions

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