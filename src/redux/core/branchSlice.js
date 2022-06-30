import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handler from '../handling'
import {baseURLMiddleware, baseURLMiddlewareHelper} from '../middleware/urlMiddleware'
import API from '../common'
import { localstorageHelper } from "./data/storage";
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
    API.connect().put(`developers/branchroute/pushroute/uid/${localstorageHelper.load('key_identifier')}`, {
        route : route
    }).then(res => {
      console.log(res.data)
       dispatch(TokenrouteReceived(res.data))
    })
}

export const getBranches = () => (dispatch) => {
   API.connect().get(
    'developers/branch/getallbranches'
   ).then(response => {
    dispatch(branchReceived(response.data))
   })
}
