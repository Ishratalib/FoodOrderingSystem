import { useSelector } from "react-redux";
import cart from "../../assets/icons/shoppingCart.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

function DealGallery() {
  const navigate = useNavigate();
  
  const { deal: dealDetail } = useSelector((state) => state.deal);

  const image = dealDetail?.image
    ? `${BASE_URL}${dealDetail.image}`
    : null;

  return (
    <div className="relative overflow-hidden rounded-3xl h-[300px] sm:h-[380px] lg:h-[460px]">
      <img
        src={image}
        alt={dealDetail?.name}
        className="w-full h-full object-contain"
      />

      {dealDetail?.is_featured && (
        <div className="absolute top-4 left-4 bg-[#FC8A06] text-white px-4 py-2 rounded-xl text-sm font-semibold">
          Featured Deal
        </div>
      )}
    <button
            onClick={() => navigate("/cart")}
            className="fixed bottom-6 right-6 z-50 bg-[#FC8A06] p-4 rounded-full shadow-xl hover:scale-110 hover:bg-[#e67a00] transition-transform duration-300 cursor-pointer"
          >
            <img src={cart} alt="Cart" className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>  
    </div>

  );
}

export default DealGallery;