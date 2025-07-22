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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("symbol", symbol);
    formData.append("name", name);
    formData.append("min_price", minPrice);
    formData.append("max_price", maxPrice);
    formData.append("icon", icon);

    try {
      setLoading(true);
      await API.post("/crypto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Token added successfully");
      setSymbol("");
      setName("");
      setMinPrice("");
      setMaxPrice("");
      setIcon(null);
      setPreview(null);
      e.target.reset();
    } catch (error) {
      toast.error("Error adding token");
    } finally {
      setLoading(false);
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
    <div className="w-full flex justify-center items-start pt-4 sm:pt-8 bg-gray-50 overflow-hidden">
      <Toaster position="top-right" />
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Create Token
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* First Row - Symbol, Name, Icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                Token Symbol
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., BTC"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                Currency Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Bitcoin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                Upload Icon
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none w-full"
                  onChange={handleIconChange}
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover border border-gray-300"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Second Row - Min Price & Max Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                Min Price
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 20000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                Max Price
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base font-medium flex items-center gap-2 w-full sm:w-auto`}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
