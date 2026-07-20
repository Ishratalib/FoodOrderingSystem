import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllDeals } from "../../redux/slices/dealSlice";
import DealCard from "./DealCard";
import NextPage from "../../assets/images/Next Page.png";


function ExclusiveDeals() {
const [activeTab, setActiveTab] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();

const { allDeals, allDealsLoading } = useSelector(
  (state) => state.deal
);
const categories = [
  "All",
  ...new Set(allDeals.map((deal) => deal.name)),
];

useEffect(() => {
  dispatch(fetchAllDeals());
}, [dispatch]);
const filteredDeals =
  activeTab === "All"
    ? allDeals
    : allDeals.filter((deal) => deal.name === activeTab);
if (allDealsLoading) {
  return <h2>Loading...</h2>;
}
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 sm:py-6">
      {/* Header*/}
      <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
        <h2 className="text-[11px] xs:text-xs sm:text-lg lg:text-xl font-bold text-[#03081F] flex-shrink min-w-0 truncate lg:flex-shrink-0 lg:truncate-none">
          Up to -40% 🎊 Order.uk exclusive deals
        </h2>

        {/* MOBILE / TABLET: */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between gap-3 min-w-[170px] sm:min-w-[220px] lg:min-w-[260px] px-4 py-3 border rounded-full bg-white text-sm lg:text-base font-medium"
          >
            <img
              src={NextPage}
              alt="dropdown"
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />

            <span> {activeTab}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
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
        {/* <div className="hidden lg:flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar max-w-[55%]">
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
        </div> */}
      </div>

      {/* Cards
       */}
      <div
        className="
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
"
      >
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
  onClick={() => navigate(`/deal/${deal.id}`)}
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
  image={
    deal.image
      ? `http://127.0.0.1:8000${deal.image}`
      : null
  }
  discount={deal.is_featured ? "Featured" : "Deal"}
  name={deal.name}
/>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExclusiveDeals;