import React from "react";
import drink1 from "../../../assets/images/drink1.png";
import drink2 from "../../../assets/images/drink2.png";
import drink3 from "../../../assets/images/drink3.png";
import drink4 from "../../../assets/images/drink4.png";
import drink5 from "../../../assets/images/drink5.png";
import drink6 from "../../../assets/images/drink6.png";
import plusBgImg from "../../../assets/images/plusBgImg.png";
import plus from "../../../assets/images/plus.png";

function Drinks() {
  const DrinksCard = [
    {
      title: "Royal Cheese Burger with Extra Fries",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium",
      image: drink1,
      price: "23.10",
    },
    {
      title: "The classics for 3",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
      image: drink2,
      price: "23.10",
    },
    {
      title: "The classics for 3",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
      image: drink3,
      price: "23.10",
    },
    {
      title: "The classics for 3",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
      image: drink4,
      price: "23.10",
    },
    {
      title: "The classics for 3",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
      image: drink5,
      price: "23.10",
    },
    {
      title: "The classics for 3",
      desc: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
      image: drink6,
      price: "23.10",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[#FC8A06] mb-8">Cold Drinks</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {DrinksCard.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col lg:flex-row justify-between lg:items-center p-5 gap-4"
                >
                  {/* Left Side */}
      
                  <div className="lex flex-col justify-between w-full lg:w-[58%]">
                    <div>
                      <h2 className="text-md font-bold text-[#03081F] leading-6">
                        {card.title}
                      </h2>
      
                      <p className="text-gray-600 mt-2 text-sm leading-5">
                        {card.desc}
                      </p>
                    </div>
      
                    <h3 className="text-md font-bold mt-5">GBP {card.price}</h3>
                  </div>
      
                  {/* Right Side */}
      
                  <div className="relative w-full lg:w-[160px] h-[120px] sm:h-[140px] md:h-[150px] lg:h-[150px] flex justify-center lg:block flex-shrink-00">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-32 sm:w-36 md:w-40 lg:w-full h-full object-contain lg:object-fill mx-auto"
                    />
      
                    {/* Plus Button */}
      
                    <div className="absolute bottom-0 right-0">
                      <img src={plusBgImg} alt="" className="w-18" />
      
                      <img
                        src={plus}
                        alt=""
                        className="absolute top-1/2 left-1/2 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </section>
  );
}

export default Drinks;
