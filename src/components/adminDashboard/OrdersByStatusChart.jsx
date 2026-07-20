import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const COLORS = [
  "#FC8A06",
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#EF4444",
];

const OrdersByStatusChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { ordersByStatus, loading, error } = useSelector(
    (state) => state.adminAnalytics
  );

  const chartData = (ordersByStatus || []).map((item) => ({
    name:
      item.current_status.charAt(0).toUpperCase() +
      item.current_status.slice(1),
    value: item.count,
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
        Orders by Status
      </h2>

      <p
        className={`text-sm mb-5 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Current distribution of all orders
      </p>

      {loading ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Loading...
        </p>
      ) : error ? (
        <p className="text-red-500">Failed to load data.</p>
      ) : chartData.length === 0 ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          No data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#111827" : "#ffffff",
                border: "none",
                borderRadius: "10px",
                color: isDark ? "#ffffff" : "#111827",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                color: isDark ? "#ffffff" : "#374151",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersByStatusChart;