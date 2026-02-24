import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use environment variable for backend URL
// Example in .env: VITE_API_URL=https://e-commerce-uwo0.onrender.com
const API = import.meta.env.VITE_API_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// --------------------- REGISTER ---------------------
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await axios.post(`${API}/api/auth/register`, formData, {
      withCredentials: true, // allow cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

// --------------------- LOGIN ---------------------
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData) => {
    const response = await axios.post(`${API}/api/auth/login`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

// --------------------- LOGOUT ---------------------
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${API}/api/auth/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

// --------------------- CHECK AUTH ---------------------
export const checkAuth = createAsyncThunk("auth/checkauth", async () => {
  const response = await axios.get(`${API}/api/auth/check-auth`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      // explicitly allow Cache-Control if backend requires it
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
  return response.data;
});

// --------------------- SLICE ---------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
