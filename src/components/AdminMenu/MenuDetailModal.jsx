import { X, Tag, Store, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { BASE_URL } from "../../api/api";

const MenuDetailModal = ({ item, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl ${
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
              Menu Item Details
            </h2>

            <p className="text-[#FC8A06] font-semibold mt-1">
              #{item.id}
            </p>
          </div>

          <button onClick={onClose}>
            <X
              size={22}
              className={isDark ? "text-white" : "text-gray-700"}
            />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">

          <div className="flex gap-6">

            <img
              src={`${BASE_URL}${item.image}`}
              alt={item.name}
              className="w-44 h-44 rounded-xl object-cover border"
            />

            <div className="flex-1 space-y-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <h3
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.name}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Description
                </p>

                <p
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                >
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="flex gap-2 items-center">
                  <Store
                    size={18}
                    className="text-[#FC8A06]"
                  />

                  <div>
                    <p className="text-gray-500 text-sm">
                      Restaurant
                    </p>

                    <p
                      className={
                        isDark
                          ? "text-white"
                          : "text-gray-900"
                      }
                    >
                      {item.restaurant?.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Tag
                    size={18}
                    className="text-[#FC8A06]"
                  />

                  <div>
                    <p className="text-gray-500 text-sm">
                      Category
                    </p>

                    <p
                      className={
                        isDark
                          ? "text-white"
                          : "text-gray-900"
                      }
                    >
                      {item.category?.name}
                    </p>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <p className="text-gray-500 text-sm">
                    Price
                  </p>

                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    £{item.price}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <CheckCircle
                    size={18}
                    className="text-[#FC8A06]"
                  />

                  <div>
                    <p className="text-gray-500 text-sm">
                      Status
                    </p>

                    <p
                      className={
                        item.is_available
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {item.is_available
                        ? "Available"
                        : "Unavailable"}
                    </p>
                  </div>
                </div>

              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Featured
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    item.is_featured
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.is_featured ? "Yes" : "No"}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuDetailModal;