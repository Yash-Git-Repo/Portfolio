import { axiosClient } from "@/utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProject = createAsyncThunk(
  "Projects/addProject",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/projects/getAllProjects`);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.post(`/projects/addProject`, body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, formData }, thunkAPI) => {
    try {
      const response = await axiosClient.put(
        `/projects/updateProject/${projectId}`,
        formData
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (ProjectId, thunkAPI) => {
    try {
      const response = await axiosClient.delete(
        `projects/deleteProject/${ProjectId}`
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState: {
    loading: false,
    Project: [],
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.Project = [...state.Project, action.payload];
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.Project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.Project.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.Project[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.Project = state.Project.filter(
          (Project) => Project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
