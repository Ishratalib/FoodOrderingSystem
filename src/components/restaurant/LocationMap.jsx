import React from "react";
import previousLocationIcon from "../../assets/images/previous-location.png";
import ellipseIcon from "../../assets/images/Ellipse.png";

const RestaurantLocation = ({
  name = "McDonald's",
  branch = "South London",
  address = "Tooley St, London Bridge, London SE1 2TF, United Kingdom",
  phone = "+934443-43",
  website = "http://mcdonalds.uk/",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4967.0047552017495!2d-0.0842981!3d51.5039987!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1sen!2s!4v1783399215593!5m2!1sen!2s",

}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">
      <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl">

        {/* Map Embed */}
        <iframe
          src={mapEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location Map"
        />

        {/* Location Card */}
        <div className="
absolute
top-[90px]
left-3

sm:top-[80px]
sm:left-4

md:top-[110px]
md:left-5

lg:top-[120px]
lg:left-6

xl:top-[130px]
xl:left-8

2xl:top-[140px]
2xl:left-10

bg-[#03081F]
text-white
rounded-2xl

px-4
py-4

sm:px-5
sm:py-5

lg:px-6
lg:py-6

w-[85%]
sm:w-[250px]
md:w-[270px]
lg:w-[290px]
xl:w-[300px]

max-w-[300px]

shadow-2xl
z-20
">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{name}</h3>
          <p className="text-xs sm:text-sm font-semibold text-orange-500 mb-2 sm:mb-4">{branch}</p>

          <p className="text-[10px] sm:text-xs text-gray-300 leading-relaxed mb-2 sm:mb-4">
            {address}
          </p>

          <div className="mb-2 sm:mb-3">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white mb-1">Phone number</h4>
            <p className="text-[10px] sm:text-xs text-orange-500">{phone}</p>
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold text-white mb-1">Website</h4>
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs text-orange-500 hover:underline break-all"
            >
              {website}
            </a>
          </div>
        </div>

        {/* Previous Location Button + Callout Box (hidden on mobile, visible from sm and up) */}
        <div className="hidden sm:flex absolute top-1/2 right-6 -translate-y-1/2 items-center">

          {/* White callout box */}
          <div className="bg-white rounded-2xl shadow-lg pl-3 pr-7 sm:pl-4 sm:pr-9 py-2 -mr-5 sm:-mr-6 whitespace-nowrap">
            <p className="text-[11px] sm:text-xs font-bold text-[#03081F] leading-tight">{name}</p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-orange-500 leading-tight">{branch}</p>
          </div>

          {/* Previous Location Button (overlapping on top of box's right edge) */}
          <button
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${ellipseIcon})` }}
            aria-label="Previous location"
          >
            <img src={previousLocationIcon} alt="previous location" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLocation;