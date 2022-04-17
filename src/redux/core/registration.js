import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from '../common'
import handler from '../handling'
const initialState = {
    userValue : '',
    userValue1 : ''
}

export const checkUser = createAsyncThunk('check/user', async (object) => {
    const response = await client.connect().post('/api/user.php', handler.HTTPHandling(object))
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
    }
})
export const { } = registrationSlice.actions
export default registrationSlice.reducer