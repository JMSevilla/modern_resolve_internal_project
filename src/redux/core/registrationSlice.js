import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/registrationAction";



const slice = createSlice({
    name: "registration",
    initialState: {
        userValue : ''
    },
    reducers : {
        userRequestReceived: (user, action) => {
            user.userValue = action.payload
        }
    }
})

export default slice.reducer
const {userRequestReceived} = slice.actions 
const url = "/api/user.php"

export const checkUser = (object) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            method : 'POST',
            data : object,
            onSuccess: userRequestReceived.type,
        })
    )
}