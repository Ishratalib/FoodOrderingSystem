import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

export const fetchRevenueOverTime = createAsyncThunk(
  "revenueOverTime/fetchRevenueOverTime",
  async (range = "daily", { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const res = await fetch(
        `${BASE_URL}${ANALYTICS_ENDPOINTS.REVENUE_OVER_TIME}?range=${range}`,
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

      return json;
    } catch (error) {
      return rejectWithValue("Failed to fetch revenue over time");
    }
  },
);

const initialState = {
  revenue: [],
  range: "daily",
  loading: false,
  error: null,
};

const revenueOverTimeSlice = createSlice({
  name: "revenueOverTime",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueOverTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRevenueOverTime.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload.data;
        state.range = action.payload.range;
      })

      .addCase(fetchRevenueOverTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueOverTimeSlice.reducer;
