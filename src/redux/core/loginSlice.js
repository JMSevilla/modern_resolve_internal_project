import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/Action";
import handler from '../handling'
import {baseURLMiddleware, baseURLMiddlewareHelper} from '../middleware/urlMiddleware'
import API from '../common'
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
            state.token = action.payload.message == undefined || action.payload.message == null ? action.payload : action.payload.message
            state.loginSuccess = true
            // //push array to saved fetch infoes
            state.savedInfo.push({
                fname : action.payload.fname,
                lname : action.payload.lname,
                uname : action.payload.uname,
                role : action.payload.role,
                uid : action.payload.uid
            })
            localStorage.setItem('keySaved', JSON.stringify(state.savedInfo))
        },
        tokenRouteIdentifier : (state, action) => {
            state.initialRoute = action.payload
            if(localStorage.getItem('key_identifier') != 'unknown' || localStorage.getItem('key_identifier') != undefined || localStorage.getItem('key_identifier') != null) {

            }
            else{
                state.savedInfo.push({
                    fname : action.payload[1].fname,
                    lname : action.payload[1].lname,
                    uname : action.payload[1].uname,
                    role : action.payload[1].role,
                    uid : action.payload[1].uid
                })
                localStorage.setItem('keySaved', JSON.stringify(state.savedInfo))
            }
        },

    }
})

export default loginSlice.reducer
const {userLoginRequestReceived, tokenRouteIdentifier} = loginSlice.actions

export const pushLogin = (object) => (dispatch) => {
    API.connect().post(
        'developers/devlogin',
        handler.HTTPLogin(object)
    ).then(response => {
        dispatch(userLoginRequestReceived(response.data))
    })
}

export const authIdentify = (value) => (dispatch) => {
    API.connect().get(
        `developers/tokenidentify/${value}`
        ).then(response => {
            console.log(response.data)
            dispatch(tokenRouteIdentifier(response.data))
        })
}
