import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

const initialState = {
  cart: null,
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;

      const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_CART}`, {
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
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ menu_item_id, deal_id }, { rejectWithValue, getState }) => {
    
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(`${BASE_URL}${ENDPOINTS.ADD_TO_CART}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          menu_item_id,
          deal_id,
        }),
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

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue, getState }) => {
    
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.UPDATE_CART_ITEM}${itemId}/`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            quantity,
          }),
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
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId, { rejectWithValue, getState }) => {
    
    try {
      const token = getState().auth.accessToken;
      const response = await fetch(
        `${BASE_URL}${ENDPOINTS.DELETE_CART_ITEM}${itemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return {
        itemId,
        data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload.data;

        state.items = action.payload.data.items;

        state.totalPrice = action.payload.data.total_price;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload.data;

        state.items = action.payload.data.items;

        state.totalPrice = action.payload.data.total_price;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
