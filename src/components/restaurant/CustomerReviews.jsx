import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import Star from "../../assets/images/Star.png";
import BackArrow from "../../assets/images/BackArrow.png";
import ForwardArrow from "../../assets/images/ForwardArrow.png";

const reviews = [
  {
    id: 1,
    name: "St Glx",
    city: "South London",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying.",
    date: "24th September, 2023",
  },
  {
    id: 2,
    name: "Sarah Khan",
    city: "Manchester",
    review:
      "Very fast delivery and amazing taste. I will definitely order again from this restaurant.",
    date: "20th September, 2023",
  },
  {
    id: 3,
    name: "Ali Ahmed",
    city: "Birmingham",
    review:
      "Excellent customer service and the packaging was perfect. Highly recommended.",
    date: "18th September, 2023",
  },
  {
    id: 4,
    name: "John Smith",
    city: "Liverpool",
    review:
      "Food quality was amazing and delivery was right on time. Really enjoyed everything.",
    date: "15th September, 2023",
  },
  {
    id: 5,
    name: "Emma Watson",
    city: "London",
    review:
      "Packaging was neat and the food arrived warm. Overall a great experience.",
    date: "12th September, 2023",
  },
];

function CustomerReviews() {
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (startIndex > reviews.length - cardsPerView) {
      setStartIndex(Math.max(0, reviews.length - cardsPerView));
    }
  }, [cardsPerView]);
  const [startIndex, setStartIndex] = useState(0);

  const visibleReviews = reviews.slice(startIndex, startIndex + cardsPerView);

  const nextSlide = () => {
    if (startIndex < reviews.length - cardsPerView) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {" "}
      <div className="relative w-full max-w-7xl mx-auto bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-5 pb-24">
        {" "}
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold">
            Customer Reviews
          </h2>

          {/* Desktop Arrows */}
          <div className="hidden sm:flex gap-3">
            <button onClick={prevSlide} disabled={startIndex === 0}>
              <img
                src={BackArrow}
                alt="Previous"
                className={`w-14 lg:w-[75px] ${
                  startIndex === 0 ? "opacity-40" : ""
                }`}
              />
            </button>

            <button
              onClick={nextSlide}
              disabled={startIndex >= reviews.length - cardsPerView}
            >
              <img
                src={ForwardArrow}
                alt="Next"
                className={`w-14 lg:w-[75px] ${
                  startIndex >= reviews.length - cardsPerView
                    ? "opacity-40"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
        {/* Mobile Rating Card */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="w-[120px] h-[140px] bg-white rounded-xl shadow flex flex-col items-center justify-center">
            <h2 className="text-5xl font-bold">3.4</h2>

            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={Star} alt="" className="w-4 h-4" />
              ))}

              <img src={Star} alt="" className="w-4 h-4 opacity-30" />
            </div>

            <p className="text-sm text-gray-500 mt-2">1,360 reviews</p>
          </div>
        </div>
        {/* Cards */}
        <div className="w-full overflow-hidden">
          <div
            className={`flex gap-4 lg:gap-6 ${
              cardsPerView === 1 ? "justify-center" : ""
            }`}
          >
            {visibleReviews.map((item) => (
              <div key={item.id} className="flex-1 min-w-0">
                <ReviewCard
                  name={item.name}
                  city={item.city}
                  review={item.review}
                  date={item.date}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Arrows */}
        <div className="flex justify-center gap-6 mt-8 sm:hidden">
          <button onClick={prevSlide} disabled={startIndex === 0}>
            <img
              src={BackArrow}
              alt="Previous"
              className={`w-[54px] ${startIndex === 0 ? "opacity-40" : ""}`}
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={startIndex >= reviews.length - cardsPerView}
          >
            <img
              src={ForwardArrow}
              alt="Next"
              className={`w-[54px] ${
                startIndex >= reviews.length - cardsPerView ? "opacity-40" : ""
              }`}
            />
          </button>
        </div>
        {/* Desktop Rating Card */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-15 z-20">
          <div className="relative z-20 w-[140px] h-[128px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-[48px] font-bold leading-none">3.4</h2>

            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={Star} alt="star" className="w-5 h-5" />
              ))}

              <img src={Star} alt="star" className="w-5 h-5 opacity-30" />
            </div>

            <p className="mt-3 text-[15px] text-gray-500">1,360 reviews</p>
          </div>
        </div>
      </div>
      {/* Space below rating card */}
      <div className="h-[180px] lg:h-[40px]"></div>
    </section>
  );
}

export default CustomerReviews;
