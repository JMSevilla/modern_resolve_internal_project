import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/registrationAction";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = {
    userValue : '',
    registrationSuccessMessage : '',
    registrationBoolean : false
}

const slice = createSlice({
    name: "registration",
    initialState,
    reducers : {
        userRequestReceived: (state, action) => {
           state.userValue = action.payload;
        },
        createUserSuccess : (state, action) => {
           state.registrationSuccessMessage = action.payload
            
        }
    }
})

export default slice.reducer
const {userRequestReceived, createUserSuccess} = slice.actions 

export const checkUser = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPHandling(object),
            onSuccess: userRequestReceived.type,
        })
    )
}

export const pushCreateDev = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPManual(object),
            onSuccess: createUserSuccess.type,
        })
    )
}