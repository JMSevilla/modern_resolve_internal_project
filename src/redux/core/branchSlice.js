import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handler from '../handling'
import {baseURLMiddleware} from '../middleware/urlMiddleware'
import client from '../common'
import { apiCallBegan } from "../actions/Action";
export const initialState = {
    branchList : [],
    branchMessage : null
}



const branchSlice = createSlice({
    name : 'branch',
    initialState,
    reducers : {
        TokenrouteReceived : (state, action) => {
            state.branchMessage = action.payload
        },
        branchReceived : (state, action) => {
            state.branchList = action.payload
        }
    },
})

export default branchSlice.reducer
const {TokenrouteReceived, branchReceived} = branchSlice.actions;


export const pushTokenRouteUpdate = (route) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.tokenRouteUpdater,
            method : 'POST',
            data : handler.HTTPTokenupdater(route),
            onSuccess : TokenrouteReceived.type
        })
    )
}

export const getBranches = (value) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.branchURL,
            method : 'POST',
            data : handler.HTTPBranch(value),
            onSuccess : branchReceived.type
        })
    )
}
