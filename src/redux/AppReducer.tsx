import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    onboard:false,
    user:{}
};



export const AppSlice = createSlice({
    name: "AppReducer",
    initialState,
    reducers: {

        setisLoggedin: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setOnboard: (state, action) => {
            state.onboard = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
     

    },
});

export const {

    setisLoggedin,
    setOnboard,
    setUser

} = AppSlice.actions;

export default AppSlice.reducer;