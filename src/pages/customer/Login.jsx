import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
const Login = () => {
  const toast = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken, refreshToken, loading, error } = useSelector(
    (state) => state.auth,
  );
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const [loginError, setLoginError] = useState("");

  // useEffect(() => {
  //   if (error) {
  //     const message =
  //       typeof error === "string" ? error : error.error || "Login failed";

  //     setLoginError(message);

  //     const timer = setTimeout(() => {
  //       setLoginError("");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [error]);


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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      toast.success(result.message);
      if(result.data.is_admin){
        navigate("/admin");
      }
      else{
        navigate("/");
      }
    } catch (error) {
      toast.error(error.error || "Login Failed" );
      // if (error.response) {
      //   console.log("Status:", error.response.status);
      //   console.log("Data:", error.response.data);
      // }
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
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
            Welcome back
          </p>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Login to your account
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

          {/* Password */}
          <div className="mb-2">
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

          {/* Forgot password */}
          <div className="flex justify-end mb-6">
            <Link
              to="/forgot-password"
              className={`text-xs font-medium hover:underline ${
                isDark ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full py-3 transition-colors duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p
          className={`text-center text-sm mt-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
