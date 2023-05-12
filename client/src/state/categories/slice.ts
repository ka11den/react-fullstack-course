import { createSlice } from "@reduxjs/toolkit";

import * as categoriesActions from "./actions";

const initialState: CategoriesState = {
    categories: [],
    isSuccess: false,
    isLoading: false,
    isError: false
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        clearState(state) {
            state.categories = [];
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(categoriesActions.getAllCategories.pending, (state: CategoriesState) => {
                state.isLoading = true;
            })
            .addCase(categoriesActions.getAllCategories.fulfilled, (state: CategoriesState, action) => {
                state.categories = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(categoriesActions.getAllCategories.rejected, (state: CategoriesState) => {
                state.categories = [];
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(categoriesActions.createCategory.pending, (state: CategoriesState) => {
                state.isLoading = true;
            })
            .addCase(categoriesActions.createCategory.fulfilled, (state: CategoriesState, action) => {
                state.categories = state.categories.concat(action.payload);
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(categoriesActions.createCategory.rejected, (state: CategoriesState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(categoriesActions.updateCategory.pending, (state: CategoriesState) => {
                state.isLoading = true;
            })
            .addCase(categoriesActions.updateCategory.fulfilled, (state: CategoriesState, action) => {
                state.categories = state.categories.map((category) => {
                    if (category.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return category;
                    }
                });
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(categoriesActions.updateCategory.rejected, (state: CategoriesState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(categoriesActions.deleteCategory.pending, (state: CategoriesState) => {
                state.isLoading = true;
            })
            .addCase(categoriesActions.deleteCategory.fulfilled, (state: CategoriesState, action) => {
                state.categories = state.categories.filter((category) => {
                    if (category.id !== action.payload) {
                        return category;
                    }
                });
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(categoriesActions.deleteCategory.rejected, (state: CategoriesState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
    }
});

export const { clearState } = categoriesSlice.actions;

export const categoriesSelector = (state: { categories: CategoriesState }) => state.categories;
