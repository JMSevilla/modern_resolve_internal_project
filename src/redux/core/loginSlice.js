import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/Action";
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
            console.log(action.payload)
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
            if(localStorage.getItem('key_identifier') != 'unknown' || localStorage.getItem('key_identifier') != undefined || localStorage.getItem('key_identifier') != null) {

            }
            else{
                state.savedInfo.push({
                    fname : action.payload[0].key.fname,
                    lname : action.payload[0].key.lname,
                    uname : action.payload[0].key.uname,
                    role : action.payload[0].key.role,
                    uid : action.payload[0].key.uid
                })
                localStorage.setItem('keySaved', JSON.stringify(state.savedInfo))
            }
        },
        
    }
})

export default loginSlice.reducer
const {userLoginRequestReceived, tokenRouteIdentifier} = loginSlice.actions

export const pushLogin = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.loginURL,
            method : 'POST',
            data : handler.HTTPLogin(object),
            onSuccess : userLoginRequestReceived.type
        })
    )
}

export const authIdentify = (value) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.tokenizationURL,
            method : 'POST',
            data : handler.HTTPTokenIdentify(value),
            onSuccess : tokenRouteIdentifier.type
        })
    )
}

