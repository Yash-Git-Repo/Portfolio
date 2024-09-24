import { axiosClient } from "@/utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getApplication = createAsyncThunk(
  "Applications/addApplication",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/softwareApplication/getAllSoftwareApplication`);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addApplication = createAsyncThunk(
  "softwareApplication/addSoftwareApplication",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/softwareApplication/addSoftwareApplication`,
        body
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "Application/deleteApplication",
  async (applicationId, thunkAPI) => {
    try {
      const response = await axiosClient.delete(
        `softwareApplication/deleteSoftwareApplication/${applicationId}`
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    loading: false,
    Application: [],
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.Application = [...state.Application, action.payload];
      })
      .addCase(addApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.Application = action.payload;
      })
      .addCase(getApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.Application = state.Application.filter(
          (Application) => Application._id !== action.payload
        );
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applicationSlice.reducer;
