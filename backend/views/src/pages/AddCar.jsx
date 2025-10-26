import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarImageUploader from "../components/CarImageUploader";
import api from '../api/axios'
const AddCar = () => {
  const [formData, setFormData] = useState({
    carName: '',
    registeredYear: '',
    manufacturingYear: '',
    fuel: '',
    kmsDriven: '',
    price: '',
    ownershipStatus: '',
    brandId: '',
    carTypeId: '',
  });

  const [carInfo, setCarInfo] = useState({
    exteriorColor: '',
    topSpeed: '',
    groundClearance: '',
    bootSpace: '',
    torque: '',
    power: '',
    engine: ''
  });

  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1990; i--) {
      years.push(i);
    }
    return years;
  };

  useEffect(() => {
    api.get('/api/brand')
      .then(res => setBrands(res.data))
      .catch(err => console.error('Brand fetch error:', err));

    api.get('/api/type')
      .then(res => setTypes(res.data))
      .catch(err => console.error('Type fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarInfoChange = (e) => {
    setCarInfo({ ...carInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = new FormData();
    for (const key in formData) {
      carData.append(key, formData[key]);
    }
    if (image) carData.append('image', image);

    try {
      const carRes = await api.post('/api/car', carData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newCarId = carRes.data.id;

      await api.post('/api/carinfo', {
        carId: newCarId,
        ...carInfo
      });

      alert('Car and car info added successfully ✅');
    } catch (err) {
      console.error('Error creating car or car info:', err);
      alert('Failed to add car ❌');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="carName" placeholder="Car Name" onChange={handleChange} required className="w-full p-2 mb-3 rounded" />
        
        <select name="registeredYear" onChange={handleChange} required className="w-full p-2 mb-3 rounded text-black">
          <option value="">Select Registered Year</option>
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select name="manufacturingYear" onChange={handleChange} required className="w-full p-2 mb-3 rounded text-black">
          <option value="">Select Manufacturing Year</option>
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input name="fuel" placeholder="Fuel Type" onChange={handleChange} required className="w-full p-2 mb-3 rounded" />
        <input name="kmsDriven" type="number" placeholder="Kms Driven" onChange={handleChange} required className="w-full p-2 mb-3 rounded" />
        <input name="price" type="number" placeholder="Price (INR)" onChange={handleChange} required className="w-full p-2 mb-3 rounded" />
        <input name="ownershipStatus" placeholder="Ownership Status" onChange={handleChange} required className="w-full p-2 mb-3 rounded" />

        <select name="brandId" onChange={handleChange} required className="w-full p-2 mb-3 rounded text-black">
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
          ))}
        </select>

        <select name="carTypeId" onChange={handleChange} required className="w-full p-2 mb-3 rounded text-black">
          <option value="">Select Car Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.typeName}</option>
          ))}
        </select>

        {/* New Car Info Fields */}
        <input name="exteriorColor" placeholder="Exterior Color" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="topSpeed" placeholder="Top Speed" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="groundClearance" placeholder="Ground Clearance" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="bootSpace" placeholder="Boot Space" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="torque" placeholder="Torque" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="power" placeholder="Power" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />
        <input name="engine" placeholder="Engine" onChange={handleCarInfoChange} required className="w-full p-2 mb-3 rounded" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 mb-4 rounded bg-white text-black" />

        <button type="submit" className="bg-teal-600 px-6 py-2 rounded hover:bg-teal-700 transition">Add Car</button>
      </form>
      <CarImageUploader />
    </div>
  );
};

export default AddCar;
