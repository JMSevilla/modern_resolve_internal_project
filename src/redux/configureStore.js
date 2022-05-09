import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import registrationReducer from './core/registrationSlice'
import loginReducer from './core/loginSlice'
import signoutReducer from './core/signoutSlice'
import branchReducer from './core/branchSlice'
import UAMReducer from './core/admin/usermanagementSlice'
import serverMiddleware from './middleware/serverMiddleware'

export default function store(){
    return configureStore({
        reducer:{
            user : registrationReducer,
            login : loginReducer,
            signout : signoutReducer,
            branch : branchReducer,
            uam : UAMReducer
        },
        middleware: [...getDefaultMiddleware(), serverMiddleware]
    })
}