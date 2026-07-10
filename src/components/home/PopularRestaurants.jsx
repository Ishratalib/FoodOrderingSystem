import RestaurantCard from "./RestaurantCard";

import mcd from "../../assets/images/McDonald's.png";
import papa from "../../assets/images/Papa Johns.png";
import kfc from "../../assets/images/KFC.png";
import burger from "../../assets/images/Burger King.png";
import texas from "../../assets/images/Texas Chicken.png";
import shaurma from "../../assets/images/Shaurma.png";

const restaurants = [
  {
    id: 1,
    image: mcd,
    title: "McDonald's London",
  },
  {
    id: 2,
    image: papa,
    title: "Papa Johns",
  },
  {
    id: 3,
    image: kfc,
    title: "KFC West London",
  },
  {
    id: 4,
    image: texas,
    title: "Texas Chicken",
  },
  {
    id: 5,
    image: burger,
    title: "Burger King",
  },
  {
    id: 6,
    image: shaurma,
    title: "Shaurma 1",
  },
];

function PopularRestaurants() {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5 sm:mb-6">
        Popular Restaurants
      </h2>

      {/* Mobile & Tablet */}
      <div className="lg:hidden overflow-x-auto overflow-y-hidden pb-2 px-1">
        <div className="flex gap-1 sm:gap-2 md:gap-3 w-max">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
className="flex-shrink-0 w-[125px] sm:w-[145px] md:w-[180px]"            >
              <RestaurantCard
                image={restaurant.image}
                title={restaurant.title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            image={restaurant.image}
            title={restaurant.title}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularRestaurants;