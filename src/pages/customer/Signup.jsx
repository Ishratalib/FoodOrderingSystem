import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      const message =
        typeof error === "string"
          ? error
          : error.error || "Registration Failed";

      setSignupError(message);

      const timer = setTimeout(() => {
        setSignupError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        country: formData.country,
        city: formData.city,
      };

      // TODO (backend integration):
      // dispatch(registerUser(payload)) -> authSlice async thunk
      // on success -> auto-login or redirect to /login
     const result = await dispatch(registerUser(payload)).unwrap();
      if(result.data.is_admin){
        navigate("/admin");
      }
      else{
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300 ${
        isDark ? "bg-[#03081F]" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 transition-colors duration-300 ${
          isDark ? "bg-[#0b1020] border border-white/10" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className={`text-sm mb-1 ${isDark ? "text-orange-400" : "text-orange-500"}`}
          >
            I'm lovin' it!
          </p>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full px-4 py-2.5 rounded-full text-sm outline-none transition-colors duration-200 ${
                isDark
                  ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
              } ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              autoComplete="username"
              className={`w-full px-4 py-2.5 rounded-full text-sm outline-none transition-colors duration-200 ${
                isDark
                  ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
              } ${errors.username ? "border-red-500" : ""}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.username}
              </p>
            )}
          </div>

          {/* Country + City */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label
                htmlFor="country"
                className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United Kingdom"
                autoComplete="country-name"
                className={`w-full px-4 py-2.5 rounded-full text-sm outline-none transition-colors duration-200 ${
                  isDark
                    ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
                } ${errors.country ? "border-red-500" : ""}`}
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  {errors.country}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="London"
                autoComplete="address-level2"
                className={`w-full px-4 py-2.5 rounded-full text-sm outline-none transition-colors duration-200 ${
                  isDark
                    ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
                } ${errors.city ? "border-red-500" : ""}`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 ml-2">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`w-full px-4 py-2.5 pr-16 rounded-full text-sm outline-none transition-colors duration-200 ${
                  isDark
                    ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
                } ${errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium ${
                  isDark ? "text-orange-400" : "text-orange-500"
                }`}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full px-4 py-2.5 rounded-full text-sm outline-none transition-colors duration-200 ${
                isDark
                  ? "bg-[#03081F] text-white placeholder-gray-500 border border-white/20 focus:border-orange-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-400 border border-transparent focus:border-orange-500"
              } ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {signupError && (
            <p className="text-red-500 text-sm text-center mb-4">
              {signupError}
            </p>
          )}
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full py-3 transition-colors duration-200"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Footer */}
        <p
          className={`text-center text-sm mt-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
