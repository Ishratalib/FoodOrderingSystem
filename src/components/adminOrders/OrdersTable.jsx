import { useTheme } from "../../context/ThemeContext";

const OrdersTable = ({ orders,
  updatingOrderId,
  handleStatusChange,
  onView,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const statusOptions = [
    "pending",
    "accepted",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    preparing: "bg-purple-100 text-purple-700",
    out_for_delivery: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${
        isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr
              className={`border-b ${
                isDark
                  ? "border-white/10 text-gray-400"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <th className="pb-3 text-left">Order ID</th>
              <th className="pb-3 text-left">Restaurant</th>
              <th className="pb-3 text-left">Items</th>
              <th className="pb-3 text-left">Total</th>
              <th className="pb-3 text-left">Address</th>
              <th className="pb-3 text-left">Payment</th>
              <th className="pb-3 text-left">Payment Status</th>
              <th className="pb-3 text-left">Order Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.order_id}
                  className={`border-b ${
                    isDark ? "border-white/5" : "border-gray-100"
                  }`}
                >
                  <td
                    className={`py-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    #ORD{String(order.order_id).padStart(4, "0")}
                  </td>

                  <td
                    className={`py-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {order.restaurant?.name}
                  </td>

                  <td
                    className={`py-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {order.items?.length}
                  </td>

                  <td
                    className={`py-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    £{order.total_price}
                  </td>

                  <td
                    className={`py-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {order.delivery_address || "N/A"}
                  </td>

                  <td
                    className={`py-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {order.payment?.payment_method || "N/A"}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.payment?.payment_status === "success"
                          ? "bg-green-100 text-green-700"
                          : order.payment?.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment?.payment_status || "N/A"}
                    </span>
                  </td>

                  <td className="py-4">
                    <select
                      value={order.current_status}
                      disabled={updatingOrderId === order.order_id}
                      onChange={(e) =>
                        handleStatusChange(order.order_id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium outline-none ${
                        statusColor[order.current_status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => onView(order)}
                      className="px-3 py-1 rounded-lg bg-[#FC8A06] text-white hover:bg-[#e67d05]"
                    >
                      View
                    </button>
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

export default OrdersTable;