import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/registrationAction";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'

export const initialState = { 
    token : null, 
    loginSuccess : false,
    initialRoute : '',
    savedInfo : []
}

const loginSlice = createSlice({
    name : "login", 
    initialState,
    reducers : {
        userLoginRequestReceived : (state, action) => {
            state.token = action.payload
            state.loginSuccess = true
            //push array to saved fetch infoes
            state.savedInfo.push({
                fname : action.payload[0].key.fname,
                lname : action.payload[0].key.lname,
                uname : action.payload[0].key.uname,
                role : action.payload[0].key.role,
                uid : action.payload[0].key.uid
            })
            localStorage.setItem('keySaved', JSON.stringify(state.savedInfo))
        },
        tokenRouteIdentifier : (state, action) => {
            state.initialRoute = action.payload
            state.savedInfo.push({
                fname : action.payload[0].key.fname,
                lname : action.payload[0].key.lname,
                uname : action.payload[0].key.uname,
                role : action.payload[0].key.role,
                uid : action.payload[0].key.uid
            })
            localStorage.setItem('keySaved', JSON.stringify(state.savedInfo))
        },
        
    }
})

export default loginSlice.reducer
const {userLoginRequestReceived, tokenRouteIdentifier, dumpRequestReceived} = loginSlice.actions

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

export const authIdentify = (value) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPTokenIdentify(value),
            onSuccess : tokenRouteIdentifier.type
        })
    )
}

