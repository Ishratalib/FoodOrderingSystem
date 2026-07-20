import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo1 from "../../assets/logos/LOGO 1.png";
import sidebarImg from "../../assets/logos/sidebarimg.png";

const AdminSidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };
  const handleLogout = () => {
    navigate("/login");
    logout();
  };
  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Manage Orders",
      path: "/manage-order",
      icon: ClipboardList,
    },
    {
      name: "Manage Menu",
      path: "/manage-menu",
      icon: UtensilsCrossed,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];
  return (
    <div
      className={`h-screen flex transition-colors duration-300 ${isDark ? "bg-[#03081F]" : "bg-gray-50"}`}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full lg:h-auto z-50
          w-64 flex-shrink-0 flex flex-col transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          ${isDark ? "bg-[#0b1020] border-r border-white/10" : "bg-white border-r border-gray-100"}
        `}
      >
        <div className="px-5 py-6 flex items-center justify-between">
          <img src={isDark ? sidebarImg : logo1} alt="Logo" className="w-16" />
          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} className={isDark ? "text-white" : "text-gray-900"} />
          </button>
        </div>

        <div className="px-5 pb-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Admin Panel
          </p>
          <p
            className={`text-sm font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {user?.username || "Admin"}
          </p>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#FC8A06] text-white shadow-md"
                    : isDark
                      ? "text-gray-300 hover:bg-white/5"
                      : "text-gray-700 hover:bg-orange-50"
                }`
              }
            >
              <link.icon size={20} className="flex-shrink-0" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-6 space-y-2 mt-4">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
              isDark
                ? "bg-[#03081F] border-gray-600 text-white hover:bg-[#0F172A]"
                : "bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#03081F] hover:bg-gray-800 text-white transition-colors duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className={`flex lg:hidden items-center justify-between px-4 py-4 sticky top-0 z-30 transition-colors duration-300 ${
            isDark
              ? "bg-[#0b1020] border-b border-white/10"
              : "bg-white border-b border-gray-100"
          }`}
        >
          <button onClick={() => setSidebarOpen(true)}>
            <Menu
              size={24}
              className={isDark ? "text-white" : "text-gray-900"}
            />
          </button>

          <img src={isDark ? sidebarImg : logo1} alt="Logo" className="w-16" />
          <div className="w-6" />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminSidebar;
