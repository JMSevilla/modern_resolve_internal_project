import { createSlice } from '@reduxjs/toolkit'
import api from '../common'
import handler from '../handling'
const initialState = { 
    userValue : '',
    isregSuccess : false
}
export const registrationSlice = createSlice({
    name : 'registration',
    initialState,
    reducers : {
        push_check : async (state, action) => {
           try { 
               await api.connect().post(`/api/user.php`, handler.HTTPHandling(action.payload))
               .then(resp => {
                state.userValue = resp.data
                localStorage.setItem('userValue', JSON.stringify(state.userValue))
               })
           } catch (error) {
               alert(error)
           } 
        },
        push_registration : (state, action) => {
            const request =
            api.connect().post(`/api/user.php`,
            handler.HTTPManual(action.payload))
            return request.then((res) => {
                if(res.data !== null) {
                    console.log(res.data)
                    state.isregSuccess = true
                    localStorage.setItem('regIsSuccess', state.isregSuccess)
                }
            })
        }
    }
})

export const {push_check, push_registration} = registrationSlice.actions
export default registrationSlice.reducer