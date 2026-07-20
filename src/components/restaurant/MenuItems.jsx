import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Icons & Images Imports
import cart from "../../assets/icons/shoppingCart.png";
import plus from "../../assets/images/plus.png";
import firstOrderDis from "../../assets/images/firstOrderDis.png";
import veganDis from "../../assets/images/veganDis.png";
import iceCreamOffer from "../../assets/images/iceCreamOffer.png";
import menuIcon from "../../assets/icons/restaurantMenuIcon.png";
import plusBgImg from "../../assets/images/plusBgImg.png";
import { useTheme } from "../../context/ThemeContext";
import { fetchCategories, fetchMenuItems } from "../../redux/slices/menuSlice";
import { BASE_URL } from "../../api/api";
import { addToCart } from "../../redux/slices/cartSlice";
import useToast from "../../hooks/useToast";
function MenuItems() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // Redux States
  const { categories, menuItems, loading } = useSelector((state) => state.menu);

  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Dynamic Tabs Array
  const tabs = [{ id: 0, name: "Offers" }, ...categories];
  const selectedCategory = tabs[activeTab]?.name;

  // Static Offers Data
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

  // Ek reusable function jo kisi bhi category ke items filter karega
  const getItemsByCategory = (categoryName) => {
    return (
      menuItems?.filter((item) => item.category?.name === categoryName) || []
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Categories & Menu...</p>
      </div>
    );
  }

  // Helper component taake Grid Layout duplicate na likhna pare
  const ItemsGrid = ({ items }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col lg:flex-row justify-between lg:items-center p-5 gap-4"
        >
          {/* Left Side */}

          <div className="lex flex-col justify-between w-full lg:w-[58%]">
            <div>
              <h2 className="text-md font-bold text-[#03081F] leading-6">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-2 text-sm leading-5">
                {item.description}
              </p>
            </div>

            <h3 className="text-md font-bold mt-5">$ {item.price}</h3>
          </div>

          {/* Right Side */}

          <div className="relative w-full lg:w-[160px] h-[120px] sm:h-[140px] md:h-[150px] lg:h-[150px] flex justify-center lg:block flex-shrink-00">
            <img
              src={`${BASE_URL}${item.image}`}
              alt={item.name}
              className="w-32 sm:w-36 md:w-40 lg:w-full h-full object-contain lg:object-fill mx-auto"
            />

            {/* Plus Button */}

            <div className="absolute bottom-0 right-0">
              <img src={plusBgImg} alt="" className="w-18" />

              <img
                src={plus}
                alt=""
                onClick={async () => {
                  try {
                    const result = await dispatch(
                      addToCart({
                        menu_item_id: item.id,
                        deal_item_id: 0,
                      }),
                    ).unwrap();
                    toast.success(result.message);
                  } catch (error) {
                    toast.error(error.message || "Failed to add item");
                  }
                }}
                className="absolute top-1/2 left-1/2 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation Tabs (XL Screens) */}
      <div
        className={`hidden xl:block ${theme === "dark" ? "bg-[#FC8A06]" : "bg-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto flex overflow-x-auto whitespace-nowrap px-4 py-3 gap-3 no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={tab.id || index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition text-[#03081F]
                ${theme === "dark" ? "text-white" : ""}
                ${activeTab === index ? "bg-[#03081F] text-white" : "hover:bg-[#03081F] hover:text-white"}
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <div className="xl:hidden max-w-7xl mx-auto px-4 py-4 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full border border-gray-400 rounded-2xl bg-white px-5 py-2 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <img src={menuIcon} alt="menuIcon" className="w-10" />
            <h2 className="text-2xl font-bold text-[#03081F]">Menu</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-md font-semibold">
              {" "}
              {tabs[activeTab]?.name}
            </span>
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <IoChevronDown className="text-2xl" />
            )}
          </div>
        </button>

        {menuOpen && (
          <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id || index}
                onClick={() => {
                  setActiveTab(index);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-3 border-b border-gray-100 last:border-none
                  ${activeTab === index ? "bg-[#03081F] text-white" : "hover:bg-gray-50"}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- VIEW 1: Offers Tab Active (Offers + All Categories) --- */}
      {/* Header Title */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[#FC8A06] text-xl sm:text-2xl lg:text-3xl font-bold flex-1">
            {activeTab === 0 ? "All Offers" : `${selectedCategory}`}
          </h1>
        </div>
      </section>
      {activeTab === 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          {/* Top Offers Slider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="relative h-[260px] rounded-2xl overflow-hidden group shadow-md"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-0 right-5 bg-[#0B1026] px-4 py-5 rounded-b-xl">
                  <p className="text-white font-semibold">{offer.discount}</p>
                </div>
                <div className="absolute bottom-6 left-5">
                  <p className="text-[#FC8A06] text-sm">{offer.restaurant}</p>
                  <h2 className="text-white text-xl font-bold mt-1">
                    {offer.title}
                  </h2>
                </div>
                <button className="absolute bottom-0 right-0 bg-white/90 w-16 h-16 rounded-tl-3xl flex items-center justify-center">
                  <img src={plus} alt="Add" className="w-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Saari Categories Loop ho rahi hain sequence wise */}
          <div className="space-y-14">
            {categories.map((cat, index) => {
              const currentCatItems = getItemsByCategory(cat.name);
              // Agar category khali ho toh heading mat dikhao
              if (currentCatItems.length === 0) return null;

              return (
                <div key={cat.id || index} className="space-y-6">
                  <h2 className="text-3xl font-extrabold text-[#FC8A06] tracking-wide border-b pb-2 border-gray-100">
                    {cat.name}
                  </h2>

                  <ItemsGrid items={currentCatItems} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* --- VIEW 2: Single Specific Category Tab Active --- */}
      {selectedCategory !== "Offers" && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          {getItemsByCategory(selectedCategory).length > 0 ? (
            <ItemsGrid items={getItemsByCategory(selectedCategory)} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No items available in this category.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Sticky Cart Button */}
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
