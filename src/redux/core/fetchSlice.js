import { createSlice } from '@reduxjs/toolkit'
import { baseURLMiddleware } from '../middleware/urlMiddleware'
import { apiCallBegan } from '../actions/Action'

export const initialState = { 
    userlist : []
}

const fetchSlice = createSlice({
    name : 'fetch',
    initialState,
    reducers : {
        userlistReceived : (state, action) => {
            state.userlist = action.payload
        }
    }
})

export default fetchSlice.reducer
const { userlistReceived } = fetchSlice.actions

export const get_request_userlist = (obj) => (dispatch) => {
    var data = new FormData()
    data.append('uamlistState', obj.trigger)
    return dispatch (
        apiCallBegan({
            url : baseURLMiddleware.UAMGetdev,
            method : 'POST',
            data : data,
            onSuccess : userlistReceived.type
        })
    )
}