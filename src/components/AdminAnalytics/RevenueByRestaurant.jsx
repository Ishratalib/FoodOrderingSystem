import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = ["#FC8A06", "#34D399", "#60A5FA", "#F87171", "#A78BFA"];

const RevenueByRestaurant = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { revenueByRestaurant, revenueRestaurantLoading, revenueRestaurantError } = useSelector(
    (state) => state.adminAnalytics,
  );

  if (revenueRestaurantLoading) {
    return <p className="text-center mt-4">Loading Revenue...</p>;
  }

  if (revenueRestaurantError) {
    return <p className="text-center mt-4 text-red-500">{revenueRestaurantError}</p>;
  }

  const chartData =
    revenueByRestaurant?.map((item) => ({
      restaurant: item.restaurant__name,
      revenue: item.total_revenue,
    })) || [];

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm mt-6 ${
        isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
      }`}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
          <HiOutlineOfficeBuilding className="w-5 h-5 text-white" />
        </div>

        <h2
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Revenue by Restaurant
        </h2>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="restaurant" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueByRestaurant;