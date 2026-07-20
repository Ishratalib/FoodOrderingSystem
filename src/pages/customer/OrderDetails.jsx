import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import { fetchSingleOrder, cancelOrder } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";

export default function OrderDetails() {
  const { theme } = useTheme();

  const { id } = useParams();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentOrder, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);

  const handleCancelOrder = async () => {
    try {
      const result = await dispatch(cancelOrder(id)).unwrap();

      toast.success(result.message || "Order cancelled successfully.");

      setShowCancelModal(false);

      dispatch(fetchSingleOrder(id));
    } catch (error) {
      toast.error(error.message || "Unable to cancel order.");
    }
  };

  if (loading) {
    return (
      <h2
        className={`text-center text-2xl mt-20 ${
          theme === "dark" ? "text-white" : "text-[#03081F]"
        }`}
      >
        Loading Order...
      </h2>
    );
  }

  if (!currentOrder) {
    return (
      <h2
        className={`text-center text-2xl mt-20 ${
          theme === "dark" ? "text-white" : "text-[#03081F]"
        }`}
      >
        Order Not Found
      </h2>
    );
  }
  const canCancel = ["pending", "accepted"].includes(
    currentOrder.current_status,
  );

  return (
    <section
      className={`min-h-screen py-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#03081F]" : "bg-[#F7F8FA]"
      }`}
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className={`mb-6 font-semibold transition ${
            theme === "dark"
              ? "text-orange-400 hover:text-orange-300"
              : "text-[#FC8A06]"
          }`}
        >
          ← Back to Orders
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#FC8A06] to-[#FC8A06] rounded-3xl shadow-xl p-8 mb-10 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">
                Order #{currentOrder.order_id}
              </h1>

              <p className="mt-2 text-lg opacity-90">
                {currentOrder.restaurant.name}
              </p>

              <p className="text-4xl md:text-4xl lg:text-5xl font-extrabold mt-6">
                $ {Number(currentOrder.total_price).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <span
                className={`px-5 py-2 rounded-full capitalize font-semibold ${
                  currentOrder.current_status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : currentOrder.current_status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : currentOrder.current_status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                }`}
              >
                {currentOrder.current_status}
              </span>

              {canCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="bg-red-500
hover:bg-red-600
rounded-xl
px-8
py-3
font-semibold
shadow-md
hover:shadow-lg
transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div
          className={`rounded-2xl shadow p-6 mb-8 transition-colors ${
            theme === "dark"
              ? "bg-[#111827] border border-gray-700"
              : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-[#03081F]"
            }`}
          >
            Order Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`rounded-2xl p-6 border transition ${
                theme === "dark"
                  ? "bg-[#1F2937] border-gray-700 hover:bg-[#273449]"
                  : "bg-[#FAFAFA] border-gray-100 hover:shadow-lg"
              }`}
            >
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                Restaurant
              </p>

              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#03081F]"
                }`}
              >
                {currentOrder.restaurant.name}
              </p>
            </div>

            <div className={`rounded-2xl p-6 border transition ${
                theme === "dark"
                  ? "bg-[#1F2937] border-gray-700 hover:bg-[#273449]"
                  : "bg-[#FAFAFA] border-gray-100 hover:shadow-lg"
              }`}>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                Delivery Address
              </p>

              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#03081F]"
                }`}
              >
                {currentOrder.delivery_address}
              </p>
            </div>

            <div className={`rounded-2xl p-6 border transition ${
                theme === "dark"
                  ? "bg-[#1F2937] border-gray-700 hover:bg-[#273449]"
                  : "bg-[#FAFAFA] border-gray-100 hover:shadow-lg"
              }`}>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                Total Price
              </p>

              <p className="text-2xl font-bold text-[#FC8A06]">
                $ {currentOrder.total_price}
              </p>
            </div>

            <div>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                Created At
              </p>

              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#03081F]"
                }`}
              >
                {new Date(currentOrder.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div
          className={`rounded-3xl border shadow-sm transition p-6 ${
            theme === "dark"
              ? "bg-[#111827] border-gray-700"
              : "bg-white border-gray-100 hover:shadow-xl"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-[#03081F]"
            }`}
          >
            Ordered Items
          </h2>

          <div className="space-y-5">
            {currentOrder.items.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row gap-5 rounded-xl p-4 border transition ${
                  theme === "dark"
                    ? "bg-[#1F2937] border-gray-700 hover:bg-[#273449]"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={
                    item.image
                      ? `${BASE_URL}${item.image}`
                      : "https://placehold.co/120x120?text=Food"
                  }
                  alt={item.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    {item.name}
                  </h3>

                  <p className="mt-2">
                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        theme === "dark"
                          ? "bg-orange-500/20 text-orange-300"
                          : "bg-[#FFF5E8] text-[#FC8A06]"
                      }`}
                    >
                      Qty : {item.quantity}
                    </span>
                  </p>

                  <p
                    className={`mt-3 ${
                      theme === "dark" ? "text-gray-300" : "text-[#03081F]"
                    }`}
                  >
                    Unit Price :
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-[#03081F]"
                      }`}
                    >
                      $ {item.price_at_order}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    Subtotal
                  </p>

                  <p className="text-xl font-bold text-[#FC8A06]">
                    $ {item.subtotal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status History */}
        <div
          className={`rounded-2xl shadow p-6 mt-4 ${
            theme === "dark"
              ? "bg-[#111827] border border-gray-700"
              : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-[#03081F]"
            }`}
          >
            Status History
          </h2>

          <div className="space-y-6">
            {currentOrder.status_history.map((history) => (
              <div
                key={history.id}
                className="border-l-4 border-[#FC8A06] pl-5"
              >
                <h3
                  className={`font-bold capitalize ${
                    theme === "dark" ? "text-white" : "text-[#03081F]"
                  }`}
                >
                  {history.status}
                </h3>

                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                >
                  Changed By : {history.changed_by.username}
                </p>

                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {new Date(history.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${
              theme === "dark"
                ? "bg-[#111827] border border-gray-700"
                : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-[#03081F]"
              }`}
            >
              Cancel Order
            </h2>

            <p
              className={`mt-3 leading-7 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className={`rounded-xl px-6 py-3 font-medium transition border ${
                  theme === "dark"
                    ? "border-gray-600 text-white hover:bg-[#1F2937]"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                No
              </button>

              <button
                onClick={handleCancelOrder}
                className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
