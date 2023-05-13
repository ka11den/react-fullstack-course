import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiService } from "../../axios.api";

export const getAllVideos = createAsyncThunk<Video[], string>(
    "video/getAll",
    async function (id, thunkAPI) {
        try {
            return await ApiService.get(`/video/all/${id}`);
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getVideo = createAsyncThunk<Video, string>(
    "video/get",
    async function (id, thunkAPI) {
        try {
            return await ApiService.get(`/video/${id}`);
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createVideo = createAsyncThunk<Video, { form: any, id: string}, { rejectValue: string }>(
    "video/create",
    async function (data, thunkAPI) {
        try {
            console.log(data)
            const res = await ApiService.post(`/video/${data.id}`, data.form);
            toast.success("Категория успешно создана");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateVideo = createAsyncThunk<Category, {form: VideoAPI.UpdateVideoForm, id: string}, { rejectValue: string }>(
    "video/update",
    async function (data, thunkAPI) {
        try {
            const res = await ApiService.patch(`/video/${data.id}`, data.form);
            toast.success("Видео успешно обновлено");
            return res;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteVideo = createAsyncThunk<string, string>(
    "video/delete",
    async function (id, thunkAPI) {
        try {
            await ApiService.delete(`/video/${id}`);
            toast.success("Видео успешно удалено");
            return id;
        } catch (error) {
            const message = ((error as AxiosError).response?.data as Error).message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
