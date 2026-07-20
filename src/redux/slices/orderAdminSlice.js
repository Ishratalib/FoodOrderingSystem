import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

// Saari orders fetch karo (admin)
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue, getState }) => {
          const token = getState().auth.accessToken;

    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_ORDERS}`, {
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

// Order ka status update karo
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue, getState }) => {
          const token = getState().auth.accessToken;

    try {
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.UPDATE_ORDER_STATUS}${orderId}/status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({status: status }),
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

const orderAdminSlice = createSlice({
  name: "orderAdmin",

  initialState: {
    orders: [],
    loading: false,
    error: null,
    updatingOrderId: null, // konsa order abhi update ho raha hai (dropdown disable karne ke liye)
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update status
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.updatingOrderId = action.meta.arg.orderId;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updatingOrderId = null;
        const updatedOrder = action.payload.data;

        // Local list mein bhi wahi order update kar do (dobara fetch kiye bina)
        state.orders = state.orders.map((order) =>
          order.order_id === updatedOrder.order_id ? updatedOrder : order,
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updatingOrderId = null;
        state.error = action.payload;
      });
  },
});

export default orderAdminSlice.reducer;