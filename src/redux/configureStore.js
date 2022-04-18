import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import registrationReducer from './core/registrationSlice'
import serverMiddleware from './middleware/serverMiddleware'

export default function store(){
    return configureStore({
        reducer:{
            user : registrationReducer
        },
        middleware: [...getDefaultMiddleware(), serverMiddleware]
    })
}