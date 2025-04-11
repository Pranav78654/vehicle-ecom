import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Import images from src/assets
import bgImage from "../assets/bgimage.jpg";
import carimage from "../assets/carimage.jpg";
import bmw from "../assets/bmw.jpg"
const CarCarousel = () => {
  const [images, setImages] = useState([
    bgImage,
    carimage,
    bmw
  ]);

  return (
    <div className="w-[90%] max-w-[1200px] h-[400px] mx-auto mt-10 rounded-xl overflow-hidden shadow-xl bg-transparent">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full h-full rounded-xl"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Car ${index + 1}`}
              className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:scale-105"
              onError={(e) => {
                console.error(`❌ Error loading image: ${src}`);
                e.target.style.display = "none";
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarCarousel;
