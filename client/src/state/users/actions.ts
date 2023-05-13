import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ApiService } from "../../axios.api";

export const getAllUsers = createAsyncThunk<User[]>(
    "users/getAll",
    async function (_, thunkAPI) {
        try {
            return await ApiService.get("/user");
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
