import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import menuReducer from "./slices/menuSlice";
import analyticsReducer from "./slices/analyticsSlice";
import popularItemsReducer from "./slices/popularItemsSlice";
import popularDealsReducer from "./slices/popularDealsSlice";
import ordersByStatusReducer from "./slices/ordersByStatusSlice";
import revenueByRestaurantReducer from "./slices/revenueByRestaurantSlice";
import revenueOverTimeReducer from "./slices/revenueOverTimeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    analytics: analyticsReducer,
    popularItems: popularItemsReducer,
    popularDeals: popularDealsReducer,
    ordersByStatus: ordersByStatusReducer,
    revenueByRestaurant: revenueByRestaurantReducer,
    revenueOverTime: revenueOverTimeReducer,
  },
});
