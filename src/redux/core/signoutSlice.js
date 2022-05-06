import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/Action";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = { 
    signoutMessage : null
}

const signoutSlice = createSlice({
    name: 'signout',
    initialState,
    reducers : {
        signoutRequestReceived : (state, action) => {
            state.signoutMessage = action.payload
        }
    }
})

export default signoutSlice.reducer
const { signoutRequestReceived } = signoutSlice.actions

export const pushSignout = (uid) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.signoutURL,
            method: 'POST',
            data : handler.HTTPSignout(uid),
            onSuccess : signoutRequestReceived.type
        })
    )
}