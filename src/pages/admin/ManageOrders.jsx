import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

import { Package } from "lucide-react";
import OrderSearch from "../../components/adminOrders/OrderSearch";
import OrdersTable from "../../components/adminOrders/OrdersTable";
import useDebounce from "../../hooks/useDebounce";
import OrderStatusFilter from "../../components/adminOrders/OrderStatusFilter";
import OrderDetailModal from "../../components/adminOrders/OrderDetailModal";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/orderAdminSlice";

const ManageOrders = () => {
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const isDark = theme === "dark";
const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
const [selectedStatus, setSelectedStatus] = useState("all");
  const { orders, loading, error, updatingOrderId } = useSelector(
    (state) => state.orderAdmin
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

const filteredOrders = orders.filter((order) => {
  const keyword = debouncedSearch.toLowerCase();

  const matchesSearch =
    String(order.order_id).includes(keyword) ||
    order.restaurant?.name?.toLowerCase().includes(keyword) ||
    order.current_status?.toLowerCase().includes(keyword);

  const matchesStatus =
    selectedStatus === "all" ||
    order.current_status === selectedStatus;

  return matchesSearch && matchesStatus;
});

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  if (loading) {
    return (
      <p className={isDark ? "text-white" : "text-gray-900"}>
        Loading...
      </p>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load orders.</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FC8A06] flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>

          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Manage Orders
          </h1>
        </div>

        {/* Right */}
        <div className="w-full md:w-[350px]">
          <OrderSearch value={search} onChange={setSearch} />
        </div>
      </div>
<OrderStatusFilter
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
  orders={orders}
/>
      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        updatingOrderId={updatingOrderId}
        handleStatusChange={handleStatusChange}
         onView={setSelectedOrder}
      />
      <OrderDetailModal
    order={selectedOrder}
    onClose={() => setSelectedOrder(null)}
/>
    </div>
  );
};

export default ManageOrders;