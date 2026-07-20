function DealCard({ image, discount, name }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group  bg-white">
      <div className="relative  overflow-hidden rounded-t-2xl lg:rounded-2xl">
        <img
          src={image}
          alt={name}
         className="
    w-full
    border
    h-[160px]
    sm:h-[200px]
    lg:h-[260px]
    object-cover
    rounded-2xl
    lg:rounded-2xl
    transition-transform
    duration-300
    group-hover:scale-105
  "/>
{/* Gradient overlay */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Discount badge*/}
        <div className="absolute top-0 right-3 sm:right-5 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-b-xl text-xs sm:text-sm font-semibold">
          {discount}
        </div>
       
        <div className="hidden lg:block absolute bottom-5 left-5">
          <p className="text-[#FC8A06] text-sm font-medium">
            Restaurant
          </p>
          <h3 className="text-white text-lg lg:text-xl font-bold leading-tight">
            {name}
          </h3>
        </div>
      </div>
      <div className="lg:hidden px-3 py-2.5 sm:px-4 sm:py-3">
        <p className="text-[#FC8A06] text-xs sm:text-sm font-medium">
          Restaurant
        </p>
        <h3 className="text-[#03081F] text-sm sm:text-lg font-bold leading-tight">
          {name}
        </h3>
      </div>

    </div>
  );
}

export default DealCard;