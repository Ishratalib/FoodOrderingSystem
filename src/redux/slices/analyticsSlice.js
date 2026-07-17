import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

// ================= FETCH OVERVIEW =================
export const fetchOverview = createAsyncThunk(
  "analytics/fetchOverview",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const res = await fetch(`${BASE_URL}${ANALYTICS_ENDPOINTS.OVERVIEW}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue(json);
      }

      return json.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch overview");
    }
  },
);

const initialState = {
  overview: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })

      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
