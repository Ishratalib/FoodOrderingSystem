import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineClipboardList } from "react-icons/hi";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#FC8A06", // Orange
  "#34D399", // Green
  "#60A5FA", // Blue
  "#F87171", // Red
  "#A78BFA", // Purple
];

const OrdersByStatus = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { ordersByStatus, loading, error } = useSelector(
    (state) => state.ordersByStatus
  );

  if (loading) {
    return (
      <p className="text-center mt-4">
        Loading Orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-4 text-red-500">
        {error}
      </p>
    );
  }

  const chartData =
    ordersByStatus?.map((item) => ({
      name:
        item.current_status.charAt(0).toUpperCase() +
        item.current_status.slice(1),
      value: item.count,
    })) || [];

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        isDark
          ? "bg-[#0b1020] border border-white/10"
          : "bg-white"
      }`}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
          <HiOutlineClipboardList className="w-5 h-5 text-white" />
        </div>

        <div>
          <h2
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Order Status
          </h2>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Pie Chart */}

        <div className="h-[260px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Custom Legend */}

        <div className="space-y-4">

          {chartData.map((item, index) => (

            <div
              key={item.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span
                  className={`font-medium ${
                    isDark
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>

              </div>

              <span
                className={`font-bold ${
                  isDark
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {item.value}
              </span>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default OrdersByStatus;