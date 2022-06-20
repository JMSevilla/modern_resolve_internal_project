import {createSlice} from "@reduxjs/toolkit";
import handler from '../handling'
import { apiCallBegan } from "../actions/Action";
import { baseURLMiddleware } from "../middleware/urlMiddleware";


export const initialState ={ 
    create_response : '',
    check_response : ''
}

const developerSlice = createSlice({
    name : 'developer',
    initialState,
    reducers:{
        create_account_received : (state, action) => {
            state.create_response = action.payload
        },
        check_account_received : (state, action) => {
            state.check_response = action.payload
        }
    }
})

export default developerSlice.reducer
const { create_account_received, check_account_received } = developerSlice.actions

export const checkdev = (object, trigger) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.checkuserURL,
            method : 'POST',
            data : handler.HTTPCheckDeveloper(object, trigger),
            onSuccess : check_account_received.type
        })
    )
}

export const create_developers_account = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.userURL,
            method : 'POST',
            data : handler.HTTPManual(object),
            onSuccess : create_account_received.type
        })
    )
}
