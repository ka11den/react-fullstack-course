import { createSlice } from "@reduxjs/toolkit";

import * as userActions from "./actions";

const initialState: UserState = {
    user: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    isAuth: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearState(state) {
            state.user = null;
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            state.isAuth = false;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userActions.signup.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.signup.fulfilled, (state: UserState) => {
                state.user = null;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = false;
            })
            .addCase(userActions.signup.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
            .addCase(userActions.signin.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.signin.fulfilled, (state: UserState, action) => {
                state.user = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = true;
            })
            .addCase(userActions.signin.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
            .addCase(userActions.getMyData.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.getMyData.fulfilled, (state: UserState, action) => {
                state.user = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = true;
            })
            .addCase(userActions.getMyData.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
            .addCase(userActions.signout.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.signout.fulfilled, (state: UserState, action) => {
                state.user = null;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = false;
            })
            .addCase(userActions.updateUser.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.updateUser.fulfilled, (state: UserState, action) => {
                state.user = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = true;
            })
            .addCase(userActions.updateUser.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
            .addCase(userActions.restoreAccaunt.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.restoreAccaunt.fulfilled, (state: UserState) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = false;
            })
            .addCase(userActions.restoreAccaunt.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
            .addCase(userActions.resetPassword.pending, (state: UserState) => {
                state.isLoading = true;
            })
            .addCase(userActions.resetPassword.fulfilled, (state: UserState) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.isAuth = false;
            })
            .addCase(userActions.resetPassword.rejected, (state: UserState) => {
                state.user = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.isAuth = false;
            })
    }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: { user: UserState }) => state.user;
