import {configureStore} from '@reduxjs/toolkit';
import propertySlice from "./PropertySlice"
export const Store = configureStore({
    reducer: {
        property : propertySlice
    },
    
})