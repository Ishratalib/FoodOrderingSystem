import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import {
  HiOutlineShoppingBag,
  HiOutlineCurrencyDollar,
  HiOutlineFire,
  HiOutlineUsers,
} from "react-icons/hi";

const DashboardHome = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user } = useAuth();

  // TODO: backend integration -> dispatch(fetchAnalytics()) from analytics/order slice
  const stats = [
    { label: "Total Orders", value: "1,240", icon: HiOutlineShoppingBag },
    { label: "Total Revenue", value: "£8,450", icon: HiOutlineCurrencyDollar },
    { label: "Popular Item", value: "Big Mac Combo", icon: HiOutlineFire },
    { label: "Active Customers", value: "356", icon: HiOutlineUsers },
  ];

  const recentOrders = [
    {
      id: "#ORD1042",
      customer: "Zara Ahmed",
      total: "£24.50",
      status: "Pending",
    },
    {
      id: "#ORD1041",
      customer: "Ali Raza",
      total: "£12.00",
      status: "Delivered",
    },
    {
      id: "#ORD1040",
      customer: "Sana Khan",
      total: "£31.75",
      status: "Preparing",
    },
  ];

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div>
      {/* Hero banner - matches customer-site orange banner style */}
      <div className="relative rounded-2xl overflow-hidden bg-[#03081F] px-5 py-6 sm:px-8 sm:py-8 mb-6 sm:mb-8">
        <div className="relative z-10 max-w-[70%] sm:max-w-[60%]">
          <p className="text-orange-400 text-xs sm:text-sm mb-1">
            Welcome back
          </p>
          <h1 className="text-white text-xl sm:text-3xl font-extrabold leading-tight">
            Hi, {user?.username || "Admin"} 👋
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-2">
            Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-orange-500/20 blur-2xl" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-4 sm:p-5 shadow-sm transition-colors duration-300 ${
              isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
            }`}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FC8A06] mb-3">
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p
              className={`text-[11px] sm:text-xs mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {stat.label}
            </p>
            <p
              className={`text-base sm:text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent orders table */}
      <div
        className={`rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
          isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-base sm:text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Recent Orders
          </h2>
          <span className="text-xs font-medium text-[#FC8A06]">View all</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[420px]">
            <thead>
              <tr
                className={`text-left border-b ${isDark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}
              >
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-100"}`}
                >
                  <td
                    className={`py-3 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {order.id}
                  </td>
                  <td
                    className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {order.customer}
                  </td>
                  <td
                    className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {order.total}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColor[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
