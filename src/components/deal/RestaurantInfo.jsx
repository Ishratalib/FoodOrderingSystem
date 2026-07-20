import { useSelector } from "react-redux";
import {
  HiLocationMarker,
  HiPhone,
  HiClock,
  HiStar,
} from "react-icons/hi";

function RestaurantInfo() {
  const { deal } = useSelector((state) => state.deal);

  const restaurant = deal?.items?.[0]?.menu_item?.restaurant;

  const image = restaurant?.image
    ? `http://127.0.0.1:8000${restaurant.image}`
    : null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">
        Restaurant Information
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left */}
        <div>

          <div className="flex items-center gap-4">

            <img
              src={image}
              alt={restaurant?.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <h3 className="text-2xl font-bold">
                {restaurant?.name}
              </h3>

              <div className="flex items-center mt-1">
                <HiStar className="text-yellow-400" />
                <HiStar className="text-yellow-400" />
                <HiStar className="text-yellow-400" />
                <HiStar className="text-yellow-400" />
                <HiStar className="text-yellow-400" />

                <span className="ml-2 text-gray-500">
                  Rating Not Available
                </span>
              </div>
            </div>

          </div>

          <p className="mt-6 text-gray-600">
            Restaurant description is not available.
          </p>

        </div>

        {/* Right */}
        <div className="space-y-5">

          <div className="flex gap-4">
            <HiLocationMarker className="text-[#FC8A06] text-3xl" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-500">
                Not Available
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <HiPhone className="text-[#FC8A06] text-3xl" />
            <div>
              <h4 className="font-semibold">Contact</h4>
              <p className="text-gray-500">
                Not Available
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <HiClock className="text-[#FC8A06] text-3xl" />
            <div>
              <h4 className="font-semibold">Opening Hours</h4>
              <p className="text-gray-500">
                Not Available
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default RestaurantInfo;