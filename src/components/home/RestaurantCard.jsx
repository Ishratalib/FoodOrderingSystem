function RestaurantCard({ image, title }) {
  const isTexas = title === "Texas Chicken";

  return (
    <div
      className={`
        w-full
        rounded-[12px]
        overflow-hidden
        flex
        flex-col
        ${isTexas ? "border border-[#D9D9D9]" : ""}
      `}
    >
      {/* Image */}
      <div className="w-full aspect-[238/203]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <div className="bg-[#FF8A00] min-h-[40px] sm:min-h-[46px] lg:min-h-[60px] flex items-center justify-center px-2">
        <p className="text-white text-[10px] sm:text-[11px] lg:text-[15px] font-medium text-center">
          {" "}
          {title}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;