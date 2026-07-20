import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineGift } from "react-icons/hi";

const PopularDeals = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { popularDeals, dealsLoading, dealsError } = useSelector(
    (state) => state.adminAnalytics
  );

  if (dealsLoading) {
    return <p className="text-center mt-4">Loading Popular Deals...</p>;
  }

  if (dealsError) {
    return (
      <p className="text-center mt-4 text-red-500">
        {dealsError}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm mt-6 ${
        isDark
          ? "bg-[#0b1020] border border-white/10"
          : "bg-white"
      }`}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">

          <HiOutlineGift className="w-5 h-5 text-white" />

        </div>

        <h2
          className={`text-lg font-bold ${
            isDark
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          Popular Deals
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className={`border-b ${
                isDark
                  ? "border-white/10"
                  : "border-gray-200"
              }`}
            >

              <th className="text-left py-3">
                Deal
              </th>

              <th className="text-left py-3">
                Restaurant
              </th>

              <th className="text-left py-3">
                Price
              </th>

              <th className="text-left py-3">
                Sold
              </th>

              <th className="text-left py-3">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {popularDeals.map((deal) => (

              <tr
                key={deal.deal__id}
                className={`border-b ${
                  isDark
                    ? "border-white/10"
                    : "border-gray-100"
                }`}
              >

                <td className="py-4">
                  {deal.deal__name}
                </td>

                <td className="py-4">
                  {deal.deal__restaurant_id__name}
                </td>

                <td className="py-4">
                  £{deal.deal__combo_price}
                </td>

                <td className="py-4">
                  {deal.total_sold}
                </td>

                <td className="py-4">
                  £{deal.total_revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {popularDeals.length === 0 && (

          <p className="text-center py-6 text-gray-500">
            No Popular Deals Found
          </p>

        )}

      </div>

    </div>
  );
};

export default PopularDeals;