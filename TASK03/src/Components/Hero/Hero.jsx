// export default Hero;
// eslint-disable-next-line no-unused-vars
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SwiperList } from "./SwiperList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Hero() {
  const handleShopNowClick = () => {
    // Find the section to scroll to
    const section = document.getElementById("electronics");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Swiper
        spaceBetween={0}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {SwiperList.map((data, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full min-h-[90vh] md:h-[600px] flex items-center"
            //w-full h-[60vw] md:h-[600px] flex justify-end
          >
            {/* Background Image or Color */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${data.bgimage || ""})`,
                backgroundColor: data.bgcolor || "#f0f0f0",
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 min-h-screen py-12 md:py-0">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-white dark:text-gray-100 flex flex-col gap-5 items-center md:items-start text-center md:text-left">
                  <p className="text-base sm:text-lg font-medium">
                    {data.sale}
                  </p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                    {data.title}
                  </h1>
                  <button
                    onClick={handleShopNowClick}
                    className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 px-5 py-3 rounded-full shadow-lg transition text-sm sm:text-base w-max"
                  >
                    Shop Now
                    <ion-icon
                      name="arrow-forward-outline"
                      class="text-xl"
                    ></ion-icon>
                  </button>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <div className="w-[80%] sm:w-[70%] md:w-[90%] lg:w-[100%] max-w-[600px] aspect-square">
                    <img
                      src={data.image}
                      alt="hero product"
                      className="w-full h-full object-contain drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
