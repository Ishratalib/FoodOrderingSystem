import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, AUTH_ENDPOINTS } from "../../api/endpoints";

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Login Failed");
    }
  },
);

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Registration Failed");
    }
  },
);

// ================= INITIAL STATE =================
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
  success: false,
  successMessage: "",
  isAdmin: JSON.parse(localStorage.getItem("user"))?.is_admin || false,
};

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.success = false;
      state.successMessage = "";
      state.isAdmin = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage = action.payload.message || "Login successful";

        state.user = action.payload.data;
        state.accessToken = action.payload.token.access;
        state.refreshToken = action.payload.token.refresh;
        state.isAdmin = action.payload.data?.is_admin || false;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("accessToken", action.payload.token.access);
        localStorage.setItem("refreshToken", action.payload.token.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage =
          action.payload.message || "Registration successful";

        state.user = action.payload.data;
        state.accessToken = action.payload.token.access;
        state.refreshToken = action.payload.token.refresh;
        state.isAdmin = action.payload.data?.is_admin || false;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("accessToken", action.payload.token.access);
        localStorage.setItem("refreshToken", action.payload.token.refresh);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;