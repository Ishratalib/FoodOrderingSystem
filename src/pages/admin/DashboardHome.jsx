import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

import { fetchAllOrders } from "../../redux/slices/orderAdminSlice";
import {
  fetchOverview,
  fetchRevenueOverTime,
  fetchOrdersByStatus,
  fetchPopularItems,
} from "../../redux/slices/adminAnalyticsSlice";
import StatsCards from "../../components/adminDashboard/StatsCards";
import RevenueOverTimeChart from "../../components/adminDashboard/RevenueOverTimeChart";
import OrdersByStatusChart from "../../components/adminDashboard/OrdersByStatusChart";
import RecentOrdersTable from "../../components/adminDashboard/RecentOrdersTable";


const DashboardHome = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user } = useAuth();
  const dispatch = useDispatch();

  const {
    overview,
    revenueOverTime,
    ordersByStatus,
    ordersLoading,
    overviewLoading,
    overviewError,
    revenueByRestaurant,
    revenueLoading,
    revenueError,
    ordersError,
    revenueRestaurantLoading,
    revenueRestaurantError,
  } = useSelector((state) => state.adminAnalytics);
  
  const { orders } = useSelector((state) => state.orderAdmin);
  useEffect(() => {
      console.log("DashboardHome Mounted");

    dispatch(fetchOverview());
    dispatch(fetchAllOrders());
    dispatch(fetchRevenueOverTime());
    dispatch(fetchOrdersByStatus());
  }, [dispatch]);
  
  if (
    overviewLoading ||
    ordersLoading ||
    revenueRestaurantLoading ||
    revenueLoading
  ) {
    return <div className="text-center p-5">Loading Details...</div>;
  }

  // Combined error state
  if (
    overviewError ||
    ordersError ||
    revenueRestaurantError ||
    revenueError
  ) {
    return (
      <div className="text-center text-red-500 p-5">
        Error loading data.
      </div>
    );
  }


  // console.log(overview);
  // console.log(orders);
  const COLORS = ["#FC8A06", "#34D399", "#60A5FA", "#F87171", "#A78BFA"];

  return (
    <div>
      {/* Hero banner - matches customer-site orange banner style */}
      <div className="relative rounded-2xl overflow-hidden bg-[#03081F] px-5 py-6 sm:px-8 sm:py-8 mb-6 sm:mb-8">
        <div className="relative z-10 max-w-[70%] sm:max-w-[60%]">
          <p className="text-orange-400 text-xs sm:text-sm mb-1">
            Welcome back
          </p>
          <h1 className="text-white text-xl sm:text-3xl font-extrabold leading-tight">
            Hi, {user?.username || "Admin"} 
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-2">
            Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-orange-500/20 blur-2xl" />
      </div>

      {/* Stats grid */}
   <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RevenueOverTimeChart />
        <OrdersByStatusChart />
      </div>
      <div className="mt-6">
    {/* <PopularItemsChart /> */}
</div>
      {/* Recent orders table */}
    <div className="mt-6">
    <RecentOrdersTable />
</div>
    </div>
  );
};

export default DashboardHome;