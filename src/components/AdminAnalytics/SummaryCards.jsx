import React from "react";
import { useTheme } from "../../context/ThemeContext";

import {
  HiOutlineShoppingBag,
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
} from "react-icons/hi";

const SummaryCards = ({ overview }) => {
 
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const summary = [
    {
      label: "Total Orders",
      value: overview?.total_orders ?? 0,
      icon: HiOutlineShoppingBag,
    },
    {
      label: "Total Revenue",
      value: `£${overview?.total_revenue ?? 0}`,
      icon: HiOutlineCurrencyDollar,
    },
    {
      label: "Active Restaurants",
      value: overview?.active_restaurants ?? 0,
      icon: HiOutlineOfficeBuilding,
    },
    {
      label: "Total Users",
      value: overview?.total_users ?? 0,
      icon: HiOutlineUsers,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summary.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl p-5 shadow-sm ${
            isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
          }`}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06] mb-3">
            <stat.icon className="w-5 h-5 text-white" />
          </div>

          <p
            className={`text-xs mb-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {stat.label}
          </p>

          <p
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;