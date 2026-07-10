import React from "react";
import IDVerifiedIcon from "../../assets/images/id-verified.png";
import trackingIcon from "../../assets/images/tracking.png";
import operationalTimesIcon from "../../assets/images/operational-times.png";

const InfoSection = () => {
  const deliverySchedule = [
    { day: "Monday", time: "12:00 AM - 3:00 AM, 8:00 AM - 3:00 AM" },
    { day: "Tuesday", time: "8:00 AM - 3:00 AM" },
    { day: "Wednesday", time: "8:00 AM - 3:00 AM" },
    { day: "Thursday", time: "8:00 AM - 3:00 AM" },
    { day: "Friday", time: "8:00 AM - 3:00 AM" },
    { day: "Saturday", time: "8:00 AM - 3:00 AM" },
    { day: "Sunday", time: "8:00 AM - 12:00 AM" },
  ];

  const operationalSchedule = [
    { day: "Monday", time: "8:00 AM - 3:00 AM" },
    { day: "Tuesday", time: "8:00 AM - 3:00 AM" },
    { day: "Wednesday", time: "8:00 AM - 3:00 AM" },
    { day: "Thursday", time: "8:00 AM - 3:00 AM" },
    { day: "Friday", time: "8:00 AM - 3:00 AM" },
    { day: "Saturday", time: "8:00 AM - 3:00 AM" },
    { day: "Sunday", time: "8:00 AM - 3:00 AM" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">
      <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-white shadow-xl ">

        {/* Delivery Information */}
        <div className="flex-1 bg-white px-6 py-8 lg:py-17 md:text-center lg:text-left">
          <div className="flex items-start md:items-center lg:items-start md:justify-center lg:justify-start gap-2 mb-5">
            <img src={trackingIcon} alt="delivery information" className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 mt-1 md:mt-0 lg:mt-1" />
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-[28px] font-bold text-gray-900 leading-snug">Delivery information</h3>
          </div>

          <ul className="space-y-4 md:flex md:flex-col md:items-center lg:items-stretch">
            {deliverySchedule.map((item) => (
              <li key={item.day} className="text-xs leading-relaxed text-gray-600 flex flex-wrap gap-1 md:justify-center lg:justify-start md:text-center lg:text-left">
                <span className="font-semibold text-gray-900">{item.day}:</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs leading-relaxed text-gray-600 mt-4 md:text-center lg:text-left">
            <span className="font-semibold text-gray-900">Estimated time until delivery:</span>{" "}
            30 min
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex-1 bg-white px-6 py-8 lg:py-17 md:text-center lg:text-left">
          <div className="flex items-start md:items-center lg:items-start md:justify-center lg:justify-start gap-2 mb-5">
            <img src={IDVerifiedIcon} alt="contact information" className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 mt-1 md:mt-0 lg:mt-1" />
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-[28px] font-bold text-gray-900 leading-snug">Contact information</h3>
          </div>

         <p className="text-xs text-gray-600 mb-4 leading-loose md:text-center lg:text-left md:max-w-xs md:mx-auto lg:max-w-none lg:mx-0">
  If you have allergies or other dietary restrictions, please contact the restaurant.
  The restaurant will provide food-specific information upon request.
</p>

          <div className="mb-3 md:text-center lg:text-left">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">Phone number</h4>
            <p className="text-xs leading-relaxed text-gray-600">+934443-43</p>
          </div>

          <div className="md:text-center lg:text-left">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">Website</h4>
            <p className="text-xs leading-relaxed text-gray-600">http://mcdonolds.uk/</p>
          </div>
        </div>

        {/* Operational Times */}
        <div className="flex-1 bg-[#03081F] text-white px-6 py-8 lg:py-17 md:text-center lg:text-left">
          <div className="flex items-start md:items-center lg:items-start md:justify-center lg:justify-start gap-2 mb-5">
            <img src={operationalTimesIcon} alt="operational times" className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 mt-1 md:mt-0 lg:mt-1" />
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-[28px] font-bold text-white leading-snug">Operational Times</h3>
          </div>

          <ul className="space-y-4 md:flex md:flex-col md:items-center lg:items-stretch">
            {operationalSchedule.map((item) => (
              <li key={item.day} className="text-xs leading-relaxed text-gray-300 flex flex-wrap gap-1 md:justify-center lg:justify-start md:text-center lg:text-left">
                <span className="font-semibold text-white">{item.day}:</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;