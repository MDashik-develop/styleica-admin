import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Async thunk to fetch current user
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("u_token");
      if (!token) throw new Error("No token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (err) {
      // ✅ token is invalid → remove it
      Cookies.remove("u_token");

      return rejectWithValue(
        err.response?.data?.message || "Session expired"
      );
    }
  }
);


const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Unauthorized";
        state.loading = false;
        state.isAuthChecked = true;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
