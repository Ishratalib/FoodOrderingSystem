import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

const fetchAnalytics = async (endpoint, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
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
};
// revenue overtime
export const fetchRevenueOverTime = createAsyncThunk(
  "adminAnalytics/fetchRevenueOverTime",
  async (_, thunkAPI) => {
    return fetchAnalytics(ENDPOINTS.ADMIN_REVENUE_OVER_TIME, thunkAPI);
  },
);
// order status
export const fetchOrdersByStatus = createAsyncThunk(
  "adminAnalytics/fetchOrdersByStatus",
  async (_, thunkAPI) => {
    return fetchAnalytics(ENDPOINTS.ADMIN_ORDERS_BY_STATUS, thunkAPI);
  },
);
// popular items
export const fetchPopularItems = createAsyncThunk(
  "adminAnalytics/fetchPopularItems",
  async (_, thunkAPI) => {
    return fetchAnalytics(ENDPOINTS.ADMIN_POPULAR_ITEMS, thunkAPI);
  },
);
//popular deals
export const fetchPopularDeals = createAsyncThunk(
  "adminAnalytics/fetchPopularDeals",
  async (_, thunkAPI) => {
    return fetchAnalytics(ENDPOINTS.ADMIN_POPULAR_DEALS, thunkAPI);
  },
);
// Revenve by restaurant
export const fetchRevenueByRestaurant = createAsyncThunk(
  "adminAnalytics/fetchRevenueByRestaurant",
  async (_, thunkAPI) => {
    return fetchAnalytics(ENDPOINTS.ADMIN_REVENUE_BY_RESTAURANT, thunkAPI);
  },
);
export const fetchOverview = createAsyncThunk(
  "adminAnalytics/fetchOverview",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.accessToken;

    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.ADMIN_OVERVIEW}`, {
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

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",

  initialState: {
    overview: null,
    overviewLoading: false,
    overviewError: null,

    revenueOverTime: [],
    revenueLoading: false,
    revenueError: null,

    revenueByRestaurant: [],
    revenueRestaurantLoading: false,
    revenueRestaurantError: null,

    ordersByStatus: [],
    ordersLoading: false,
    ordersError: null,

    popularItems: [],
    popularItemsLoading: false,
    popularItemsError: null,

    popularDeals: [],
    dealsLoading: false,
    dealsError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= OVERVIEW =================
      .addCase(fetchOverview.pending, (state) => {
        state.overviewLoading = true;
        state.overviewError = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.overview = action.payload.data;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.overviewLoading = false;
        state.overviewError = action.payload;
      })

      // ================= REVENUE OVER TIME =================
      .addCase(fetchRevenueOverTime.pending, (state) => {
        state.revenueLoading = true;
        state.revenueError = null;
      })
      .addCase(fetchRevenueOverTime.fulfilled, (state, action) => {
        state.revenueLoading = false;
        state.revenueOverTime = action.payload.data;
      })
      .addCase(fetchRevenueOverTime.rejected, (state, action) => {
        state.revenueLoading = false;
        state.revenueError = action.payload;
      })

      // ================= ORDERS BY STATUS =================
      .addCase(fetchOrdersByStatus.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.ordersByStatus = action.payload.data;
      })
      .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      })

      // ================= POPULAR ITEMS =================
      .addCase(fetchPopularItems.pending, (state) => {
        state.popularItemsLoading = true;
        state.popularItemsError = null;
      })
      .addCase(fetchPopularItems.fulfilled, (state, action) => {
        state.popularItemsLoading = false;
        state.popularItems = action.payload.data;
      })
      .addCase(fetchPopularItems.rejected, (state, action) => {
        state.popularItemsLoading = false;
        state.popularItemsError = action.payload;
      })

      // ================= POPULAR DEALS =================
      .addCase(fetchPopularDeals.pending, (state) => {
        state.dealsLoading = true;
        state.dealsError = null;
      })
      .addCase(fetchPopularDeals.fulfilled, (state, action) => {
        state.dealsLoading = false;
        state.popularDeals = action.payload.data;
      })
      .addCase(fetchPopularDeals.rejected, (state, action) => {
        state.dealsLoading = false;
        state.dealsError = action.payload;
      })

      // ================= REVENUE BY RESTAURANT =================
      .addCase(fetchRevenueByRestaurant.pending, (state) => {
        state.revenueLoading = true;
        state.revenueError = null;
      })
      .addCase(fetchRevenueByRestaurant.fulfilled, (state, action) => {
        state.revenueLoading = false;
        state.revenueByRestaurant = action.payload.data;
      })
      .addCase(fetchRevenueByRestaurant.rejected, (state, action) => {
        state.revenueLoading = false;
        state.revenueError = action.payload;
      });
  },
});

export default adminAnalyticsSlice.reducer;
