function CategoryCard({ image, name, restaurantCount }) {
  return (
    <div className="cursor-pointer group rounded-xl border border-gray-200 overflow-hidden bg-gray-100">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-2 py-2 sm:py-3">
        <h3 className="text-[#03081F] text-xs sm:text-sm md:text-base font-semibold truncate">
          {name}
        </h3>
        <p className="text-[#FC8A06] text-[10px] sm:text-xs font-medium">
          {restaurantCount} Restaurants
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;