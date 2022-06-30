import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/Action";
import handler from '../handling'
import {baseURLMiddleware, baseURLMiddlewareHelper} from '../middleware/urlMiddleware'
import API from '../common'

export const initialState = {
    signoutMessage : null
}

const signoutSlice = createSlice({
    name: 'signout',
    initialState,
    reducers : {
        signoutRequestReceived : (state, action) => {
            state.signoutMessage = action.payload
        }
    }
})

export default signoutSlice.reducer
const { signoutRequestReceived } = signoutSlice.actions

export const pushSignout = (uid) => (dispatch) => {
    API.connect().put(
      baseURLMiddlewareHelper('developers/devbranch/signout/uid', uid)
    ).then(response => {
      dispatch(signoutRequestReceived(response.data))
    })
}
