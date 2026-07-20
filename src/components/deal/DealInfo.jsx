import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  HiStar,
  HiClock,
  HiShoppingCart,
  HiLocationMarker,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import useToast from "../../hooks/useToast";

function DealInfo() {
  const { deal: dealDetail, loading } = useSelector((state) => state.deal);

  if (loading || !dealDetail) {
    return <p>Loading...</p>;
  }

  const restaurant = dealDetail.items?.[0]?.menu_item?.restaurant;
  const category = dealDetail.items?.[0]?.menu_item?.category;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // const handleAddToCart = () => {
  //   dispatch(
  //     addToCart({
  //      menu_item_id: 0,
  //     deal_id: dealDetail.id,
  //     })
  //   );
  // };
  return (
    <div
      className="bg-white rounded-3xl h-[500px] lg:h-[560px] flex flex-col 
     p-2"
    >
      <div>
        {/* Restaurant */}
        <div className="flex items-center gap-2 mb-2">
          <HiLocationMarker className="text-[#FC8A06] text-lg" />
          <span className="text-[#FC8A06] font-semibold text-sm">
            {restaurant?.name || "Restaurant"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-[#03081F] leading-tight">
          {dealDetail.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <HiStar className="text-yellow-400 text-lg" />
          <HiStar className="text-yellow-400 text-lg" />
          <HiStar className="text-yellow-400 text-lg" />
          <HiStar className="text-yellow-400 text-lg" />
          <HiStar className="text-yellow-400 text-lg" />
          <span className="ml-2 text-gray-500 text-sm">
            (4.9 • 320 Reviews)
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7">
          {dealDetail.description || "No Description Available"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-3xl font-bold text-[#FC8A06]">
            £{dealDetail.combo_price}
          </span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Save 42%
          </span>
        </div>

        {/* Delivery */}
        <div className="mt-6 flex items-center gap-3 bg-gray-100 rounded-2xl p-4">
          <HiClock className="text-[#FC8A06] text-2xl" />
          <div>
            <h3 className="font-semibold text-sm">Delivery Time</h3>
            <p className="text-gray-500 text-sm">20 - 30 Minutes</p>
          </div>
        </div>

        {/* Quantity */}
        {/* <div className="flex items-center gap-4 mt-3">
          <button className="w-9 h-9 rounded-full border text-xl">-</button>
          <span className="text-lg font-semibold">1</span>
          <button className="w-9 h-9 rounded-full border text-xl">+</button>
        </div> */}

        {/* Add To Cart */}
        <div className="mt-6">
          <button
            onClick={async () => {
              try {
                const result = await dispatch(
                  addToCart({
                    menu_item_id: 0,
                    deal_id: dealDetail.id,
                  }),
                ).unwrap();
                toast.success(result.message);
              } catch (error) {
                toast.error(error.message || "Failed to add item");
              }
            }}
            className="w-full bg-[#FC8A06] hover:bg-[#e97800] text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition"
          >
            <HiShoppingCart className="text-xl" />
            Add To Cart
          </button>
        </div>
      </div>

      {/* Extra */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Category</p>
          <h3 className="font-semibold mt-1 text-sm">
            {category?.name || "N/A"}
          </h3>
        </div>

        <div className="border rounded-xl p-3">
          <h3
            className={`font-semibold mt-1 text-sm ${
              dealDetail.is_active ? "text-green-600" : "text-red-600"
            }`}
          >
            {dealDetail.is_active ? "Available" : "Unavailable"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DealInfo;
