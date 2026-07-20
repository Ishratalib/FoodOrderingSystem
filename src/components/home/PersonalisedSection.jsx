import Logo from "../../assets/logos/Logo.png";
import AppStore from "../../assets/images/AppStore.png";
import PlayStore from "../../assets/images/PlayStore.png";
import Friends from "../../assets/images/Friends.png";

function PersonalisedSection() {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div
        className="
          w-full
          xl:max-h-[500px]
          mx-auto
          overflow-visible
          px-4 sm:px-6 lg:px-8 
        "
        style={{
          background: "linear-gradient(180deg, #EEEEEE 0%, #E0E1DC 100%)",
        }}
      >
        {/* MOBILE + TABLET */}
        <div className="flex flex-col lg:hidden pt-6 sm:pt-8 pb-0 px-3 sm:px-4">
          {/* Heading */}
          <div className="flex items-end justify-center mb-3 flex-wrap sm:flex-nowrap gap-x-1">
            <img
              src={Logo}
              alt="Order UK"
              className="h-[20px] xs:h-[22px] sm:h-[30px] md:h-[36px] flex-shrink-0"
            />

            <span className="ml-0 translate-y-1 whitespace-nowrap text-[#03081F] font-bold leading-none text-[16px] xs:text-[18px] sm:text-[26px] md:text-[32px]">
              ing is more
            </span>
          </div>

          {/* Badge */}
          <div className="w-full max-w-[500px] mx-auto h-[42px] xs:h-[46px] sm:h-[56px] md:h-[62px] bg-[#03081F] rounded-[120px] flex items-center justify-center px-3 sm:px-6 mb-5">
            <p className="whitespace-nowrap font-medium text-[12px] xs:text-[13px] sm:text-[18px] md:text-[22px]">
              <span className="text-[#FC8A06] underline underline-offset-4">
                Personalised
              </span>

              <span className="text-white"> &amp; Instant</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-[13px] md:text-[14px] text-[#03081F] mb-4 text-center px-2">
            Download the Order.uk app for faster ordering
          </p>

          {/* Store Buttons */}
          <div className="flex gap-3 justify-center mb-6 flex-wrap">
            <img
              src={AppStore}
              alt="App Store"
              className="h-[28px] xs:h-[32px] sm:h-[38px] md:h-[42px] cursor-pointer hover:scale-105 duration-200"
            />

            <img
              src={PlayStore}
              alt="Play Store"
              className="h-[28px] xs:h-[32px] sm:h-[38px] md:h-[42px] cursor-pointer hover:scale-105 duration-200"
            />
          </div>

          {/* Friends Image */}
          <div className="w-full flex justify-center">
            <img
              src={Friends}
              alt="Friends ordering food"
              className="
                w-[95%]
                sm:w-[80%]
                md:w-[70%]
                h-auto
                object-contain
                block
                drop-shadow-[0_12px_25px_rgba(0,0,0,0.22)]
              "
            />
          </div>
        </div>

        {/* ========================= */}
        {/* DESKTOP (lg and above) */}
        {/* ========================= */}

        <div
          className="hidden lg:flex flex-row items-center relative pt-8 bor pb-0 xl:py-0 xl:min-h-[600px]"
          style={{ overflow: "visible" }}
        >
          {/* LEFT IMAGE */}
          <div
            className="w-[50%] xl:w-[55%] flex justify-center relative z-30"
            style={{ overflow: "visible" }}
          >
            <img
              src={Friends}
              alt="Friends ordering food"
              className="
    w-full
    max-w-[420px]
    xl:max-w-[590px]
    2xl:max-w-[600px]
    h-auto
    object-contain
    block
    drop-shadow-[0_12px_25px_rgba(0,0,0,0.22)]
    -mt-4 xl:-mt-16
"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-[50%] xl:w-[45%] flex flex-col justify-center relative z-10">
            {/* Heading */}
            <div className="flex items-end flex-nowrap -ml-2 lg:-ml-6 xl:-ml-16 relative lg:-top-4 xl:-top-4">
              <img
                src={Logo}
                alt="Order UK"
                className="h-[32px] lg:h-[50px] xl:h-[66px] 2xl:h-[52px] flex-shrink-0"
              />

              <span className="ml-0 translate-y-1.5 whitespace-nowrap text-[#03081F] font-bold leading-none text-[26px] lg:text-[42px] xl:text-[58px] 2xl:text-[52px]">
                ing is more
              </span>
            </div>
            {/* PERSONALISED BADGE */}
            <div
              className="
                mt-2
                lg:mt-2
                w-[300px]
                lg:w-[560px]
                xl:w-[700px]
                2xl:w-[660px]
                h-[52px]
                lg:h-[75px]
                xl:h-[90px]
                bg-[#03081F]
                rounded-[120px]
                flex
                items-center
                justify-center
                px-6
                lg:px-10
                -ml-4
                lg:-ml-30
                xl:-ml-46
                relative
                z-0
              "
            >
              <p className="whitespace-nowrap font-medium text-[15px] lg:text-[26px] xl:text-[34px] 2xl:text-[30px] ml-8 lg:ml-20 xl:ml-32">
                <span className="text-[#FC8A06] underline underline-offset-4">
                  Personalised
                </span>

                <span className="text-white"> &amp; Instant</span>
              </p>
            </div>

            {/* DESCRIPTION + BUTTONS */}
            <div className="mt-6 lg:mt-8 ml-2 lg:ml-6 xl:ml-6 flex flex-col items-start">
              <p className="text-[11px] lg:text-[13px] xl:text-[15px] text-[#03081F] mb-4 lg:mb-6">
                Download the Order.uk app for faster ordering
              </p>

              <div className="flex gap-3 lg:gap-4">
                <img
                  src={AppStore}
                  alt="App Store"
                  className="h-[32px] lg:h-[42px] xl:h-[50px] cursor-pointer hover:scale-105 duration-200"
                />

                <img
                  src={PlayStore}
                  alt="Play Store"
                  className="h-[32px] lg:h-[42px] xl:h-[50px] cursor-pointer hover:scale-105 duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalisedSection;