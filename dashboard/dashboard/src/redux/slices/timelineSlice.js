import { axiosClient } from "@/utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTimeline = createAsyncThunk(
  "timeline/getAllTimeline",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/timeline/getAllTimeline`);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addTimeline = createAsyncThunk(
  "timeline/addTimeline",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.post(`/timeline/addTimeline`, body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteTimeline = createAsyncThunk(
  "timeline/deleteTimeline",
  async (timelineId, thunkAPI) => {
    try {
      const response = await axiosClient.delete(
        `timeline/deleteTimeline/${timelineId}`
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const timelineSlice = createSlice({
  name: "timelineSlice",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.timeline = [...state.timeline, action.payload];
      })
      .addCase(addTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.timeline = action.payload;
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.timeline = state.timeline.filter(
          (timeline) => timeline._id !== action.payload
        );
      })
      .addCase(deleteTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default timelineSlice.reducer;
