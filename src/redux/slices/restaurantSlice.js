import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_RESTAURANTS}`);

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch restaurants");
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",

  initialState: {
    restaurants: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;