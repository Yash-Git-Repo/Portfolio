import { axiosClient } from "@/utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSkill = createAsyncThunk(
  "skills/addSkill",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/skills/getAllSkills`);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addSkill = createAsyncThunk(
  "Skill/addSkill",
  async (body, thunkAPI) => {
    try {
      const response = await axiosClient.post(`/skills/addSkill`, body);
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({skillId , newProficiency}, thunkAPI) => {
    try {
      const response = await axiosClient.put(`/skills/updateSkill/${skillId}` , {proficiency : newProficiency});
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "Skill/deleteSkill",
  async (skillId, thunkAPI) => {
    try {
      const response = await axiosClient.delete(
        `skills/deleteSkill/${skillId}`
      );
      return response?.data?.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const skillSlice = createSlice({
  name: "skillSlice",
  initialState: {
    loading: false,
    Skill: [],
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.Skill = [...state.Skill, action.payload];
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.Skill = action.payload;
      })
      .addCase(getSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.Skill = state.Skill.map((skill) =>
          skill._id === action.payload._id ? action.payload : skill
        );
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.Skill = state.Skill.filter(
          (Skill) => Skill._id !== action.payload
        );
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer;
