import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import menuReducer from "./slices/menuSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import dealReducer from "./slices/dealSlice";
import restaurantReducer from "./slices/restaurantSlice";
import adminAnalyticsReducer from "./slices/adminAnalyticsSlice";
import orderAdminReducer from "./slices/orderAdminSlice";
import menuAdminReducer from "./slices/menuAdminSlice";
export const store = configureStore({
    reducer:{
        auth:authReducer,
        menu:menuReducer,
        cart:cartReducer,
        order:orderReducer,
        deal:dealReducer,
        restaurants: restaurantReducer,
        orderAdmin:orderAdminReducer,
        adminAnalytics:adminAnalyticsReducer,
        menuAdmin: menuAdminReducer,

    },
});