import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/customer/Home";
import MenuItemDetail from "./pages/customer/MenuItemDetail";
import Offers from "./pages/customer/Offers";
import RestaurantDetail from "./pages/customer/RestaurantDetail";
import OrderTracking from "./pages/customer/OrderTracking";
import Login from "./pages/customer/Login";
import Signup from "./pages/customer/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./components/common/AuthLayout";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderHistory from "./pages/customer/OrderHistory";
import Profile from "./pages/customer/Profile";
import AdminSidebar from "./components/layout/AdminSidebar";
import AdminRoute from "./routes/AdminRoute";
import DashboardHome from "./pages/admin/DashboardHome";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageMenu from "./pages/admin/ManageMenu";
import Analytics from "./pages/admin/Analytics";
import CustomerRoute from "./routes/CustomerRoute";
// import DealDetail from "./pages/DealDetail";

function App() {
  return (
    <Routes>
      <Route element={<CustomerRoute />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuItemDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/restaurants" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/deal/:id" element={<DealDetail />} /> */}

          <Route
            path="/track-order"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminSidebar />}>
          <Route path="/admin" element={<DashboardHome />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/menu" element={<ManageMenu />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
