import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        changeUser: (state, { payload }) => {
            return {...state, isLogged: true, user: payload};
        },
        logout: (state) => {
            return {...state, isLogged: false, user: null};
        },
    },
});

export const { changeUser, logout } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;