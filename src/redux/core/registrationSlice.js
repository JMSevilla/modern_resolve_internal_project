import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/registrationAction";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = {
    // dev
    userValue : '',
    registrationSuccessMessage : '',
    registrationBoolean : false,
    // client
    clientUserValue : '',
    registrationSuccessMessageClient : '',
    registrationBooleanClient : false
}

const slice = createSlice({
    name: "registration",
    initialState,
    reducers : {
        // dev 
        userRequestReceived: (state, action) => {
           state.userValue = action.payload;
        },
        createUserSuccess : (state, action) => {
           state.registrationSuccessMessage = action.payload
        },
        // client
        clientRequestReceived: (state, action) => {
            state.clientUserValue = action.payload;
         },
        createClientSuccess : (state, action) => {
            state.registrationSuccessMessageClient = action.payload
         },

    }
})

export default slice.reducer
const {userRequestReceived, createUserSuccess, clientRequestReceived, createClientSuccess} = slice.actions 

// dev
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
// client
export const checkClient = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPHandling(object),
            onSuccess: clientRequestReceived.type,
        })
    )
}

export const pushCreateClient = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPManualClient(object),
            onSuccess: createClientSuccess.type,
        })
    )
}