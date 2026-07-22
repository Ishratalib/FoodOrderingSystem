import Star from "../../assets/images/Star.png";
import Clock from "../../assets/images/clock.png";

function ReviewCard({ name, city, review, date }) {
  return (
    <div className="w-full h-full lg:h-[200px] bg-white rounded-[4px] px-4 sm:px-5 lg:px-5 py-3 sm:py-4 lg:py-6 flex flex-col overflow-hidden">
      {" "}
      <div className="flex justify-between items-start gap-2 min-w-0">
        {/* Left */}
        <div className="flex items-start flex-1 min-w-0 gap-2 overflow-hidden">
          {/* Avatar */}
          <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] lg:w-[54px] lg:h-[54px] rounded-full bg-[#FC8A06] flex items-center justify-center text-white text-[16px] sm:text-[19px] lg:text-[22px] font-semibold shrink-0">
            {name.charAt(0)}
          </div>

          {/* Divider */}
          <div className="w-[2px] h-[36px] sm:h-[44px] lg:h-[50px] bg-[#FC8A06] mx-2 shrink-0"></div>

          {/* Name & City */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#03081F] truncate max-w-full">
              {" "}
              {name}
            </h3>
            <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-[#FC8A06] truncate max-w-full">
              {city}
            </p>{" "}
            {/* Mobile Stars & Date */}
            <div className="flex flex-col gap-2 mt-2 lg:hidden">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <img
                    key={star}
                    src={Star}
                    alt="star"
                    className="w-3 h-3 object-contain"
                  />
                ))}

                <img
                  src={Star}
                  alt="star"
                  className="w-3 h-3 object-contain opacity-30"
                />
              </div>

              <div className="flex items-center gap-1">
                <img src={Clock} alt="clock" className="w-4 h-4 shrink-0" />

                <span className="text-[10px] text-[#9E9E9E]">{date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Stars & Date */}
        <div className="hidden lg:flex flex-col items-end flex-shrink-0 ml-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((star) => (
              <img
                key={star}
                src={Star}
                alt="star"
                className="w-4 h-4 object-contain"
              />
            ))}

            <img
              src={Star}
              alt="star"
              className="w-4 h-4 object-contain opacity-30"
            />
          </div>

          <div className="flex items-center gap-1 mt-2">
            <img src={Clock} alt="clock" className="w-5 h-5 shrink-0" />

            <span className="text-[12px] xl:text-[13px] text-[#9E9E9E] whitespace-nowrap">
              {date}
            </span>
          </div>
        </div>
      </div>
      {/* Review */}
      <p className="mt-3 sm:mt-4 lg:mt-5 text-[13px] sm:text-[14px] lg:text-[16px] leading-6 text-[#03081F] break-words">
        {review}
      </p>
    </div>
  );
}

export default ReviewCard;