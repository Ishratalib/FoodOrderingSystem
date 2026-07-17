import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

// ================= FETCH POPULAR ITEMS =================
export const fetchPopularItems = createAsyncThunk(
  "popularItems/fetchPopularItems",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await fetch(
        `${BASE_URL}${ANALYTICS_ENDPOINTS.POPULAR_ITEMS}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch popular items");
    }
  },
);

// ================= INITIAL STATE =================
const initialState = {
  popularItems: [],
  loading: false,
  error: null,
};

// ================= SLICE =================
const popularItemsSlice = createSlice({
  name: "popularItems",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPopularItems.fulfilled, (state, action) => {
        state.loading = false;
        state.popularItems = action.payload;
      })

      .addCase(fetchPopularItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularItemsSlice.reducer;
