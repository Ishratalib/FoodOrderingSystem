import { useTheme } from "../../context/ThemeContext";

const OrderStatusFilter = ({
  selectedStatus,
  setSelectedStatus,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const statuses = [
    "all",
    "pending",
    "accepted",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="mb-6">
      {/* Mobile + Desktop: same buttons, scrollable on small screens */}
      <div className="flex md:flex-wrap gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm transition whitespace-nowrap ${
              selectedStatus === status
                ? "bg-[#FC8A06] text-white"
                : isDark
                ? "bg-[#0b1020] border border-white/10 text-gray-300"
                : "bg-white border border-gray-200 text-gray-700"
            }`}
          >
            {status === "all"
              ? "All"
              : status.replaceAll("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusFilter;