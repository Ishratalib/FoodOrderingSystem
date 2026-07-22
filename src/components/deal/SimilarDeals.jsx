import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

function SimilarDeals() {
  const navigate = useNavigate();

  const {
    deal: currentDeal,
    allDeals,
    allDealsLoading,
  } = useSelector((state) => state.deal);

  if (allDealsLoading) {
    return <p>Loading...</p>;
  }

  // Current deal ko hata do aur sirf 4 show karo
 
 const similarDeals = allDeals.filter((deal) => deal.id !== currentDeal?.id);
  
  return (
    <section className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#03081F]">
          Similar Deals
        </h2>

        {/* <button className="text-[#FC8A06] flex items-center gap-2 font-semibold hover:gap-3 transition-all">
          View All
          <HiArrowRight />
        </button> */}
      </div>

      {similarDeals.length === 0 ? (
        <p className="text-gray-500">No Similar Deals Found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarDeals.map((deal) => {
            const restaurant =
              deal.items?.[0]?.menu_item?.restaurant;

            return (
              <div
                key={deal.id}
                onClick={() => navigate(`/deal/${deal.id}`)}
                className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer bg-white"
              >
                <img
                  src={
                    deal.image
                      ? `${BASE_URL}${deal.image}`
                      : "https://via.placeholder.com/400x300?text=Deal"
                  }
                  alt={deal.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <p className="text-[#FC8A06] text-sm">
                    {restaurant?.name || "Restaurant"}
                  </p>

                  <h3 className="font-bold mt-2 text-lg line-clamp-2">
                    {deal.name}
                  </h3>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-[#03081F]">
                      £{deal.combo_price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/deal/${deal.id}`);
                      }}
                      className="bg-[#FC8A06] text-white px-4 py-2 rounded-full hover:bg-[#e77900]"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SimilarDeals;