import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealById , fetchAllDeals } from "../../redux/slices/dealSlice";
import DealGallery from "../../components/deal/DealGallery";
import DealInfo from "../../components/deal/DealInfo";
import WhatsIncluded from "../../components/deal/WhatsIncluded";
import RestaurantInfo from "../../components/deal/RestaurantInfo";
import SimilarDeals from "../../components/deal/SimilarDeals";
import { Link } from "react-router-dom";

function DealDetail() {
   const { id } = useParams();
// console.log("Deal ID:", id);
  const dispatch = useDispatch();

  const { deal, loading, error } = useSelector(
    (state) => state.deal
  );

  useEffect(() => {
  dispatch(fetchDealById(id));
  dispatch(fetchAllDeals());
}, [dispatch, id]);
  if (loading) {
    return <h2 className="text-center py-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center py-10">{error}</h2>;
  }

  // console.log(deal);
  return (
    <section className="bg-[#F8F8F8] min-h-screen py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
<p className="text-sm text-gray-500 mb-6">
  <Link to="/" className="hover:text-[#FC8A06] transition">
    Home
  </Link>{" "}
  /
  <span className="text-[#FC8A06]">
    {" "}
    {deal?.name}
  </span>
</p>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-sm p-5 lg:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            <DealGallery deal={deal} />

          <DealInfo deal={deal} />

          </div>

        </div>

        {/* What's Included */}

        <div className="mt-8">
        <WhatsIncluded deal={deal} />
        </div>

        {/* Restaurant */}

        <div className="mt-8">
         
       <RestaurantInfo deal={deal} />
        </div>

        {/* Similar Deals */}

        <div className="mt-8">
          <SimilarDeals deal={deal} />
        </div>

      </div>

    

    </section>
  );
}

export default DealDetail;