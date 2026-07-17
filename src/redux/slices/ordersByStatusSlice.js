import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ANALYTICS_ENDPOINTS } from "../../api/endpoints";

export const fetchOrdersByStatus = createAsyncThunk(
  "ordersByStatus/fetchOrdersByStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await fetch(
        `${BASE_URL}${ANALYTICS_ENDPOINTS.ORDERS_BY_STATUS}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch order status");
    }
  }
);

const initialState = {
  ordersByStatus: [],
  loading: false,
  error: null,
};

const ordersByStatusSlice = createSlice({
  name: "ordersByStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersByStatus = action.payload;
      })
      .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersByStatusSlice.reducer;