import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CompareCars = () => {
  const [carOptions, setCarOptions] = useState([]);
  const [selectedCars, setSelectedCars] = useState([null, null]);
  const [carDetails, setCarDetails] = useState([null, null]);
  const [searchParams] = useSearchParams();
  const [resetAnimKey, setResetAnimKey] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/car")
      .then(res => {
        const options = res.data.map(car => ({
          value: car.id,
          label: car.carName
        }));
        setCarOptions(options);

        const car1Id = searchParams.get("car1");
        const car2Id = searchParams.get("car2");

        const selected = [
          car1Id ? options.find(opt => opt.value === parseInt(car1Id)) : null,
          car2Id ? options.find(opt => opt.value === parseInt(car2Id)) : null
        ];
        setSelectedCars(selected);
      })
      .catch(err => console.error("Error fetching cars:", err));
  }, [searchParams]);

  useEffect(() => {
    selectedCars.forEach((car, idx) => {
      if (car) {
        axios.get(`http://localhost:5000/api/car/${car.value}`)
          .then(async carRes => {
            const carData = carRes.data;
            const brandRes = await axios.get(`http://localhost:5000/api/brand/${carData.brandId}`);
            const brandIcon = brandRes.data.iconUrl;

            axios.get(`http://localhost:5000/api/carinfo/${car.value}`)
              .then(infoRes => {
                setCarDetails(prev => {
                  const copy = [...prev];
                  copy[idx] = {
                    ...carData,
                    ...infoRes.data,
                    brandIcon,
                    image: carData.imageLink
                  };
                  return copy;
                });
              });
          })
          .catch(err => console.error("Fetch failed:", err));
      }
    });
  }, [selectedCars]);

  const specs = [
    { label: "Fuel Type", key: "fuel" },
    { label: "Price (₹)", key: "price", numeric: true, lowerIsBetter: true },
    { label: "Power (HP)", key: "power", numeric: true },
    { label: "Torque (Nm)", key: "torque", numeric: true },
    { label: "Top Speed (km/h)", key: "topSpeed", numeric: true },
    { label: "Ground Clearance (mm)", key: "groundClearance", numeric: true },
    { label: "Boot Space (L)", key: "bootSpace", numeric: true },
    { label: "Engine", key: "engine" },
    { label: "Ownership", key: "ownershipStatus" },
    { label: "Kms Driven", key: "kmsDriven", numeric: true, lowerIsBetter: true },
    { label: "Registered Year", key: "registeredYear", numeric: true },
    { label: "Manufacturing Year", key: "manufacturingYear", numeric: true },
  ];

  const parseValue = (val) => {
    if (!val) return 0;
    const num = parseInt(val.toString().replace(/[^\d]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const getHighlight = (key, val1, val2, lowerIsBetter = false) => {
    const num1 = parseValue(val1);
    const num2 = parseValue(val2);
    if (num1 === num2) return [false, false];
    if (lowerIsBetter) {
      return num1 < num2 ? [true, false] : [false, true];
    } else {
      return num1 > num2 ? [true, false] : [false, true];
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Compare Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {selectedCars.map((car, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Select
              options={carOptions}
              value={car}
              onChange={selected => {
                const updated = [...selectedCars];
                updated[idx] = selected;
                setSelectedCars(updated);

                const updatedDetails = [...carDetails];
                updatedDetails[idx] = null;
                setCarDetails(updatedDetails);
              }}
              placeholder={`Select Car ${idx + 1}`}
              isClearable
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#1f1f1f",
                  borderColor: state.isFocused ? "#4ade80" : "#555",
                  boxShadow: state.isFocused ? "0 0 0 1px #4ade80" : "none",
                  color: "white",
                  borderRadius: "8px",
                  padding: "2px 4px",
                }),
                singleValue: (base) => ({ ...base, color: "white", fontWeight: "600" }),
                placeholder: (base) => ({ ...base, color: "#999" }),
                menu: (base) => ({ ...base, backgroundColor: "#1f1f1f", borderRadius: "8px" }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#333" : "#1f1f1f",
                  color: state.isFocused ? "#4ade80" : "white",
                  fontWeight: state.isFocused ? "600" : "normal",
                }),
              }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {carDetails[0] && carDetails[1] && (
          <motion.div
            key={resetAnimKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-gradient-to-br from-[#1e1e1e] to-[#121212]">
              <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="p-4 text-sm text-green-300 uppercase bg-[#121212]">Spec</th>
                    {carDetails.map((car, idx) => (
                      <th key={idx} className="p-4 text-center bg-[#121212]">
                        {car.brandIcon && (
                          <img src={car.brandIcon} alt="Brand" className="h-10 mx-auto mb-2" />
                        )}
                        {car.image && (
                          <img src={car.image} alt={car.carName} className="h-20 w-auto mx-auto rounded mb-1 object-contain" />
                        )}
                        <div className="font-semibold">{car.carName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map(({ label, key, numeric, lowerIsBetter }) => {
                    const val1 = carDetails[0]?.[key] || "—";
                    const val2 = carDetails[1]?.[key] || "—";

                    let highlight = [false, false];
                    if (numeric) {
                      highlight = getHighlight(key, val1, val2, lowerIsBetter);
                    }

                    const getCell = (val, isBest, rowKey) => (
                      <motion.td
                        key={rowKey + val}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded ${isBest ? "text-green-400 font-bold bg-[#1e2b1e]" : "bg-[#1a1a1a]"}`}
                      >
                        {val} {isBest ? "✅" : ""}
                      </motion.td>
                    );

                    return (
                      <motion.tr
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-[#2a2a2a] transition-colors"
                      >
                        <td className="p-4 text-gray-400">{label}</td>
                        {getCell(val1, highlight[0], key + "-1")}
                        {getCell(val2, highlight[1], key + "-2")}
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  setSelectedCars([null, null]);
                  setCarDetails([null, null]);
                  setResetAnimKey(prev => prev + 1);
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
              >
                🔁 Compare Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompareCars;
