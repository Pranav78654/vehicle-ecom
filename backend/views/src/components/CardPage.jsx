import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddToCartButton from '../components/AddToCartButton';
import { useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [brandIconUrl, setBrandIconUrl] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbScroll, setThumbScroll] = useState(0);
  const [brandname , setBrandName] = useState("");
  const [cartype , setCarType] = useState("");
  const [carInfo, setCarInfo] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const [carRes, imgRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/car/${id}`),
          axios.get(`http://localhost:5000/api/carimages/${id}`)
        ]);

        const carData = carRes.data;
        setCar(carData);

        const brandRes = await axios.get(`http://localhost:5000/api/brand/${carData.brandId}`);
        setBrandIconUrl(brandRes.data.iconUrl);
        setBrandName(brandRes.data.brandName);

        const cartyperes = await axios.get(`http://localhost:5000/api/type/${carData.carTypeId}`);
        setCarType(cartyperes.data.typeName);

        const carInfoRes = await axios.get(`http://localhost:5000/api/carinfo/${carData.id}`);
        setCarInfo(carInfoRes.data);

        const imageList = Array.isArray(imgRes.data?.data) ? imgRes.data.data : [];
        const fullImageUrls = imageList.map((img) => `http://localhost:5000${img.imageUrl}`);
        setImages(fullImageUrls);
      } catch (err) {
        console.error("Error fetching car or brand data:", err);
        setImages([]);
        setBrandIconUrl("");
      }
    };

    fetchCarData();
  }, [id]);

  const scrollLeft = () => setThumbScroll((prev) => Math.max(prev - 1, 0));
  const scrollRight = () => setThumbScroll((prev) => Math.min(prev + 1, images.length - 3));

  if (!car) return <div className="text-white p-4">Loading...</div>;

  return (
    <motion.div
      className="container mx-auto p-4 mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row ml-25 mr-20 bg-[#2c2231]/70">
        {/* Left Panel */}
        <motion.div
          className="lg:w-2/3"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold ml-5 mt-4 whitespace-nowrap overflow-visible">
            {car.carName}
          </h1>

          <div className="mt-4 ml-5">
            <nav className="flex space-x-4 border-b border-gray-700 pb-2">
              <a className="text-blue-400 border-b-2 border-blue-400 pb-1">Overview</a>
            </nav>
          </div>

          <div className="mt-4 flex justify-center">
            <motion.div className="w-full max-w-[800px] h-[450px]" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <img
                alt={car.carName}
                className="rounded-lg w-full h-full object-cover"
                src={images[activeIndex] || "https://placehold.co/800x450?text=No+Image"}
              />
            </motion.div>
          </div>

          {images.length > 0 && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <button className="bg-gray-800 p-2 rounded-full" onClick={scrollLeft} disabled={thumbScroll === 0}>
                  <FaChevronLeft className="text-white" />
                </button>

                <div className="flex space-x-2 overflow-x-auto">
                  {images.slice(thumbScroll, thumbScroll + 3).map((src, i) => {
                    const realIndex = thumbScroll + i;
                    return (
                      <motion.div
                        key={realIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-[80px] h-[60px] rounded-lg overflow-hidden border-2 ${activeIndex === realIndex ? "border-blue-400" : "border-transparent"}`}
                      >
                        <img
                          alt={`Thumbnail ${realIndex + 1}`}
                          src={src}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setActiveIndex(realIndex)}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <button className="bg-gray-800 p-2 rounded-full" onClick={scrollRight} disabled={thumbScroll + 3 >= images.length}>
                  <FaChevronRight className="text-white" />
                </button>
              </div>
            </motion.div>
          )}

          <motion.div className="ml-5 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex space-x-2">
              <button className="bg-[#212121] text-white py-1 px-3 rounded">{brandname}</button>
              <button className="bg-[#212121] text-white py-1 px-3 rounded">{cartype}</button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Kilometers Done */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Speedometer"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Speedometer.png"
    />
    <p className="text-gray-400">Kilometers Done</p>
    <p className="text-white font-bold text-base">{car.kmsDriven} km</p>
  </div>

  {/* Fuel */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Fuel"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Petrol.png"
    />
    <p className="text-gray-400">Fuel</p>
    <p className="text-white font-bold text-base">{car.fuel}</p>
  </div>

  {/* Ownership */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Ownership"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/05/Ownership.png"
    />
    <p className="text-gray-400">Ownership Status</p>
    <p className="text-white font-bold text-base">{car.ownershipStatus}</p>
  </div>

  {/* Exterior Color */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Exterior Color"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Vector-4.png"
    />
    <p className="text-gray-400">Exterior Color</p>
    <p className="text-white font-bold text-base">{carInfo?.exteriorColor || "N/A"}</p>
  </div>

  {/* Top Speed */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Top Speed"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Car-speed-test.png"
    />
    <p className="text-gray-400">Top Speed</p>
    <p className="text-white font-bold text-base">{carInfo?.topSpeed || "N/A"}</p>
  </div>

  {/* Ground Clearance */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Ground Clearance"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Car-speed-test.png"
    />
    <p className="text-gray-400">Ground Clearance</p>
    <p className="text-white font-bold text-base">{carInfo?.groundClearance || "N/A"}</p>
  </div>

  {/* Boot Space */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Boot Space"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/car.png"
    />
    <p className="text-gray-400">Boot Space</p>
    <p className="text-white font-bold text-base">{carInfo?.bootSpace || "N/A"}</p>
  </div>

  {/* Torque */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Torque"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/04/Car-Power-Charger.png"
    />
    <p className="text-gray-400">Torque</p>
    <p className="text-white font-bold text-base">{carInfo?.torque || "N/A"}</p>
  </div>

  {/* Power */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Power"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/05/power.png"
    />
    <p className="text-gray-400">Power</p>
    <p className="text-white font-bold text-base">{carInfo?.power || "N/A"}</p>
  </div>

  {/* Engine */}
  <div className="bg-[#212121] text-center p-4 rounded-lg text-sm">
    <img
      alt="Engine"
      className="mx-auto mb-2 w-16 h-16 filter invert brightness-200"
      src="https://fusioncars.in/wp-content/uploads/2023/05/Car-Engine.png"
    />
    <p className="text-gray-400">Engine</p>
    <p className="text-white font-bold text-base">{carInfo?.engine || "N/A"}</p>
  </div>

          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="lg:w-1/4 lg:pl-8 mt-31"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sticky top-4">
            <div className="bg-[#212121] p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <img
                  alt="Brand Logo"
                  className="mb-4 w-[200px] h-[100px] object-contain"
                  src={brandIconUrl || "https://placehold.co/200x100?text=No+Logo"}
                />
              </div>

              <div className="text-gray-400 text-sm mb-2">Price</div>
              <div className="text-2xl text-white font-bold mb-4">
                ₹{car.price.toLocaleString("en-IN")}
              </div>

              <motion.button whileTap={{ scale: 0.95 }} className="bg-blue-500 text-white w-full py-2 rounded-lg mb-4">
                Buy Now
              </motion.button>

              {car && <AddToCartButton carId={car.id} />}

              <motion.button
                onClick={() => navigate(`/compare?car1=${id}`)}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#4b5563] hover:bg-[#374151] text-white font-bold py-2 rounded-lg mt-2 transition"
              >
                Compare with another car
              </motion.button>

              <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
                <span>Manufacturing Year</span>
                <span>{car.manufacturingYear}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
                <span>Registration Year</span>
                <span>{car.registeredYear}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardPage;
