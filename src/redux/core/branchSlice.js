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
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getBranches.fulfilled, (state, action) => {
            state.branchList = action.payload
        })
    }
})

export default branchSlice.reducer
const {TokenrouteReceived} = branchSlice.actions;


export const pushTokenRouteUpdate = (obj) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url : baseURLMiddleware.tokenRouteUpdater,
            method : 'POST',
            data : handler.HTTPTokenupdater(obj),
            onSuccess : TokenrouteReceived.type
        })
    )
}

export const getBranches = createAsyncThunk('get/branches', async (value) => {
    const response = await client.connect().post(baseURLMiddleware.branchURL, handler.HTTPBranch(value))
    return response.data
})
