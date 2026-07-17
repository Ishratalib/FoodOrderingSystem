import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    accessToken,
    refreshToken,
    isAdmin,
    loading,
    error,
  } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    isAdmin,
    loading,
    error,
    logout,
  };
};