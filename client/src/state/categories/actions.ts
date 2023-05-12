import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiService } from "../../axios.api";
import { clearState } from "./slice";

export const getAllCategories = createAsyncThunk<Category[]>(
    "categories/getAll",
    async function (_, thunkAPI) {
        try {
            return await ApiService.get("/category");
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCategories = createAsyncThunk<string, string, { rejectValue: string }>(
    "categories/get",
    async function (id, thunkAPI) {
        try {
            return await ApiService.get(`/category/${id}`);
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCategory = createAsyncThunk<Category, CategoriesAPI.CreateCategoryForm, { rejectValue: string }>(
    "category/create",
    async function (form, thunkAPI) {
        try {
            const res = await ApiService.post("/category", form);
            toast.success("Категория успешно создана");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCategory = createAsyncThunk<Category, {form: CategoriesAPI.UpdateCategoryForm, id: string}, { rejectValue: string }>(
    "category/update",
    async function (data, thunkAPI) {
        try {
            const res = await ApiService.patch(`/category/${data.id}`, data.form);
            toast.success("Категория успешно обновлена");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
    "category/delete",
    async function (id, thunkAPI) {
        try {
            await ApiService.delete(`/category/${id}`);
            toast.success("Категория успешно удалена");
            return id;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
