import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import filterReducer from './slices/filterSlice'
const store = configureStore({
    reducer: {
        filter: filterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store