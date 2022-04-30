import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/registrationAction";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = { 
    token : null, 
    loginSuccess : false
}

const loginSlice = createSlice({
    name : "login", 
    initialState,
    reducers : {
        userLoginRequestReceived : (state, action) => {
            state.token = action.payload
            state.loginSuccess = true
        }
    }
})

export default loginSlice.reducer
const {userLoginRequestReceived} = loginSlice.actions

export const pushLogin = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPLogin(object),
            onSuccess : userLoginRequestReceived.type
        })
    )
}