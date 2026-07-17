import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

export const fetchPopularDeals = createAsyncThunk(
  "popularDeals/fetchPopularDeals",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const res = await fetch(
        `${BASE_URL}${ANALYTICS_ENDPOINTS.POPULAR_DEALS}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json);
      }

      return json.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch popular deals");
    }
  }
);

const popularDealsSlice = createSlice({
  name: "popularDeals",

  initialState: {
    popularDeals: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPopularDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.popularDeals = action.payload;
      })

      .addCase(fetchPopularDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularDealsSlice.reducer;