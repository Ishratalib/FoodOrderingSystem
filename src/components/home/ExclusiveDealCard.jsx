import { useState } from "react";
import DealCard from "./DealCard";
// import { HiChevronDown } from "react-icons/hi";
import NextPage from "../../assets/images/Next Page.png";
import deal1 from "../../assets/images/deal1.png";
import deal2 from "../../assets/images/deal2.png";

const categories = ["Vegan", "Sushi", "Fast Food", "Others"];
const deals = [
  { id: 1, image: deal1, discount: "-40%", name: "Chef Burgers London", category: "Fast Food" },
  { id: 2, image: deal2, discount: "-30%", name: "Burger King", category: "Fast Food" },
  { id: 3, image: deal1, discount: "-25%", name: "KFC London", category: "Fast Food" },
  { id: 4, image: deal2, discount: "-20%", name: "Green Vegan", category: "Vegan" },
  { id: 5, image: deal1, discount: "-18%", name: "Vegan House", category: "Vegan" },
  { id: 6, image: deal2, discount: "-15%", name: "Healthy Bowl", category: "Vegan" },
  { id: 7, image: deal1, discount: "-10%", name: "Tokyo Sushi", category: "Sushi" },
  { id: 8, image: deal2, discount: "-12%", name: "Sushi World", category: "Sushi" },
  { id: 9, image: deal1, discount: "-22%", name: "Sushi Hub", category: "Sushi" },
  { id: 10, image: deal2, discount: "-28%", name: "Pizza House", category: "Others" },
  { id: 11, image: deal1, discount: "-35%", name: "Italian Pizza", category: "Others" },
  { id: 12, image: deal2, discount: "-16%", name: "Cafe Delight", category: "Others" },
];

function ExclusiveDeals() {
  const [activeTab, setActiveTab] = useState("Fast Food");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredDeals = deals.filter((deal) => deal.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">

      {/* Header*/}
      <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">

        <h2 className="text-[11px] xs:text-xs sm:text-lg lg:text-xl font-bold text-[#03081F] flex-shrink min-w-0 truncate lg:flex-shrink-0 lg:truncate-none">
    Up to -40% 🎊 Order.uk exclusive deals
        </h2>

        {/* MOBILE / TABLET: */}
        <div className="relative flex-shrink-0 lg:hidden">
          <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="flex items-center gap-2 text-black text-[9px] sm:text-sm font-medium px-2 sm:px-4 py-2 rounded-full border border-black-300 whitespace-nowrap"
>
  <img
    src={NextPage}
    alt="dropdown"
    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
      dropdownOpen ? "rotate-180" : ""
    }`}
  />

  <span>Pizza &amp; {activeTab}</span>
</button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden z-10 min-w-[140px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    activeTab === cat
                      ? "bg-[#FC8A06]/10 text-[#FC8A06] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP: (on lg:screen) */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
             className={`text-sm font-medium whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
  activeTab === cat
    ? "text-[#FC8A06] border-[#FC8A06]"
    : "text-gray-500 border-transparent hover:text-black"
}`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Cards
      */}
   <div className="
flex
overflow-x-auto
snap-x
snap-mandatory
no-scrollbar
gap-4

lg:grid
lg:grid-cols-3
lg:gap-6
lg:overflow-visible
">
  {filteredDeals.map((deal) => (
    <div
      key={deal.id}
      className="
      snap-start
      min-w-full
      sm:min-w-[48%]
      lg:min-w-0
      lg:w-auto
      flex-shrink-0
      "
    >
      <DealCard
        image={deal.image}
        discount={deal.discount}
        name={deal.name}
      />
    </div>
  ))}
</div>

    </section>
  );
}

export default ExclusiveDeals;