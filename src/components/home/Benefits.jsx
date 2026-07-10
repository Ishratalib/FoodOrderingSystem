import React from "react";
import partner from "../../assets/images/partnerWithUs.png";
import ride from "../../assets/images/rideWithUs.png";

export default function Benefits() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="relative h-[300px] sm:h-[330px] md:h-[350px] rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${partner})` }}
        >
          <div className="absolute top-0 left-4 sm:left-6 md:left-10 bg-white rounded-b-xl sm:rounded-b-2xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 z-20">
            <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">
              Earn more with lower fees
            </h3>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-4 sm:left-6 md:left-10 z-20 text-white">
            <p className="text-orange-400 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
              Signup as a business
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
              Partner with us
            </h2>

            <button className="bg-orange-500 hover:bg-orange-600 transition rounded-full font-semibold px-5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3">
              Get Started
            </button>
          </div>
        </div>

        {/* Rider Card */}
        <div
          className="relative h-[300px] sm:h-[330px] md:h-[350px] rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${ride})` }}
        >
          {/* Top Badge */}
          <div className="absolute top-0 left-4 sm:left-6 md:left-10 bg-white rounded-b-xl sm:rounded-b-2xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 z-20">
            <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">
              Avail exclusive perks
            </h3>
          </div>

          {/* Content */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-4 sm:left-6 md:left-10 z-20 text-white">
            <p className="text-orange-400 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
              Signup as a rider
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
              Ride with us
            </h2>

            <button className="bg-orange-500 hover:bg-orange-600 transition rounded-full font-semibold px-5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}