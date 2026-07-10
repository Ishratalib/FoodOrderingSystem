import React from "react";
import burger from "../../assets/images/burger1.png";
import fries from "../../assets/images/fries1.png";
import discount from "../../assets/images/discount.png";
import profile from "../../assets/icons/profile.png";
import cart from "../../assets/icons/shoppingCart.png";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      image: burger,
      name: "Honest burger",
      description:
        "Our regular two patty burger with crispy apple-wood smoked bacon and two slices of melted American cheese.",
      extra: "Extra: bacon, cheddar cheese",
      cutlery: "Without cutlery",
      qty: 1,
      price: "18.00 RON",
    },
    {
      id: 2,
      image: fries,
      name: "French fries",
      description:
        "Hot, fresh boardwalk-style fries. Cut fresh, cooked twice and salted.",
      extra: "",
      cutlery: "Without cutlery",
      qty: 1,
      price: "6.00 RON",
    },
  ];

  return (
    <section className="bg-[#F7F8FA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back */}
        <button className="flex items-center gap-2 text-gray-600 cursor-pointer transition text-sm font-medium mb-5 hover:text-[#FC8A06]" onClick={()=>navigate('/restaurants')}>
          ← Back
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Group order checkout
        </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ================= LEFT SIDE ================= */}

          <div className="xl:col-span-2 space-y-6">
            {/* Cart Card */}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Card Header */}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-b-gray-300 px-4 sm:px-6 py-5">
                <div className="flex items-center gap-3">
                  <img src={cart} alt="" className="w-6 h-6" />

                  <h2 className="font-semibold text-lg">My cart</h2>
                </div>

                <button className="w-full sm:w-auto border border-[#FC8A06] hover:bg-[#FC8A06] hover:text-white transition px-6 py-2 rounded-lg font-semibold text-[#FC8A06]">
                  Confirm
                </button>
              </div>

              {/* Cart Items */}

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-5 px-4 sm:px-6 py-6"
                >
                  {/* Image */}

                  <img
                    src={item.image}
                    alt=""
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0 mx-auto md:mx-0"
                  />

                  {/* Content */}

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 leading-6">
                          {item.description}
                        </p>

                        {item.extra && (
                          <p className="font-semibold text-sm text-gray-800 mt-4">
                            {item.extra}
                          </p>
                        )}

                        <p className="text-sm mt-2 font-medium text-gray-900">
                          {item.cutlery}
                        </p>
                      </div>

                      {/* Price */}

                      <div className="flex justify-between sm:block sm:text-right whitespace-nowrap mt-3 sm:mt-0">
                        <h4 className="font-bold text-md text-gray-900">
                          {item.qty}X
                        </h4>

                        <p className="font-bold text-md mt-2">{item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ---------- Summary Section Starts ---------- */}

              <div className="px-6 py-6 border-t border-t-gray-300">
                <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">
                  {/* Discount Button */}
                  <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-3 border border-gray-300 rounded-xl px-5 py-3 hover:border-[#FC8A06] hover:bg-yellow-100 transition">
                      <img src={discount} alt="" className="w-6 h-6" />

                      <span className="font-semibold">Add discount</span>
                    </button>
                  </div>

                  {/* Totals */}

                  <div className="w-full lg:max-w-xs">
                    <div className="flex justify-between text-gray-900 text-sm font-semibold">
                      <span>Subtotal</span>
                      <span>43.00 RON</span>
                    </div>

                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Delivery fee</span>
                      <span>2.00 RON</span>
                    </div>

                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Discount</span>
                      <span>-10.00 RON</span>
                    </div>

                    <div className="pt-3 flex justify-between font-bold text-md">
                      <span>TOTAL</span>
                      <span>35.00 RON</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div>
            <div className="">
              <h2 className="text-3xl font-bold text-gray-900">Total</h2>

              <p className="text-2xl text-gray-700 mb-8">payment</p>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
                {/* Payment Details */}

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">144.00 RON</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery fee</span>
                    <span>0.00 RON</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span>-25.00 RON</span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <span className="font-medium">Paid</span>

                    <span className="font-semibold">-85.00 RON</span>
                  </div>

                  <div className=" pt-4 flex justify-between text-lg font-bold">
                    <span>Remaining amount</span>

                    <span>59.00 RON</span>
                  </div>
                </div>

                {/* Button */}

                <button className="w-full bg-gray-200 hover:bg-[#FC8A06] hover:text-white transition rounded-xl py-4 font-semibold mt-8">
                  Send order
                </button>

                {/* Note */}
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-6 mt-8">
              In the case of a group order, the delivery cost is paid
              individually and the balance is refunded based on the total
              amount.
            </p>
          </div>
        </div>

        {/* ================= Members ================= */}
        <div className="mt-8 space-y-5 max-w-[800px]">
          {/* Member 1 */}

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <img src={cart} alt="" className="w-6 h-6" />

              <span className="font-semibold">Veress Botond</span>
            </div>

            <span className="font-bold">14.00 RON</span>
          </div>

          {/* Member 2 */}

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FC8A06] flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>

              <span className="font-semibold">Erdei Barna</span>
            </div>

            <span className="text-yellow-500 font-bold">Paid</span>
          </div>

          {/* Member 3 */}

          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FC8A06] flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>

              <span className="font-semibold">Mellau Máté</span>
            </div>

            <span className="text-yellow-500 font-bold">Paid</span>
          </div>
        </div>
      </div>
    </section>
  );
}
