import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from '../common'
import handler from '../handling'
const initialState = {
    userValue : '',
    registrationSuccessMessage : ''
}

export const checkUser = createAsyncThunk('check/user', async (object) => {
    const response = await client.connect().post('/api/user.php', handler.HTTPHandling(object))
    return response.data
})
export const createUser = createAsyncThunk('push/registration',
async (object) => {
    const response = await client.connect().post('/api/user.php',
    handler.HTTPManual(object))
    return response.data
})
const registrationSlice = createSlice({
    name : 'registration',
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(checkUser.fulfilled, (state, action) => {
            state.userValue = action.payload
        })
        .addCase(createUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.registrationSuccessMessage = action.payload
            console.log(state.registrationSuccessMessage)
        })
    }
})
export const { } = registrationSlice.actions
export default registrationSlice.reducer