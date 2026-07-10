import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

import logo1 from "../../assets/logos/LOGO 1.png";
import maleuser from "../../assets/icons/Male User.png";
import TopBar from "./TopBar";
import { useTheme } from "../../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const isLoggedIn = !!accessToken;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Special Offers", path: "/offers" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Track Order", path: "/track-order" },
  ];

  return (
    <>
      {/* Mobile: Navbar upar, TopBar neeche (flex-col-reverse)
          Desktop: TopBar upar, Navbar neeche (md:flex-col) */}
      <div className="flex flex-col-reverse md:flex-col">
        <TopBar />

        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <img
                src={logo1}
                alt="Logo"
                className="w-24 md:w-28 lg:w-28 md:mr-2"
              />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center lg:gap-1 xl:gap-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-2 lg:px-2 xl:px-5 py-2 text-[12px] lg:text-[13px] xl:text-base rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? "bg-[#FC8A06] text-white"
                          : "text-black hover:text-[#FC8A06]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <button
                  onClick={toggleTheme}
                  className={`lg:px-2 xl:px-4
            lg:py-2
            lg:text-xs xl:text-sm
            rounded-lg font-medium transition-all duration-300 border
            ${
              theme === "dark"
                ? "bg-[#0F172A] border-gray-600 text-white hover:bg-[#1E293B]"
                : "bg-gray-100 border-gray-300 text-[#03081F] hover:bg-gray-200"
            }`}
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>

              {/* Desktop Login Button */}
              <button
                onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
                className="hidden lg:flex items-center lg:gap-1 xl:gap-2 bg-[#03081F] text-white lg:px-2 xl:px-4 lg:py-2 xl:py-3 rounded-full lg:text-xs xl:text-base hover:bg-gray-800 transition cursor-pointer"
              >
                <img
                  src={maleuser}
                  alt="User"
                  className="lg:w-6 xl:w-8 h-auto"
                />
                <span>{isLoggedIn ? "Logout" : "Login / Signup"}</span>
              </button>
              {/* Mobile Toggle */}
              <button
                className="lg:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden border-t">
              <div className="flex flex-col px-5 py-4 gap-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-orange-100"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                <button
                  onClick={toggleTheme}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition
  ${
    theme === "dark"
      ? "bg-[#0F172A] text-white border-gray-600"
      : "bg-gray-100 text-[#03081F] border-gray-300"
  }`}
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>

                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      handleLogout();
                    } else {
                      navigate("/login");
                    }
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg mt-2"
                >
                  <img src={maleuser} alt="User" className="w-5 h-5" />
                  {isLoggedIn ? "Logout" : "Login / Signup"}
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      <Outlet />
    </>
  );
}
