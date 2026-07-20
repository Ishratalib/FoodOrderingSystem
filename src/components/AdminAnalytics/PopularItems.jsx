import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineStar } from "react-icons/hi";

const PopularItems = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { popularItems, popularItemsLoading, popularItemsError } = useSelector(
    (state) => state.adminAnalytics
  );

  if (popularItemsLoading) {
    return <p className="text-center mt-4">Loading Popular Items...</p>;
  }

  if (popularItemsError) {
    return <p className="text-center mt-4 text-red-500">{popularItemsError}</p>;
  }

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
          <HiOutlineStar className="w-5 h-5 text-white" />
        </div>

        <h2
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Popular Items
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-white/10" : "border-gray-200"
              }`}
            >
              <th className="text-left py-3">Item</th>
              <th className="text-left py-3">Restaurant</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">Sold</th>
              <th className="text-left py-3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {popularItems.map((item) => (
              <tr
                key={item.menu_item__id}
                className={`border-b ${
                  isDark ? "border-white/10" : "border-gray-100"
                }`}
              >
                <td className="py-4">{item.menu_item__name}</td>

                <td className="py-4">
                  {item.menu_item__restaurant_id__name}
                </td>

                <td className="py-4">£{item.menu_item__price}</td>

                <td className="py-4">{item.total_sold}</td>

                <td className="py-4">£{item.total_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {popularItems.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No Popular Items Found
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularItems;