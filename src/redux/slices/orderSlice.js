import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

const initialState = {
  orders: [],
  currentOrder: null,
  payment: null,
  loading: false,
  error: null,
  successMessage: "",
};

export const checkoutOrder = createAsyncThunk(
  "order/checkoutOrder",
  async (checkoutData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(`${BASE_URL}${ENDPOINTS.CHECKOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",

  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ORDERS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",

  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.GET_SINGLE_ORDER}${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",

  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.CANCEL_ORDER}${orderId}/cancel/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrder.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.payment = action.payload.payment;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
      })

      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelOrder.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
