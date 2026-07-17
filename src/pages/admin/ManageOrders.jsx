import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineClipboardList } from "react-icons/hi";

const ManageOrders = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // TODO: backend integration -> dispatch(fetchOrders()) from orderSlice on mount (useEffect)
  const [orders, setOrders] = useState([
    {
      id: "#ORD1042",
      customer: "Zara Ahmed",
      items: 3,
      total: "£24.50",
      status: "Pending",
    },
    {
      id: "#ORD1041",
      customer: "Ali Raza",
      items: 2,
      total: "£12.00",
      status: "Delivered",
    },
    {
      id: "#ORD1040",
      customer: "Sana Khan",
      items: 5,
      total: "£31.75",
      status: "Preparing",
    },
    {
      id: "#ORD1039",
      customer: "Bilal Tariq",
      items: 1,
      total: "£8.20",
      status: "Pending",
    },
  ]);

  const statusOptions = ["Pending", "Preparing", "Delivered", "Cancelled"];

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleStatusChange = (orderId, newStatus) => {
    // TODO: backend integration -> dispatch(updateOrderStatus({ orderId, status: newStatus }))
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FC8A06]">
          <HiOutlineClipboardList className="w-5 h-5 text-white" />
        </div>
        <h1
          className={`text-xl sm:text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Manage Orders
        </h1>
      </div>

      <div
        className={`rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
          isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[560px]">
            <thead>
              <tr
                className={`text-left border-b ${isDark ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}
              >
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-b last:border-0 ${isDark ? "border-white/5" : "border-gray-100"}`}
                >
                  <td
                    className={`py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}
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
                    {order.items}
                  </td>
                  <td
                    className={`py-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {order.total}
                  </td>
                  <td className="py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium outline-none cursor-pointer ${statusColor[order.status]}`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
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

export default ManageOrders;
