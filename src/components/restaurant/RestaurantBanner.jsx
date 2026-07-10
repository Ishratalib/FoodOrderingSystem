import React from "react";
import resturant from "../../assets/images/resturant.png";
import mobileImageFile from "../../assets/images/restaurant-mob-img.png";
import miniOrderIcon from "../../assets/images/mini-order.png";
import clockIcon from "../../assets/images/clock.png";
import deliveryIcon from "../../assets/images/delivery-icon.png";
import ratingImg from "../../assets/images/rating.png";
import backgroundBurger from "../../assets/images/background-burger.png";
import restaurantDarkTheme from "../../assets/images/restaurantDarkTheme.png";
import { useTheme } from "../../context/ThemeContext"; // adjust path as per your project

const RestaurantBanner = ({
  name = "McDonald's East London",
  tagline = "I'm lovin' it!",
  image = resturant,
  mobileImage = mobileImageFile,
  minOrder = 12,
  deliveryTime = "20-25 Minutes",
  openUntil = "3:00 AM",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgImage = isDark ? restaurantDarkTheme : backgroundBurger;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">

      {/* ===================== DESKTOP VIEW (lg and up) ===================== */}

      <div
        className="hidden lg:block relative rounded-2xl overflow-hidden text-gray-900 bg-gray-100 bg-no-repeat bg-cover bg-center transition-[background-image] duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative flex items-center justify-between lg:gap-0 xl:gap-0 px-5 lg:py-5 xl:py-5 ">

          {/* Left Section */}
          <div className="max-w-[50%] text-left ">
            <p className={`text-sm mb-1 ${isDark ? "text-white" : "text-gray-600"}`}>
              {tagline}
            </p>
            <h1 className={`text-5xl font-extrabold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              {name}
            </h1>

            <div className="flex flex-nowrap gap-3">
              <span
                className={`flex items-center gap-2 bg-[#0b1020] text-white rounded-full px-4 py-2.5 text-xs whitespace-nowrap ${
                  isDark ? "border border-white" : ""
                }`}
              >
                <img src={miniOrderIcon} alt="minimum order" className="w-[18px] h-[18px]" />
                Minimum Order: {minOrder} GBP
              </span>
              <span
                className={`flex items-center gap-2 bg-[#0b1020] text-white rounded-full px-4 py-2.5 text-xs whitespace-nowrap ${
                  isDark ? "border border-white" : ""
                }`}
              >
                <img src={deliveryIcon} alt="delivery" className="w-[18px] h-[18px]" />
                Delivery in {deliveryTime}
              </span>
            </div>
          </div>

          {/* Right Section - Food Image */}
          <div className="relative flex items-center justify-center shrink-0 z-10 ">
            <img
              src={image}
              alt={name}
              className="object-cover rounded-xl lg:w-[340px] xl:w-[500px] xl:h-[300px]"
            />

            {/* Rating Image */}
            <img
              src={ratingImg}
              alt="rating"
              className="absolute -bottom-6 -left-12 w-[100px] drop-shadow-xl z-20 rounded-[12px]"
            />
          </div>
        </div>

        {/* Footer Badge */}
        <div className="relative flex items-center gap-1.5 bg-orange-500 text-white text-xs px-5 py-2.5 rounded-tr-xl w-fit">
          <img src={clockIcon} alt="clock" className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">Open until {openUntil}</span>
        </div>
      </div>

      {/* ===================== MOBILE / TABLET VIEW (below lg) ===================== */}
      <div
        className="flex lg:hidden flex-col rounded-2xl overflow-hidden text-gray-900 bg-gray-100 bg-no-repeat bg-cover bg-center p-3 transition-[background-image] duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
      >

        {/* Hero Image */}
        <div className="relative w-fit mx-auto">
          <img
            src={mobileImage}
            alt={name}
            className="w-[70vw] max-w-[228px] h-auto aspect-[228/142] object-cover rounded-[12px]"
          />

          {/* Rating */}
          <img
            src={ratingImg}
            alt="rating"
            className="
              absolute
              -bottom-2
              -left-4
              w-[55px]
              h-[62px]
              rounded-[12px]
              z-20
            "
          />
        </div>

        {/* Open Until */}
        <div className="relative mt-4">
          <div
            className="
              w-[90%]
              max-w-[320px]
              h-[50px]
              bg-[#FC8A06]
              rounded-tr-[12px]
              rounded-br-[12px]
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <img
              src={clockIcon}
              alt="clock"
              className="w-4 h-4"
            />

            <span className="text-white text-sm font-medium">
              Open until {openUntil}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-2 py-5 text-center">
          <p className={`text-xs mb-1 ${isDark ? "text-white" : "text-gray-600"}`}>
            {tagline}
          </p>

          <h1 className={`text-xl font-extrabold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {name}
          </h1>

          <div className="flex flex-col gap-3 items-center">
            <span
              className={`
                w-[90%]
                max-w-[330px]
                h-[55px]
                bg-[#03081F]
                rounded-full
                flex
                items-center
                justify-center
                gap-2
                text-white
                text-xs
                ${isDark ? "border border-white" : ""}
              `}
            >
              <img
                src={miniOrderIcon}
                alt="minimum order"
                className="w-4 h-4"
              />
              Minimum Order: {minOrder} GBP
            </span>

            <span
              className={`
                w-[90%]
                max-w-[330px]
                h-[55px]
                bg-[#03081F]
                rounded-full
                flex
                items-center
                justify-center
                gap-2
                text-white
                text-xs
                ${isDark ? "border border-white" : ""}
              `}
            >
              <img
                src={deliveryIcon}
                alt="delivery"
                className="w-4 h-4"
              />
              Delivery in {deliveryTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;