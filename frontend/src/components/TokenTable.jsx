import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useRef } from "react";

export default function TokenTable({ tokens }) {
  const lastPricesRef = useRef({});

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Icon</th>
            <th className="p-3">Symbol</th>
            <th className="p-3">Name</th>
            <th className="p-3">Min Price</th>
            <th className="p-3">Max Price</th>
            <th className="p-3">Current Price</th>
            <th className="p-3">Change</th>
          </tr>
        </thead>
        <tbody>
          {tokens.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No tokens found
              </td>
            </tr>
          ) : (
            tokens.map((token) => {
              const lastPrice =
                lastPricesRef.current[token.symbol] || token.current_price;
              const priceChange =
                token.current_price > lastPrice
                  ? "up"
                  : token.current_price < lastPrice
                  ? "down"
                  : "same";
              lastPricesRef.current[token.symbol] = token.current_price;

              return (
                <tr key={token.symbol} className="border-t">
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000${token.icon}`}
                      alt={token.symbol}
                      className="w-6 h-6"
                    />
                  </td>
                  <td className="p-3">{token.symbol}</td>
                  <td className="p-3">{token.name}</td>
                  <td className="p-3">${token.min_price}</td>
                  <td className="p-3">${token.max_price}</td>
                  <td className="p-3">${token.current_price.toFixed(2)}</td>
                  <td className="p-3">
                    {priceChange === "up" ? (
                      <FaArrowUp className="text-green-500" />
                    ) : priceChange === "down" ? (
                      <FaArrowDown className="text-red-500" />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
