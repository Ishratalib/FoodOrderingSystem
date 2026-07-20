import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isAdmin, loading, error } = useSelector(
    (state) => state.auth,
  );

  const logout = () => {
    dispatch(logoutAction());
  };

  return { user, token, isAuthenticated, isAdmin, loading, error, logout };
};