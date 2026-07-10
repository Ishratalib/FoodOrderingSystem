import React from "react";
import { useState } from "react";
import searchIcon from "../../assets/icons/search.png";
import cart from "../../assets/icons/shoppingCart.png";
import discountPercentageBg from "../../assets/images/discountPercentageBg.png";
import firstOrderDis from "../../assets/images/firstOrderDis.png";
import plusBgImg from "../../assets/images/plusBgImg.png";
import plus from "../../assets/images/plus.png";
import veganDis from "../../assets/images/veganDis.png";
import iceCreamOffer from "../../assets/images/iceCreamOffer.png";
import Burger from "./items/Burger";
import Fries from "./items/Fries";
import Drinks from "./items/Drinks";
import Snacks from "./items/Snacks";
import Salads from "./items/Salads";
import Dessert from "./items/Dessert";
import HotDrinks from "./items/HotDrinks";
import Sauce from "./items/Sauce";
import HappyMeal from "./items/HappyMeal";
import Orbit from "./items/Orbit";
import menuIcon from "../../assets/icons/restaurantMenuIcon.png";
import { HiX, HiMenu } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function MenuItems() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const tabs = [
    "Offers",
    "Burgers",
    "Fries",
    "Snacks",
    "Salads",
    "Cold drinks",
    "Happy Meal®",
    "Desserts",
    "Hot drinks",
    "Sauces",
    "Orbit®",
  ];

  const offers = [
    {
      title: "First Order Discount",
      restaurant: "McDonald's East London",
      image: firstOrderDis,
      discount: "-20%",
    },
    {
      title: "Vegan Discount",
      restaurant: "McDonald's East London",
      image: veganDis,
      discount: "-20%",
    },
    {
      title: "Free Ice Cream Offer",
      restaurant: "McDonald's East London",
      image: iceCreamOffer,
      discount: "-100%",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex-1">
            All Offers from McDonald's East London
          </h1>

          {/* <button
            onClick={() => navigate("/cart")}
            className="transition-transform duration-300 hover:scale-110"
          >
            <img
              src={cart}
              alt="Cart"
              className="w-6 sm:w-7 lg:w-8 cursor-pointer"
            />
          </button> */}
        </div>
      </section>
      <div
        className={`hidden xl:block ${
          theme === "dark" ? "bg-[#FC8A06]" : "bg-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex overflow-x-auto whitespace-nowrap px-4 py-3 gap-3 no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition text-[#03081F]
            ${theme === "dark" ? "text-white" : ""}
        ${
          activeTab === index
            ? "bg-[#03081F] text-white"
            : "hover:bg-[#03081F] hover:text-white"
        }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="xl:hidden max-w-7xl mx-auto px-4 py-4 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full border border-gray-400 rounded-2xl bg-white px-5 py-0 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <img src={menuIcon} alt="menuIcon" className="w-10" />

            <h2 className="text-3xl font-bold text-[#03081F]">Menu</h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-md">{tabs[activeTab]}</span>

            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <IoChevronDown
                className={`text-2xl transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </button>
        {menuOpen && (
          <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-3 border border-transparent
          ${activeTab === index ? "bg-[#03081F] text-white" : "hover:border-[#03081F]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeTab === 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="relative h-[260px] rounded-2xl overflow-hidden group"
              >
                {/* Background */}

                <img
                  src={offer.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 duration-300"
                />

                {/* Dark Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Discount */}

                <div className="absolute top-0 right-5 bg-[#0B1026] px-4 py-5 rounded-b-xl">
                  <p className="text-white font-semibold">{offer.discount}</p>
                </div>

                {/* Text */}

                <div className="absolute bottom-6 left-5">
                  <p className="text-[#FC8A06] text-sm">{offer.restaurant}</p>

                  <h2 className="text-white text-lg sm:text-xl md:text-xl md:mb-10 lg:mb-0 xl:mb-0 text-center lg:text-xl xl:text-3xl font-bold mt-1">
                    {offer.title}
                  </h2>
                </div>

                {/* Plus Button */}

                <button className="absolute bottom-0 right-0 bg-white/90 w-16 h-16 rounded-tl-3xl flex items-center justify-center">
                  <img src={plus} alt="" className="w-6" />
                </button>
              </div>
            ))}
          </div>
          <Burger />

          <Fries />

          <Snacks />

          <Salads />

          <Drinks />

          <HappyMeal />

          <Dessert />

          <HotDrinks />

          <Sauce />

          <Orbit />
        </section>
      )}

      {activeTab === 1 && <Burger />}

      {activeTab === 2 && <Fries />}

      {activeTab === 3 && <Snacks />}

      {activeTab === 4 && <Salads />}

      {activeTab === 5 && <Drinks />}

      {activeTab === 6 && <HappyMeal />}

      {activeTab === 7 && <Dessert />}

      {activeTab === 8 && <HotDrinks />}

      {activeTab === 9 && <Sauce />}

      {activeTab === 10 && <Orbit />}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-6 right-6 z-50 bg-[#FC8A06] p-4 rounded-full shadow-xl hover:scale-110 hover:bg-[#e67a00] transition-transform duration-300 cursor-pointer"
      >
        <img src={cart} alt="Cart" className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </>
  );
}

export default MenuItems;
