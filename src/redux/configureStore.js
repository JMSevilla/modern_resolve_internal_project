import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import registrationReducer from './core/registrationSlice'
import loginReducer from './core/loginSlice'
import signoutReducer from './core/signoutSlice'
import branchReducer from './core/branchSlice'
import UAMReducer from './core/admin/usermanagementSlice'
import serverMiddleware from './middleware/serverMiddleware'
import developerReducer from './core/developerSlice'
import fetchReducer from './core/fetchSlice'

export default function store(){
    return configureStore({
        reducer:{
            user : registrationReducer,
            login : loginReducer,
            signout : signoutReducer,
            branch : branchReducer,
            uam : UAMReducer,
            developer : developerReducer,
            fetching : fetchReducer
        },
        middleware: [...getDefaultMiddleware(), serverMiddleware]
    })
}