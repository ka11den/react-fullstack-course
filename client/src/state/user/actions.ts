import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiService } from "../../axios.api";
import { clearState } from "./slice";

export const signup = createAsyncThunk<void, UserAPI.SignupForm, { rejectValue: string }>(
    "user/signup",
    async function (form, thunkAPI) {
        try {
            await ApiService.post("/signup", form);
            toast.success("Аккаунт успешно создан");
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const signin = createAsyncThunk<User, UserAPI.SigninForm, { rejectValue: string }>(
    "user/signin",
    async function (form, thunkAPI) {
        try {
            return await ApiService.post("/signin", form);
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMyData = createAsyncThunk<User>(
    "user/getMyData",
    async function (_, thunkAPI) {
        try {
            return await ApiService.get("/me");
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const signout = createAsyncThunk<User>(
    "user/signout",
    async function (_, thunkAPI) {
        try {
            thunkAPI.dispatch(clearState);
            return await ApiService.get("/signout");
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateUser = createAsyncThunk<User, UserAPI.UpdateUserForm>(
    "user/update",
    async function (form, thunkAPI) {
        try {
            const res = await ApiService.patch(`/user`, form);
            toast.success("Данные успешно обновлены");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePassword = createAsyncThunk<User, UserAPI.UpdatePasswordForm>(
    "user/update/password",
    async function (form, thunkAPI) {
        try {
            const res = await ApiService.patch(`/user/password`, form);
            toast.success("Пароль успешно обновлен");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

