import { ShoppingBag, PoundSterling, Flame, Users } from "lucide-react";

import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

const StatsCards = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { overview, overviewLoading, overviewError } = useSelector(
    (state) => state.adminAnalytics,
  );

  if (overviewLoading) {
    return <p className="text-center mt-4">Loading Details...</p>;
  }

  if (overviewError) {
    return <p className="text-center mt-4 text-red-500">{overviewError}</p>;
  }
  const stats = [
    {
      label: "Total Orders",
      value: overview?.total_orders ?? 0,
      icon: ShoppingBag,
    },
    {
      label: "Total Revenue",
      value: `£${overview?.total_revenue ?? 0}`,
      icon: PoundSterling,
    },
    {
      label: "Active Restaurants",
      value: overview?.active_restaurants ?? 0,
      icon: Flame,
    },
    {
      label: "Total Users",
      value: overview?.total_users ?? 0,
      icon: Users,
    },
  ];

  return (
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
            className={`text-[11px] sm:text-xs mb-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {stat.label}
          </p>

          <p
            className={`text-base sm:text-xl font-bold ${
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

export default StatsCards;
