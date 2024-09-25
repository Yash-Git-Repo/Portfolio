import { axiosClient } from "@/utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "@/utils/localStorageManager";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("/auth/login", async (body, thunkAPI) => {
  try {
    const response = await axiosClient.post("/auth/login", body);
    return response?.data?.result;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.post("auth/forgotPassword", body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, body }, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/auth/resetPassword/${token}`,
        body
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.put(`/user/updateUser`, body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.put(`/user/updatePassword`, body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeItem(KEY_ACCESS_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
