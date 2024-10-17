import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/features/formSlice";

export const store=configureStore({
    reducer : {
        form : formReducer
    }
});