const stats = [
  { id: 1, value: "546+", label: "Registered Riders" },
  { id: 2, value: "789,900+", label: "Orders Delivered" },
  { id: 3, value: "690+", label: "Restaurants Partnered" },
  { id: 4, value: "17,457+", label: "Food Items" },
];

function StatsSection() {
  return (
<section className="max-w-7xl mx-auto mt-8 px-4">
  <div className="bg-[#FC8A06] rounded-[12px] overflow-hidden">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className="relative flex flex-col items-center justify-center text-center py-5 px-4"
        >
          {/* Number */}
          <h3
            className="
              text-white
              font-light
              text-5xl
              sm:text-4xl
              lg:text-4xl
              leading-none
              font-[Poppins]
            "
          >
            {stat.value}
          </h3>

          {/* Label */}
          <p
            className="
              mt-2
              text-white
              text-xs
              sm:text-sm
              font-normal
              text-center
            "
          >
            {stat.label}
          </p>

          {/* Divider */}
          {index !== stats.length - 1 && (
            <>
              {/* Mobile Divider */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-white/40 sm:hidden"></div>

              {/* Tablet + Desktop Divider */}
              <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-white/40"></div>
            </>
          )}
        </div>
      ))}

    </div>

  </div>
</section>
  );
}



export default StatsSection;