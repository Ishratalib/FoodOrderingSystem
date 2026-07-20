import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueOverTimeChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { revenueOverTime, loading, error } = useSelector(
    (state) => state.adminAnalytics
  );

  const chartData = (revenueOverTime || []).map((item) => ({
    label:
      item.date ||
      item.day ||
      item.period ||
      item.month ||
      item.label ||
      "",

    revenue: Number(
      item.revenue ??
        item.total_revenue ??
        item.amount ??
        item.total ??
        0
    ),
  }));

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 ${
        isDark
          ? "bg-[#0b1020] border border-white/10"
          : "bg-white"
      }`}
    >
      <h2
        className={`text-lg font-bold mb-1 ${
          isDark ? "text-white" : "text-[#03081F]"
        }`}
      >
        Revenue Over Time
      </h2>

      <p
        className={`text-sm mb-5 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Daily / Periodic Revenue Trend
      </p>

      {loading ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Loading...
        </p>
      ) : error ? (
        <p className="text-red-500">
          Failed to load revenue data.
        </p>
      ) : chartData.length === 0 ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          No revenue data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#E5E7EB"}
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{
                fill: isDark ? "#D1D5DB" : "#6B7280",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={{
                stroke: isDark ? "#374151" : "#E5E7EB",
              }}
            />

            <YAxis
              tick={{
                fill: isDark ? "#D1D5DB" : "#6B7280",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `£${value}`}
            />

            <Tooltip
              formatter={(value) => [`£${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: isDark ? "#111827" : "#ffffff",
                borderRadius: "10px",
                border: "none",
                color: isDark ? "#ffffff" : "#111827",
              }}
            />

            <Bar
              dataKey="revenue"
              fill="#FC8A06"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueOverTimeChart;