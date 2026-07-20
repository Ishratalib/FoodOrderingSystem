import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const RecentOrdersTable = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.orderAdmin);

  const recentOrders = orders.slice(0, 5);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
        isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-base sm:text-lg font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Orders
        </h2>

        <button
          onClick={() => navigate("/manage-order")}
          className="px-4 py-2 rounded-lg bg-[#FC8A06] text-white text-sm font-medium hover:bg-[#e67d05] transition"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[420px]">
          <thead>
            <tr
              className={`text-left border-b ${
                isDark
                  ? "border-white/10 text-gray-400"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Restaurant</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Total Price</th>
              <th className="pb-3 font-medium">Delivery Address</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  No Orders Found
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr
                  key={order.order_id}
                  className={`border-b last:border-0 ${
                    isDark ? "border-white/5" : "border-gray-100"
                  }`}
                >
                  <td
                    className={
                      isDark ? "py-3 text-white" : "py-3 text-gray-900"
                    }
                  >
                    #{order.order_id}
                  </td>

                  <td
                    className={
                      isDark ? "py-3 text-gray-300" : "py-3 text-gray-700"
                    }
                  >
                    {order.restaurant?.name}
                  </td>

                  <td
                    className={
                      isDark ? "py-3 text-gray-300" : "py-3 text-gray-700"
                    }
                  >
                    {order.items.length}
                  </td>

                  <td
                    className={
                      isDark ? "py-3 text-gray-300" : "py-3 text-gray-700"
                    }
                  >
                    £{order.total_price}
                  </td>

                  <td
                    className={
                      isDark ? "py-3 text-gray-300" : "py-3 text-gray-700"
                    }
                  >
                    {order.delivery_address || "N/A"}
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColor[order.current_status]
                      }`}
                    >
                      {order.current_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;