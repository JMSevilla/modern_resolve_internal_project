import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import registrationReducer from './core/registration'
export default configureStore({
    reducer : {
        user : registrationReducer
    }
})