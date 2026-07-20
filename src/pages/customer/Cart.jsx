import React from "react";
import burger from "../../assets/images/burger1.png";
import fries from "../../assets/images/fries1.png";
import discount from "../../assets/images/discount.png";
import profile from "../../assets/icons/profile.png";
import cart from "../../assets/icons/shoppingCart.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";
import {
  updateCartItem,
  deleteCartItem,
  fetchCart,
} from "../../redux/slices/cartSlice";
import { HiShoppingCart } from "react-icons/hi";
import { checkoutOrder } from "../../redux/slices/orderSlice";
import useToast from "../../hooks/useToast";
import { useTheme } from "../../context/ThemeContext";

export default function Cart() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  // const [transactionId, setTransactionId] = useState("");
  const { items, totalPrice, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = async (item) => {
    await dispatch(
      updateCartItem({
        itemId: item.id,
        quantity: item.quantity + 1,
      }),
    );

    dispatch(fetchCart());
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;

    await dispatch(
      updateCartItem({
        itemId: item.id,
        quantity: item.quantity - 1,
      }),
    );

    dispatch(fetchCart());
  };

  const handleDelete = async (itemId) => {
    const result = await dispatch(deleteCartItem(itemId)).unwrap();
    toast.success(result.data.message);
    dispatch(fetchCart());
  };

  const generateTransactionId = (paymentMethod) => {
    const prefixes = {
      stripe: "STR",
      jazzcash: "JC",
      easypaisa: "EP",
    };

    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${prefixes[paymentMethod]}-${Date.now()}-${random}`;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!deliveryAddress.trim()) {
      toast.error("Please Enter a delivery address");
      return;
    }

    const transactionId =
      paymentMethod === "cash" ? "" : generateTransactionId(paymentMethod);

    try {
      const result = await dispatch(
        checkoutOrder({
          delivery_address: deliveryAddress,
          payment_method: paymentMethod,
          transaction_id: transactionId,
        }),
      ).unwrap();
      toast.success(result.message);

      dispatch(fetchCart());

      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "CheckOut Failed");
    }
  };
  const cartItems = items;

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 0 ? 0 : 0;
  const discount = 0;
  const paid = 0;
  const total = subtotal + deliveryFee - discount;
  const remainingAmount = total - paid;

  return (
    <section
      className={`min-h-screen py-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#03081F]" : "bg-[#F7F8FA]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back */}
        <button
          className="flex items-center gap-2 text-gray-600 cursor-pointer transition text-sm font-medium mb-5 hover:text-[#FC8A06]"
          onClick={() => navigate("/restaurants")}
        >
          ← Back
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="xl:col-span-2 space-y-6">
            {/* Cart Card */}
            {/* Heading */}
            <h1
              className={`text-3xl font-bold mb-8 mt-8 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Group order checkout
            </h1>
            <div
              className={`rounded-2xl overflow-hidden shadow-sm transition-colors ${
                theme === "dark"
                  ? "bg-[#111827] border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Card Header */}
              <div
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 sm:px-6 py-5 border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiShoppingCart
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  />
                  <h2
                    className={`font-semibold text-lg ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    My cart
                  </h2>
                </div>

                {/* <button className="w-full sm:w-auto border border-[#FC8A06] hover:bg-[#FC8A06] hover:text-white transition px-6 py-2 rounded-lg font-semibold text-[#FC8A06]">
                  Confirm
                </button> */}
              </div>
              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

                  <HiShoppingCart
                    className={`w-20 h-20 opacity-100 mb-6 ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  />

                  <h2
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    Your cart is empty
                  </h2>

                  <p
                    className={`mt-3 max-w-md leading-7 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Looks like you haven't added any delicious items yet. Browse
                    our menu and add your favorite meals to get started.
                  </p>

                  <button
                    onClick={() => navigate("/restaurants")}
                    className={`mt-8 bg-[#FC8A06] hover:bg-[#e57905] text-white px-8 py-3 rounded-xl font-semibold transition ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col md:flex-row gap-5 px-5 sm:px-6 py-6 border-b last:border-none ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      {/* Product Image */}
                      <div className="flex justify-center md:block">
                        <img
                          src={`${BASE_URL}${item.image}`}
                          alt={item.name}
                          className="w-28 h-28 rounded-2xl object-cover shadow-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              theme === "dark" ? "text-white" : "text-[#03081F]"
                            }`}
                          >
                            {item.name}
                          </h3>

                          <p
                            className={`text-sm mt-2 leading-6 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {item.description ||
                              "Freshly prepared with premium ingredients and served hot."}
                          </p>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-6">
                          {/* Quantity Controller */}
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex items-center rounded-full overflow-hidden shadow-sm border ${
                                theme === "dark"
                                  ? "bg-[#1F2937] border-[#FC8A06]"
                                  : "bg-[#FFF7EC] border-[#FC8A06]"
                              }`}
                            >
                              <button
                                onClick={() => handleDecrease(item)}
                                className="w-11 h-11 flex items-center justify-center text-2xl font-bold text-[#FC8A06] hover:bg-[#FC8A06] hover:text-white transition"
                              >
                                −
                              </button>

                              <span
                                className={`w-12 text-center font-bold text-lg ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-[#03081F]"
                                }`}
                              >
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => handleIncrease(item)}
                                className="w-11 h-11 flex items-center justify-center text-2xl font-bold text-[#FC8A06] hover:bg-[#FC8A06] hover:text-white transition"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 font-medium hover:text-red-700 transition"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-left lg:text-right">
                            <p
                              className={`text-sm ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Unit Price
                            </p>

                            <p
                              className={`font-semibold ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              $ {Number(item.price).toFixed(2)}
                            </p>

                            {/* <p className="mt-2 text-2xl font-bold text-[#FC8A06]">
                          $ {Number(item.subtotal).toFixed(2)}
                        </p> */}
                          </div>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="text-md mt-4 font-bold text-[#FC8A06]">
                            Total Price
                          </p>

                          <p
                            className={`font-semibold text-gray-700 ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            $ {Number(item.price * item.quantity).toFixed(2)}
                          </p>

                          {/* <p className="mt-2 text-2xl font-bold text-[#FC8A06]">
                          $ {Number(item.subtotal).toFixed(2)}
                        </p> */}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* ---------- Summary Section Starts ---------- */}

                  <div className="px-6 py-6 border-t border-t-gray-300">
                    <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">
                      {/* Discount Button */}
                      <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                        {/* <button className="w-full sm:w-auto flex items-center justify-center gap-3 border border-gray-300 rounded-xl px-5 py-3 hover:border-[#FC8A06] hover:bg-yellow-100 transition">
                      <img src={discount} alt="" className="w-6 h-6" />

                      <span className="font-semibold">Add discount</span>
                    </button> */}
                      </div>

                      {/* Totals */}

                      <div className="w-full lg:max-w-xs">
                        <div
                          className={`flex justify-between text-gray-900 text-sm font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {/* <span>Subtotal</span>
                      <span>43.00 RON</span> */}
                        </div>

                        <div className="flex justify-between text-gray-600 text-sm">
                          {/* <span>Delivery fee</span>
                      <span>2.00 RON</span> */}
                        </div>

                        <div className="flex justify-between text-gray-600 text-sm">
                          {/* <span>Discount</span>
                      <span>-10.00 RON</span> */}
                        </div>

                        <div
                          className={`pt-3 flex justify-end items-center font-bold text-2xl ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <span>GRAND TOTAL:</span>
                          <span className=" ml-4 text-2xl font-bold text-[#FC8A06]">
                            $ {totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div>
            <div className="">
              <h2
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Total
              </h2>

              <p
                className={`text-2xl mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                payment
              </p>

              <div
                className={`rounded-2xl shadow-sm p-6 sticky top-6 ${
                  theme === "dark"
                    ? "bg-[#111827] border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="mb-5">
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    Delivery Address
                  </label>

                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter delivery address"
                    rows={3}
                    className={`w-full rounded-xl px-4 py-3 outline-none resize-none border ${
                      theme === "dark"
                        ? "bg-gray-300 border-gray-600"
                        : "bg-white border-gray-300"
                    } focus:border-[#FC8A06] focus:ring-4 focus:ring-[#FC8A06]/20`}
                  />
                </div>

                <div className="mb-5">
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-[#03081F]"
                    }`}
                  >
                    Payment Method
                  </label>

                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className={`w-full appearance-none rounded-xl px-4 py-3 pr-12 shadow-sm outline-none cursor-pointer border ${
                        theme === "dark"
                          ? "bg-gray-300 border-gray-600"
                          : "bg-gray-50 border-gray-300"
                      } focus:border-[#FC8A06] focus:ring-4 focus:ring-[#FC8A06]/20`}
                    >
                      <option value="cash">Cash on Delivery</option>
                      <option value="stripe">Stripe</option>
                      <option value="jazzcash">JazzCash</option>
                      <option value="easypaisa">EasyPaisa</option>
                    </select>
                    {paymentMethod !== "cash" && (
                      <div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
                        <p className="text-sm text-blue-700">
                          This payment is simulated for demonstration purposes.
                          A transaction ID will be generated automatically.
                        </p>
                      </div>
                    )}

                    {/* Custom Arrow */}
                    <div
                      className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Subtotal
                    </span>
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $ {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Delivery Fee
                    </span>
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $ {deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Discount
                    </span>
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      - $ {discount.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Paid
                    </span>
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      $ {paid.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className={`pt-4 flex justify-between text-lg font-bold border-t ${
                      theme === "dark"
                        ? "border-gray-700 text-white"
                        : "border-gray-400 text-gray-900"
                    }`}
                  >
                    <span>Remaining Amount</span>
                    <span className="text-[#FC8A06]">
                      $ {remainingAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Button */}

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full rounded-xl py-4 font-semibold mt-8 transition ${
                    cartItems.length === 0
                      ? "bg-gray-300  cursor-not-allowed"
                      : "bg-[#FC8A06] hover:bg-[#e57905] text-white"
                  }
                  ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  {cartItems.length === 0 ? "Cart is Empty" : "Send Order"}
                </button>

                {/* Note */}
              </div>
            </div>
            <p
              className={`text-xs leading-6 mt-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              In the case of a group order, the delivery cost is paid
              individually and the balance is refunded based on the total
              amount.
            </p>
          </div>
        </div>

        {/* ================= Members ================= */}
        {/* <div className="mt-8 space-y-5 max-w-[800px]">

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <img src={cart} alt="" className="w-6 h-6" />

              <span className="font-semibold">Veress Botond</span>
            </div>

            <span className="font-bold">14.00 RON</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FC8A06] flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>

              <span className="font-semibold">Erdei Barna</span>
            </div>

            <span className="text-yellow-500 font-bold">Paid</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FC8A06] flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>

              <span className="font-semibold">Mellau Máté</span>
            </div>

            <span className="text-yellow-500 font-bold">Paid</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
