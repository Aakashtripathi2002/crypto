import { useState } from "react";
import API from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

export default function AddToken() {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("symbol", symbol);
    formData.append("name", name);
    formData.append("min_price", minPrice);
    formData.append("max_price", maxPrice);
    formData.append("icon", icon);

    try {
      await API.post("/crypto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Token added successfully");

      // Clear all fields
      setSymbol("");
      setName("");
      setMinPrice("");
      setMaxPrice("");
      setIcon(null);
      setPreview(null);
      e.target.reset(); // Reset file input
    } catch (error) {
      toast.error("Error adding token");
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setIcon(null);
      setPreview(null);
    }
  };

  return (
    <div className="w-full flex justify-center items-start pt-6 sm:pt-10 bg-gray-50">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          Create Token
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* First Row - Symbol, Name, Icon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-base sm:text-lg">
                Token Symbol
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., BTC"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-base sm:text-lg">
                Currency Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Bitcoin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-base sm:text-lg">
                Upload Icon
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-300 rounded-lg p-2 sm:p-3 text-base sm:text-lg focus:outline-none w-full"
                  onChange={handleIconChange}
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Second Row - Min Price & Max Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-base sm:text-lg">
                Min Price
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 20000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-base sm:text-lg">
                Max Price
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition text-base sm:text-lg font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
