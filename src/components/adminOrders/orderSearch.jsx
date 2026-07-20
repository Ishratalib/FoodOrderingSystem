import { Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const OrderSearch = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative w-full">
      <Search size={18}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      />

      <input
        type="text"
        placeholder="Search orders..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
          isDark
            ? "bg-[#0b1020] border-white/10 text-white placeholder:text-gray-500"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      />
    </div>
  );
};

export default OrderSearch;