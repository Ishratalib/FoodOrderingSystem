import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOverview,
  fetchPopularItems,
  fetchOrdersByStatus,
  fetchPopularDeals,
  fetchRevenueByRestaurant,
  fetchRevenueOverTime,
} from "../../redux/slices/adminAnalyticsSlice";
import { HiOutlineChartBar } from "react-icons/hi";

import SummaryCards from "../../components/AdminAnalytics/SummaryCards";
import PopularItems from "../../components/AdminAnalytics/PopularItems";
import OrdersByStatusChart from "../../components/adminDashboard/OrdersByStatusChart";
import PopularDeals from "../../components/AdminAnalytics/PopularDeals";
import RevenueByRestaurant from "../../components/AdminAnalytics/RevenueByRestaurant";
import RevenueOverTime from "../../components/AdminAnalytics/RevenueOverTime";

const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  const {
    overview,

    overviewLoading,
    overviewError,

    popularItemsLoading,
    popularItemsError,

    ordersLoading,
    ordersError,

    dealsLoading,
    dealsError,

    revenueRestaurantLoading,
    revenueRestaurantError,

    revenueLoading,
    revenueError,
  } = useSelector((state) => state.adminAnalytics);
  useEffect(() => {
    dispatch(fetchOverview());
    dispatch(fetchPopularItems());
    dispatch(fetchOrdersByStatus());
    dispatch(fetchPopularDeals());
    dispatch(fetchRevenueByRestaurant());
    dispatch(fetchRevenueOverTime());
  }, [dispatch]);

  // Combined loading state
  if (
    overviewLoading ||
    popularItemsLoading ||
    ordersLoading ||
    dealsLoading ||
    revenueRestaurantLoading ||
    revenueLoading
  ) {
    return <div className="text-center p-5">Loading analytics...</div>;
  }

  // Combined error state
  if (
    overviewError ||
    popularItemsError ||
    ordersError ||
    dealsError ||
    revenueRestaurantError ||
    revenueError
  ) {
    return (
      <div className="text-center text-red-500 p-5">
        Error loading dashboard data.
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <HiOutlineChartBar className="text-2xl" />
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SummaryCards overview={overview} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PopularItems />
          <OrdersByStatusChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PopularDeals />
          <RevenueByRestaurant />

          <div className="col-span-1 md:col-span-2 mt-6">
            <RevenueOverTime />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
