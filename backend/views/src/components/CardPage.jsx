import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CardPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbScroll, setThumbScroll] = useState(0);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const [carRes, imgRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/car/${id}`),
          axios.get(`http://localhost:5000/api/carimages/${id}`)
        ]);

        setCar(carRes.data);

        const imageList = Array.isArray(imgRes.data?.data)
          ? imgRes.data.data
          : [];

        const fullImageUrls = imageList.map((img) => `http://localhost:5000${img.imageUrl}`);
        setImages(fullImageUrls);
      } catch (err) {
        console.error("Error fetching car data", err);
        setImages([]);
      }
    };

    fetchCarData();
  }, [id]);

  const scrollLeft = () => setThumbScroll((prev) => Math.max(prev - 1, 0));
  const scrollRight = () => setThumbScroll((prev) => Math.min(prev + 1, images.length - 3));

  if (!car) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="flex flex-col lg:flex-row ml-25 mr-20 bg-[#2c2231]/70">
        {/* Left Panel */}
        <div className="lg:w-2/3">
        <h1 className="text-4xl font-bold ml-5 mt-4 whitespace-nowrap overflow-visible">
  {car.carName}
</h1>



          <div className="mt-4 ml-5">
            <nav className="flex space-x-4 border-b border-gray-700 pb-2">
              <a className="text-blue-400 border-b-2 border-blue-400 pb-1">Overview</a>
            </nav>
          </div>

          {/* Main Image */}
          <div className="mt-4 flex justify-center">
  <div className="w-full max-w-[800px] h-[450px]">
    <img
      alt={car.carName}
      className="rounded-lg w-full h-full object-cover"
      src={images[activeIndex] || "https://placehold.co/800x450?text=No+Image"}
    />
  </div>
</div>

          {/* Carousel Thumbnails */}
          {images.length > 0 && (
  <div className="flex justify-center mt-4">
    <div className="flex items-center space-x-2">
      <button
        className="bg-gray-800 p-2 rounded-full"
        onClick={scrollLeft}
        disabled={thumbScroll === 0}
      >
        <FaChevronLeft className="text-white" />
      </button>

      <div className="flex space-x-2 overflow-x-auto">
        {images.slice(thumbScroll, thumbScroll + 3).map((src, i) => {
          const realIndex = thumbScroll + i;
          return (
            <div
              key={realIndex}
              className={`w-[80px] h-[60px] rounded-lg overflow-hidden border-2 ${
                activeIndex === realIndex ? "border-blue-400" : "border-transparent"
              }`}
            >
              <img
                alt={`Thumbnail ${realIndex + 1}`}
                src={src}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setActiveIndex(realIndex)}
              />
            </div>
          );
        })}
      </div>

      <button
        className="bg-gray-800 p-2 rounded-full"
        onClick={scrollRight}
        disabled={thumbScroll + 3 >= images.length}
      >
        <FaChevronRight className="text-white" />
      </button>
    </div>
  </div>
)}


          {/* Car Stats with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
              <img
                alt="Speedometer"
                className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
                src="https://fusioncars.in/wp-content/uploads/2023/04/Speedometer.png"
              />
              <p className="text-gray-400">Kilometers Done</p>
              <p className="text-white font-bold text-base">{car.kmsDriven} km</p>
            </div>

            <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
              <img
                alt="Fuel"
                className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
                src="https://fusioncars.in/wp-content/uploads/2023/04/Petrol.png"
              />
              <p className="text-gray-400">Fuel</p>
              <p className="text-white font-bold text-base">{car.fuel}</p>
            </div>

            <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
              <img
                alt="Ownership"
                className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
                src="https://fusioncars.in/wp-content/uploads/2023/05/Ownership.png"
              />
              <p className="text-gray-400">Ownership Status</p>
              <p className="text-white font-bold text-base">{car.ownershipStatus}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 lg:pl-8 mt-31  ">
          <div className="sticky top-4">
            <div className="bg-[#212121] p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <img
                  alt="Car Brand Logo Placeholder"
                  className="mb-4"
                  src="https://placehold.co/200x100"
                />
              </div>

              <div className="text-gray-400 text-sm mb-2">Price</div>
              <div className="text-2xl text-white font-bold mb-4">
                ₹{car.price.toLocaleString("en-IN")}
              </div>

              <button className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4">
                Buy Now
              </button>
              <button className="bg-gray-700 text-white w-full py-2 rounded-lg mb-4">
                Add To Cart
              </button>

              <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
                <span>Manufacturing Year</span>
                <span>{car.manufacturingYear}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
                <span>Registered Year</span>
                <span>{car.registeredYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
