import React, { useState, useEffect } from "react";

const CarImageUploader = () => {
  const [carId, setCarId] = useState("");
  const [cars, setCars] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/car")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!carId || selectedFiles.length === 0) {
      setMessage("Select a car and at least one image.");
      return;
    }

    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("images", file);
    }

    setUploading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/carimages/upload/${carId}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Images uploaded successfully ✅");
        setSelectedFiles([]);
      } else {
        setMessage(result.error || "Upload failed ❌");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Upload Car Images</h2>

      <select value={carId} onChange={(e) => setCarId(e.target.value)} className="mb-2 w-full p-2 rounded text-black">
        <option value="">Select a car</option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.brand} {car.carName}
          </option>
        ))}
      </select>

      <input
        type="file"
         name="images"
        multiple
        onChange={handleFileChange}
        className="mb-2 block w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CarImageUploader;
