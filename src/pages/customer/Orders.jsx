import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { BASE_URL } from "../../api/api";
import { useTheme } from "../../context/ThemeContext";

export default function Orders() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <h2
        className={`text-center text-2xl mt-20 ${
          theme === "dark" ? "text-white" : "text-[#03081F]"
        }`}
      >
        Loading Orders...
      </h2>
    );
  }
  // const activeOrders = orders.filter(
  //   (order) => order.current_status !== "cancelled",
  // );
  const activeOrders = orders.filter(
    (order) => !["delivered", "cancelled"].includes(order.current_status),
  );

  const grandTotal = activeOrders.reduce(
    (total, order) => total + Number(order.total_price),
    0,
  );

  const orderHistory = orders.filter((order) =>
    ["delivered", "cancelled"].includes(order.current_status),
  );

  return (
    <section
      className={`min-h-screen py-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#03081F]" : "bg-[#F7F8FA]"
      }`}
    >
      {" "}
      <div className="max-w-6xl mx-auto px-4">
        <h1
          className={`text-4xl font-bold mb-10 ${
            theme === "dark" ? "text-white" : "text-[#03081F]"
          }`}
        >
          My Orders
        </h1>
        <button
          onClick={() => navigate("/restaurants")}
          className={`mb-6 font-semibold transition ${
            theme === "dark"
              ? "text-orange-400 hover:text-orange-300"
              : "text-[#FC8A06]"
          }`}
        >
          ← Back to MenuList
        </button>

        <div className="bg-gradient-to-r from-[#FC8A06] to-[#FC8A06] rounded-3xl shadow-xl p-8 mb-10 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-white/80 text-lg ">Total Active Orders</p>

              <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold mt-2 text-center">
                {activeOrders.length}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-white/80 text-lg text-center">Grand Total</p>

              <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold mt-2">
                $ {grandTotal.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        {activeOrders.length > 0 && (
          <h1
            className={`text-4xl font-bold mb-10 ${
              theme === "dark" ? "text-white" : "text-[#03081F]"
            }`}
          >
            Active Orders
          </h1>
        )}

        {activeOrders.length === 0 ? (
          <div
            className={`rounded-xl p-10 text-center shadow ${
              theme === "dark"
                ? "bg-[#111827] border border-gray-700"
                : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-semibold ${
                theme === "dark" ? "text-white" : "text-[#03081F]"
              }`}
            >
              No Orders Found
            </h2>
          </div>
        ) : (
          activeOrders.map((order) => (
            <div
              key={order.order_id}
              className={`rounded-3xl shadow-lg p-8 mb-10 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-[#111827] border border-gray-700 hover:border-orange-500"
                  : "bg-white border border-gray-100 hover:shadow-2xl"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    Order #{order.order_id}
                  </h2>

                  <p
                    className={`mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {order.restaurant.name}
                  </p>
                </div>
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold capitalize border ${
                    theme === "dark"
                      ? "bg-orange-500/20 text-orange-300 border-orange-500/40"
                      : "bg-[#FFF4E5] text-[#FC8A06] border-[#FC8A06]/30"
                  }`}
                >
                  {order.current_status}
                </span>
              </div>

              {/* Total */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div
                  className={`rounded-2xl p-5 ${
                    theme === "dark" ? "bg-[#1F2937]" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm uppercase tracking-wide ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Amount
                  </p>

                  <h2 className="text-3xl font-bold text-[#FC8A06] mt-2">
                    $ {Number(order.total_price).toFixed(2)}
                  </h2>
                </div>

                <div className={`rounded-2xl p-5 ${
                    theme === "dark" ? "bg-[#1F2937]" : "bg-gray-50"
                  }`}>
                  <p
                    className={`text-sm uppercase tracking-wide ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Delivery Address
                  </p>

                  <p
                    className={`font-semibold text-lg mt-2 ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    {order.delivery_address}
                  </p>
                </div>
              </div>
              {/* Items */}
              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col md:flex-row gap-5 rounded-2xl p-5 transition ${
                      theme === "dark"
                        ? "bg-[#1F2937] border border-gray-700 hover:bg-[#273449]"
                        : "bg-[#FAFAFA] border border-gray-100 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex justify-center md:block">
                      <img
                        src={
                          item.image
                            ? `${BASE_URL}${item.image}`
                            : "https://placehold.co/100x100?text=Food"
                        }
                        alt={item.name}
                        className="w-24 h-24 md:w-20 md:h-20 rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3
                        className={`text-lg font-bold ${
                          theme === "dark" ? "text-white" : "text-[#03081F]"
                        }`}
                      >
                        {item.name}
                      </h3>

                      <p
                        className={`mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Qty:
                        <span className="font-semibold">{item.quantity}</span>
                      </p>

                      <p
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }
                      >
                        Unit Price: GBP {Number(item.price_at_order).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center md:text-right">
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Subtotal
                      </p>

                      <p className="text-2xl font-bold text-[#FC8A06]">
                        GBP {Number(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate(`/orders/${order.order_id}`)}
                  className="bg-[#FC8A06] hover:bg-[#e57905] text-white px-6 py-3 rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}

        {orderHistory.length > 0 && (
          <>
            <h1
              className={`text-4xl font-bold mb-10 ${
                theme === "dark" ? "text-white" : "text-[#03081F]"
              }`}
            >
              Order History
            </h1>

            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.order_id}
                  className={`rounded-2xl shadow-sm p-5 transition ${
                    theme === "dark"
                      ? "bg-[#111827] border border-gray-700 hover:border-orange-500"
                      : "bg-white border border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left */}
                    <div>
                      <h2
                        className={`text-lg font-bold ${
                          theme === "dark" ? "text-white" : "text-[#03081F]"
                        }`}
                      >
                        Order #{order.order_id}
                      </h2>

                      <p
                        className={`text-sm mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {order.restaurant.name}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                        <span
                          className={theme === "dark" ? "text-gray-300" : ""}
                        >
                          <strong>{order.items.length}</strong> Items
                        </span>

                        <span className="font-semibold text-[#FC8A06]">
                          GBP {Number(order.total_price).toFixed(2)}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            order.current_status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.current_status}
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <button
                      onClick={() => navigate(`/orders/${order.order_id}`)}
                      className="self-start md:self-center bg-[#FC8A06] hover:bg-[#e57905] text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
