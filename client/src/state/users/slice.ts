import { createSlice } from "@reduxjs/toolkit";

import * as usersActions from "./actions";

const initialState: UsersState = {
    users: [],
    isSuccess: false,
    isLoading: false,
    isError: false
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearState(state) {
            state.users = [];
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersActions.getAllUsers.pending, (state: UsersState) => {
                state.isLoading = true;
            })
            .addCase(usersActions.getAllUsers.fulfilled, (state: UsersState, action) => {
                state.users = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(usersActions.getAllUsers.rejected, (state: UsersState) => {
                state.users = [];
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
    }
});

export const { clearState } = usersSlice.actions;

export const usersSelector = (state: { users: UsersState }) => state.users;
