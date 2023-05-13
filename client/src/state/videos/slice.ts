import { createSlice } from "@reduxjs/toolkit";

import * as videosActions from "./actions";

const initialState: VideosState = {
    video: null,
    videos: [],
    isSuccess: false,
    isLoading: false,
    isError: false
};

export const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        clearState(state) {
            state.video = null;
            state.videos = [];
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(videosActions.getAllVideos.pending, (state: VideosState) => {
                state.isLoading = true;
            })
            .addCase(videosActions.getAllVideos.fulfilled, (state: VideosState, action) => {
                state.videos = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(videosActions.getAllVideos.rejected, (state: VideosState) => {
                state.videos = [];
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(videosActions.getVideo.pending, (state: VideosState) => {
                state.isLoading = true;
            })
            .addCase(videosActions.getVideo.fulfilled, (state: VideosState, action) => {
                state.video = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(videosActions.getVideo.rejected, (state: VideosState) => {
                state.video = null;
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(videosActions.createVideo.pending, (state: VideosState) => {
                state.isLoading = true;
            })
            .addCase(videosActions.createVideo.fulfilled, (state: VideosState, action) => {
                state.videos = state.videos.concat(action.payload);
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(videosActions.createVideo.rejected, (state: VideosState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(videosActions.deleteVideo.pending, (state: VideosState) => {
                state.isLoading = true;
            })
            .addCase(videosActions.deleteVideo.fulfilled, (state: VideosState, action) => {
                state.videos = state.videos.filter((video) => {
                    if (video.id !== action.payload) {
                        return video;
                    }
                });
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(videosActions.deleteVideo.rejected, (state: VideosState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(videosActions.updateVideo.pending, (state: VideosState) => {
                state.isLoading = true;
            })
            .addCase(videosActions.updateVideo.fulfilled, (state: VideosState, action) => {
                state.videos = state.videos.map((category) => {
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
            .addCase(videosActions.updateVideo.rejected, (state: VideosState) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            })
    }
});

export const { clearState } = videosSlice.actions;

export const videosSelector = (state: { videos: VideosState }) => state.videos;
