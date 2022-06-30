import {createSlice} from "@reduxjs/toolkit";
import handler from '../handling'
import { apiCallBegan } from "../actions/Action";
import { baseURLMiddleware, baseURLMiddlewareHelper } from "../middleware/urlMiddleware";
import API from '../common'

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

export const checkdev = (username) => (dispatch) => {
    API.connect().get(
        baseURLMiddlewareHelper('mdrusers/usercheck', username)
    ).then(responses => {
        dispatch(check_account_received(responses.data))
    })
}

export const create_developers_account = (object) => (dispatch) => {
    API.connect().post(
        'mdrusers/devregistration',
        handler.HTTPManual(object)
    ).then(response => {
        dispatch(create_account_received(response.data))
    })
}
