import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

export const fetchRevenueByRestaurant = createAsyncThunk(
  "revenueByRestaurant/fetchRevenueByRestaurant",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const res = await fetch(
        `${BASE_URL}${ANALYTICS_ENDPOINTS.REVENUE_BY_RESTAURANT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json);
      }

      return json.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch revenue by restaurant");
    }
  },
);

const revenueByRestaurantSlice = createSlice({
  name: "revenueByRestaurant",

  initialState: {
    revenueByRestaurant: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRevenueByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueByRestaurant = action.payload;
      })

      .addCase(fetchRevenueByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueByRestaurantSlice.reducer;
