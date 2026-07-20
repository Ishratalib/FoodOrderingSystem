import React, { useMemo, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { fetchRevenueOverTime } from "../../redux/slices/adminAnalyticsSlice";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueOverTime = () => {
    const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const [range, setRange] = useState("daily");

  const { revenueOverTime, revenueLoading, revenueError } = useSelector((state) => state.adminAnalytics);

  if (revenueLoading) {
    return <p className="text-center mt-4">Loading revenue records...</p>;
  }

  if (revenueError) {
    return <p className="text-center mt-4 text-red-500">{revenueError}</p>;
  }

  const chartData =
    revenueOverTime?.map((item) => ({
      period: item.period,
      revenue: item.total_revenue,
    })) || [];

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
      }`}
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
            <HiOutlineTrendingUp className="w-5 h-5 text-white" />
          </div>

          <div>
            <h2
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Revenue Over Time
            </h2>

            <p className="text-sm text-gray-500">Revenue Trend</p>
          </div>
        </div>

        {/* Tabs */}

        <div className="flex gap-5">
          {["daily"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setRange(item);
                dispatch(fetchRevenueOverTime(item));
              }}
              className={`capitalize text-sm font-semibold pb-1 transition ${
                range === item
                  ? "text-[#FC8A06] border-b-2 border-[#FC8A06]"
                  : "text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FC8A06" stopOpacity={0.55} />

                <stop offset="100%" stopColor="#FC8A06" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FC8A06"
              strokeWidth={3}
              fill="url(#revenueColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverTime;