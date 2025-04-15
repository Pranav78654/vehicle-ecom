import React, { useState } from 'react';
import axios from 'axios';

function AddBrandAndType() {
  const [brandName, setBrandName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [typeName, setTypeName] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBrand = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/brand', {
        brandName,
        iconUrl
      });
      setMessage(`✅ Brand added: ${res.data.brandName || brandName}`);
      setBrandName('');
      setIconUrl('');
    } catch (err) {
      setMessage('❌ Failed to add brand');
      console.error(err);
    }
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/type', {
        typeName
      });
      setMessage(`✅ Car type added: ${res.data.typeName || typeName}`);
      setTypeName('');
    } catch (err) {
      setMessage('❌ Failed to add car type');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center">Add Brand and Car Type</h1>

      {message && <div className="text-center text-sm font-medium text-blue-600">{message}</div>}

      {/* Add Brand Form */}
      <form onSubmit={handleAddBrand} className="space-y-4">
        <h2 className="text-xl font-semibold">Add Brand</h2>
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Icon URL (optional)"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Add Brand
        </button>
      </form>

      {/* Add Car Type Form */}
      <form onSubmit={handleAddType} className="space-y-4">
        <h2 className="text-xl font-semibold">Add Car Type</h2>
        <input
          type="text"
          placeholder="Car Type Name (e.g., SUV, Sedan)"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          Add Car Type
        </button>
      </form>
    </div>
  );
}

export default AddBrandAndType;
