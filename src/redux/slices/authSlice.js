import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch( `${BASE_URL}/user/login/`, 
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();
      if(!response.ok){
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login Failed");
    }
  },
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/register/`,{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(registerData),
        }
      );
      const data = await response.json();
      console.log("Register response:", data);

      if(!response.ok){
        return rejectWithValue(data)
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration Failed");
    }
  },
);
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = action.payload.data;
        state.accessToken = action.payload.token.access;
        state.refreshToken = action.payload.token.refresh;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("accessToken", action.payload.token.access);
        localStorage.setItem("refreshToken", action.payload.token.refresh);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.accessToken = action.payload.token.access;
        state.refreshToken = action.payload.token.refresh;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("accessToken", action.payload.token.access);
        localStorage.setItem("refreshToken", action.payload.token.refresh);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
