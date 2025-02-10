import {configureStore} from "@reduxjs/toolkit"
import authReducer from './authSlice'

export const store = configureStore({
    reducer:{
        authReducer
    }
})

export default store ;


// Now we will create a authentication slice for 
// keeping track that user is logged in or not 
// Go to authSlice.js