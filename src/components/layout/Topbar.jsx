import gift from "../../assets/icons/gift.png";
import ShoppingBasket from "../../assets/icons/ShoppingBasket.png";
import ForwardButton from "../../assets/icons/ForwardButton.png";
import Location from "../../assets/icons/Location.png";
import LocationDark from "../../assets/icons/locationDark.png";
import profileimg from "../../assets/images/profileimg.png";
import { useTheme } from "../../context/ThemeContext";

function TopBar() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full px-5 lg:px-8  ${
        theme === "dark"
          ? "bg-[#03081F]"
          : "bg-white"
      }`}
    >
      <div
  className={`mx-auto max-w-6xl rounded-b-[12px] overflow-hidden border ${
    theme === "dark"
      ? "bg-[#0F172A] border-gray-700"
      : "bg-[#FAFAFA] border-black/10"
  }`}
>
        {/* ================= DESKTOP / TABLET ROW ================= */}
        <div className="hidden sm:flex items-center justify-between h-[50px]">
          {/* LEFT SIDE - Promo */}
          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5 min-w-0">
              <img
                src={gift}
                alt="gift"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
              />
              <p
  className={`truncate text-[9px] sm:text-[11px] lg:text-[12px] font-medium ${
    theme === "dark" ? "text-white" : "text-[#03081F]"
  }`}
>
                Get 5% Off your first order,
                <span className="ml-1 text-[#FC8A06] underline">
                  Promo: ORDER5
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Location + Basket */}
          <div className="flex items-center flex-shrink-0">
            <div className="hidden md:flex items-center gap-1 px-2 lg:px-4">
              <img src={ theme === "dark" ? LocationDark : Location } 
              alt="location" className="w-4 h-4" />
              <p
  className={`text-[11px] lg:text-[12px] whitespace-nowrap ${
    theme === "dark" ? "text-gray-300" : "text-[#03081F]"
  }`}
>
                Regent Street, A4, A4201, London
              </p>
              <button className="text-[11px] text-[#FC8A06] underline whitespace-nowrap">
                Change Location
              </button>
            </div>

            <div className="flex h-[50px]">
              <div className={`flex items-center justify-center px-2 sm:px-3 ${
                theme === "dark" ? "bg-green-700" : "bg-[#028643]"
              }`}>
                <img
                  src={ShoppingBasket}
                  alt="basket"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
              <div className={`hidden sm:flex items-center justify-center px-3 ${
                theme === "dark" ? "bg-green-700" : "bg-[#028643]"
              }`}>
                <p className="text-[11px] font-semibold text-white">23 Items</p>
              </div>
              <div className={`flex items-center justify-center px-3 bg-[#028643] ${
                theme === "dark" ? "bg-green-700" : "bg-[#028643]"
              }`}>
                <p className="text-[10px] sm:text-[12px] font-semibold text-white whitespace-nowrap">
                  $ 79.89
                </p>
              </div>
              <div className={`flex items-center justify-center px-2 sm:px-3 ${
                theme === "dark" ? "bg-green-700" : "bg-[#028643]"
              }`}>
                <img
                  src={ForwardButton}
                  alt="forward"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ONLY: TOP ROW (Avatar + Cart) ================= */}
        <div className="flex sm:hidden items-stretch h-[48px]">
          {/* Left - Avatar / User (Orange) */}
          <div className="flex items-center gap-2 bg-[#FC8A06] pl-4 pr-6 rounded-l-md">
            <img
              src={profileimg}
              alt="user"
              className="w-7 h-7 rounded-full object-cover bg-white"
            />
            <p className="text-[13px] font-semibold text-white whitespace-nowrap">
              Aycan
            </p>
          </div>

          {/* Right - Cart (Green) */}
          <div className={`flex items-center justify-center gap-2 flex-1 rounded-r-md ${
            theme === "dark" ? "bg-green-700" : "bg-[#028643]"
          }`}>
            <img src={ShoppingBasket} alt="basket" className="w-4 h-4" />
            <p className="text-[13px] font-semibold text-white whitespace-nowrap">
              $ 79.89
            </p>
          </div>
        </div>

        {/* ================= MOBILE ONLY: LOCATION ROW ================= */}
<div
  className={`flex sm:hidden items-center gap-1.5 h-[36px] px-2 ${
    theme === "dark" ? "bg-[#0F172A]" : ""
  }`}
>          <img
            src={theme === "dark" ? LocationDark : Location}
            alt="location"
            className="w-3.5 h-3.5 flex-shrink-0"
          />
          <p
  className={`truncate text-[11px] ${
    theme === "dark" ? "text-gray-300" : "text-[#03081F]"
  }`}
>
            Lution Street, N4G-00...
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
