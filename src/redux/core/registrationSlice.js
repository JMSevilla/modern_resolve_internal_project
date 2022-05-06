import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/Action";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = {
    userValue : '',
    registrationSuccessMessage : '',
    registrationBoolean : false,
    clientUserValue : '',
    registrationSuccessMessageClient : '',
    registrationBooleanClient : ''
}

const slice = createSlice({
    name: "registration",
    initialState,
    reducers : {
        userRequestReceived: (state, action) => {
           state.userValue = action.payload;
        },
        createUserSuccess : (state, action) => {
            state.registrationSuccessMessage = action.payload;
        },
        clientRequestReceived: (state, action) => {
            state.clientUserValue = action.payload;
        },
        createClientSuccess : (state, action) => {
            state.registrationSuccessMessageClient = action.payload;
        }
    }
})

export default slice.reducer
const {userRequestReceived, createUserSuccess, clientRequestReceived, createClientSuccess} = slice.actions 

export const checkUser = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.checkuserURL,
            method : 'POST',
            data : handler.HTTPHandling(object),
            onSuccess: userRequestReceived.type,
        })
    )
}

export const checkClient = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.checkuserURL,
            method : 'POST',
            data : handler.HTTPHandling(object),
            onSuccess: clientRequestReceived.type,
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