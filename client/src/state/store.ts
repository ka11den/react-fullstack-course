import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import * as userActions from "./user/actions";
import * as categoriesActions from "./categories/actions";
import { userSlice } from "./user/slice";
import { categoriesSlice } from "./categories/slice";

export const combineActions = {
    ...userActions,
    ...categoriesActions
};

export const store = configureStore({
    reducer: combineReducers({
        user: userSlice.reducer,
        categories: categoriesSlice.reducer
    })
});

export function useAppDispatch() {
    return useDispatch<RTK.AppDispatch>();
}

export const useAppSelector: TypedUseSelectorHook<RTK.RootState> = useSelector;

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(combineActions, dispatch), [dispatch]);
};
