import CategoryCard from "./CategoryCard";

import burgers from "../../assets/images/category-burgers.png";
import salads from "../../assets/images/category-salads.png";
import pasta from "../../assets/images/category-pasta.png";
import pizza from "../../assets/images/category-pizza.png";
import breakfast from "../../assets/images/category-breakfast.png";
import soups from "../../assets/images/category-ordinary.png";

const categories = [
  { id: 1, image: burgers, name: "Burgers & Fast food", restaurantCount: 21 },
  { id: 2, image: salads, name: "Salads", restaurantCount: 32 },
  { id: 3, image: pasta, name: "Pasta & Casuals", restaurantCount: 4 },
  { id: 4, image: pizza, name: "Pizza", restaurantCount: 32 },
  { id: 5, image: breakfast, name: "Breakfast", restaurantCount: 4 },
  { id: 6, image: soups, name: "Soups", restaurantCount: 32 },
];

function PopularCategories() {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#03081F] mb-4 sm:mb-6">
        Order.uk Popular Categories 🤩
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            image={cat.image}
            name={cat.name}
            restaurantCount={cat.restaurantCount}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularCategories;
