import React from "react";
import placeOrder from "../../assets/images/placeOrder.png";
import trackOrder from "../../assets/images/trackOrder.png";
import getOrder from "../../assets/images/getOrder.png";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
export default function AboutUs() {
  const { theme } = useTheme();

  const cards = [
    {
      title: "Place an Order!",
      image: placeOrder,
      desc: "Place order through our website or Mobile app",
    },
    {
      title: "Track Progress",
      image: trackOrder,
      desc: "You can track your order status with delivery time",
    },
    {
      title: "Get your Order!",
      image: getOrder,
      desc: "Receive your order at lightning fast speed!",
    },
  ];

  const tabs = [
    "Frequent Questions",
    "Who we are?",
    "Partner Program",
    "Help & Support",
  ];

  const questions = [
    "How does Order.UK work?",
    "What payment methods are accepted?",
    "Can I track my order in real-time?",
    "Are there any special discounts or promotions available?",
    "Is Order.UK available in my area?",
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="lg:bg-[#F3F3F3] rounded-3xl md:p-6 lg:p-20 lg:pt-25">
        {/* Heading + Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:mb-20">
          <h2 className="text-[23px] md:text-4xl font-bold text-center lg:text-left lg:text-3xl">
            Know more about us!
          </h2>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-1 xl:gap-3 md:text-base md:mt-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base lg:px-1 xl:px-3 rounded-full transition-all duration-300
        ${
          activeTab === index
            ? "border border-orange-500"
            : "border border-transparent hover:border-orange-300"
        }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* White Container */}
        <div className={`rounded-3xl mt-10 p-10 md:p-6 md:p-8 lg:p-10 ${
          theme === "dark" ? "bg-[#03081F]" : "bg-white"
        }`}>
          <div className="grid lg:grid-cols-12 gap-4">
            {/* Left Side */}
            <div className="lg:col-span-4 flex flex-col items-center gap-4 lg:gap-0 xl:gap-4">
              {questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setActiveQuestion(index)}
                  className={`w-full max-w-sm rounded-full text-sm sm: p-2 md:text-base md:px-2 md:py-4 font-semibold transition-all duration-300
        ${
          activeQuestion === index
            ? "bg-[#FC8A06] text-white"
            : "bg-transparent text-black hover:bg-orange-100"
        }
        ${
          theme === "dark" ? "text-white hover:text-black" : "text-base"
        }`}
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="lg:col-span-8 sm:p-2 align-center lg:my-auto ">
              {/* Cards */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-1 xl:gap-5">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-2xl p-5 lg:p-2 xl:p-5 text-center flex flex-col items-center"
                  >
                    <h3 className="font-bold text-lg lg:text-sm xl:text-lg mb-5">
                      {card.title}
                    </h3>

                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-20 lg:h-15 xl:h-20 object-contain mb-5"
                    />

                    <p className="text-gray-700 leading-6 lg:text-[15px] xl:text-[20px]">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Text */}
              <p className={`text-center mt-8 text-gray-500 max-w-3xl mx-auto leading-6 text-sm md:text-base ${
                theme === "dark" ? "text-white" :"text-base"
              }`}>
                Order.UK simplifies the food ordering process. Browse through
                our diverse menu, select your favorite dishes, and proceed to
                checkout. Your delicious meal will be on its way to your
                doorstep in no time!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
