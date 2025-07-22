import { useEffect, useState } from "react";
import API from "../utils/api";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/baseUrl";

const socket = io(BASE_URL);

export default function AdminTokens() {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminTokens();

    socket.on("priceUpdate", (updates) => {
      if (!updates || updates.length === 0) return;
      setTokens((prevTokens) => mergePriceUpdates(prevTokens, updates));
      setFilteredTokens((prevFiltered) =>
        mergePriceUpdates(prevFiltered, updates)
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  const fetchAdminTokens = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/crypto");
      setTokens(data);
      setFilteredTokens(data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const mergePriceUpdates = (currentTokens, updates) => {
    return currentTokens.map((token) => {
      const updated = updates.find((u) => u.symbol === token.symbol);
      return updated ? { ...token, ...updated } : token;
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredTokens(
      tokens.filter((token) => token.symbol.toLowerCase().includes(value))
    );
  };

  const handleReset = () => {
    setSearch("");
    setFilteredTokens(tokens);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-gray-50 rounded-lg w-full overflow-hidden">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Token List
      </h2>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-6 w-full">
        <input
          type="text"
          placeholder="Search by Symbol"
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-4 py-3 font-medium">Symbol</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Min Price</th>
              <th className="px-4 py-3 font-medium">Max Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    {token.icon && (
                      <img
                        src={`${BASE_URL}${token.icon}`}
                        alt={token.symbol}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    {token.symbol}
                  </td>
                  <td className="px-4 py-3">{token.name}</td>
                  <td className="px-4 py-3">{token.min_price}</td>
                  <td className="px-4 py-3">{token.max_price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-400">
                  No tokens found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                {token.icon && (
                  <img
                    src={`${BASE_URL}${token.icon}`}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <h3 className="font-semibold text-gray-800">
                  {token.symbol} - {token.name}
                </h3>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  <strong>Min:</strong> {token.min_price}
                </span>
                <span>
                  <strong>Max:</strong> {token.max_price}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No tokens found.</p>
        )}
      </div>
    </div>
  );
}
