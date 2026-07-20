import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

export const fetchDealById = createAsyncThunk(
  "deal/fetchDealById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.GET_DEAL_BY_ID}${id}/`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Network Error",
      });
    }
  },
);
export const fetchAllDeals = createAsyncThunk(
  "deal/fetchAllDeals",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.GET_ALL_DEALS}`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Network Error",
      });
    }
  },
);
const dealSlice = createSlice({
  name: "deal",

  initialState: {
    deal: null,
    allDeals: [],
    loading: false,
    allDealsLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDealById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.loading = false;
        state.deal = action.payload.data;
      })

      .addCase(fetchDealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(fetchAllDeals.pending, (state) => {
        state.allDealsLoading = true;
      })
      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        state.allDealsLoading = false;
        state.allDeals = action.payload.data;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.allDealsLoading = false;
        state.error = action.payload?.error;
      });
  },
});

export default dealSlice.reducer;