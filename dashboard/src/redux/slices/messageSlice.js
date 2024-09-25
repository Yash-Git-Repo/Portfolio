import { axiosClient } from "@/utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMessages = createAsyncThunk(
  "message/getAllMessages",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.get("/message/getAllMessages");
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteMessages = createAsyncThunk(
  "message/deleteMessage",
  async (messageId, thunkAPI) => {
    try {
      const response = await axiosClient.delete(
        `/message/deleteMessage/${messageId}`
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
