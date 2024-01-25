import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";

const store = configureStore({
    reducer: {
        loaders: loadersSlice.reducer,
        },
})

export default store;