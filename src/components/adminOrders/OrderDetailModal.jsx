import { X, MapPin, CreditCard, CalendarDays } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { BASE_URL } from "../../api/api";

const OrderDetailModal = ({ order, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden ${
          isDark ? "bg-[#0b1020]" : "bg-white"
        }`}
      >
        {/* Header */}

        <div
          className={`flex justify-between items-center px-6 py-4 border-b ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Order Details
            </h2>

            <p className="text-[#FC8A06] font-semibold mt-1">
              #ORD{String(order.order_id).padStart(4, "0")}
            </p>
          </div>

          <button onClick={onClose}>
            <X
              className={isDark ? "text-white" : "text-gray-700"}
              size={22}
            />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Info */}

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Restaurant
              </p>

              <p
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {order.restaurant?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                £{order.total_price}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <CreditCard
                size={18}
                className="text-[#FC8A06]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Payment
                </p>

                <p
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {order.payment?.payment_method ?? "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <CalendarDays
                size={18}
                className="text-[#FC8A06]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

          </div>

          {/* Address */}

          <div className="flex gap-2">
            <MapPin
              size={18}
              className="text-[#FC8A06] mt-1"
            />

            <div>
              <p className="text-sm text-gray-500">
                Delivery Address
              </p>

              <p
                className={isDark ? "text-white" : "text-gray-900"}
              >
                {order.delivery_address || "N/A"}
              </p>
            </div>
          </div>

          {/* Items */}

          <div>

            <h3
              className={`font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Ordered Items
            </h3>

            <div className="space-y-3">

              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    isDark
                      ? "bg-[#03081F]"
                      : "bg-gray-100"
                  }`}
                >
                  <img
                    src={`${BASE_URL}${order.items[0].image}`}
                     alt={order.items[0].name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <p
                      className={`font-semibold ${
                        isDark
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <p
                    className={`font-semibold ${
                      isDark
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    £{item.price_at_order}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;