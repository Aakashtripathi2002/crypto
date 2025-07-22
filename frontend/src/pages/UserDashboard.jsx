import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import API from "../utils/api";
import { FaArrowUp, FaArrowDown, FaSearch,FaBitcoin ,FaEthereum} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { FaDollarSign, FaCircle, FaChartLine } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaRedditAlien,
  FaDiscord,
} from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import { BASE_URL } from "../utils/baseUrl";
const socket = io(BASE_URL);

export default function UserDashboard() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const lastPricesRef = useRef({});

  useEffect(() => {
    fetchAssets();
    socket.on("priceUpdate", (data) => {
      setAssets(data);
    });
    return () => socket.off("priceUpdate");
  }, []);

  const fetchAssets = async () => {
    const { data } = await API.get("/crypto");
    setAssets(data);
  };

const coins = [
  {
    icon: <FaBitcoin className="text-orange-400 w-6 h-6" />,
    name: "BTC",
    fullName: "BITCOIN",
    price: "₹56,623.54",
    change: "1.41%",
    positive: true,
  },
  {
    icon: <FaEthereum className="text-blue-500 w-6 h-6" />,
    name: "ETH",
    fullName: "ETHEREUM",
    price: "₹56,623.54",
    change: "1.41%",
    positive: false,
  },
  {
    icon: <FaDollarSign className="text-yellow-500 w-6 h-6" />,
    name: "BNB",
    fullName: "BINANCE",
    price: "₹56,623.54",
    change: "1.41%",
    positive: true,
  },
  {
    icon: <FaChartLine className="text-red-500 w-6 h-6" />,
    name: "TRX",
    fullName: "TRON",
    price: "₹56,623.54",
    change: "1.41%",
    positive: true,
  },
  {
    icon: <FaCircle className="text-green-500 w-6 h-6" />,
    name: "USDT",
    fullName: "TETHER",
    price: "₹56,623.54",
    change: "1.41%",
    positive: false,
  },
  {
    icon: <FaBitcoin className="text-orange-400 w-6 h-6" />,
    name: "BTC",
    fullName: "BITCOIN",
    price: "₹56,623.54",
    change: "1.41%",
    positive: true,
  },
];
  // Mock data for charts
  const chartData = [
    { time: "9", value: 45000 },
    { time: "10", value: 47000 },
    { time: "11", value: 46500 },
    { time: "12", value: 48000 },
    { time: "1", value: 49000 },
    { time: "2", value: 47500 },
    { time: "3", value: 50000 },
  ];

const cryptoLogos = [
  { name: "Solana", color: "#14F195", symbol: "◎" },
  { name: "Binance", color: "#F3BA2F", symbol: "BNB" },
  { name: "Cardano", color: "#FF060A", symbol: "ADA" },
  { name: "Bitcoin", color: "#F7931A", symbol: "₿" },
  { name: "Ethereum", color: "#627EEA", symbol: "Ξ" },
  { name: "Tether", color: "#26A17B", symbol: "₮" },
  { name: "XRP", color: "#23292F", symbol: "✕" },
  { name: "Dogecoin", color: "#C2A633", symbol: "Ð" },
];

// Wider rainbow arc
const getArcStyle = (index, total, radius = 300) => {
  const angleStep = Math.PI / (total - 1);
  const angle = angleStep * index;
  const x = radius * Math.cos(angle - Math.PI);
  const y = radius * Math.sin(angle - Math.PI);
  return {
    position: "absolute",
    left: `calc(50% + ${x}px)`,
    top: `${y + radius}px`,
    transform: "translate(-50%, -50%)",
  };
};
const getPositionClasses = (position) => {
  switch (position) {
    case "bottom-left":
      return "absolute  left-16 md:left-24 lg:left-32";
    case "left":
      return "absolute top-30 left-8 md:left-12 lg:left-16 transform -translate-y-1/2";
    case "top-left":
      return "absolute  bottom-90 left-80 md:left-40 lg:left-48";
    case "top-center":
      return "absolute bottom-90 left-90 transform -translate-x-1/2";
    case "top-right":
      return "absolute bottom-90 md:right-40 lg:right-48";
    case "top-right-2":
      return "absolute top-18 right-16 md:right-24 lg:right-32";
    case "right":
      return "absolute top-1/2 right-8 md:right-12 lg:right-16 transform -translate-y-1/2";
    case "bottom-right":
      return "absolute bottom-4 right-16 md:right-24 lg:right-32";
    default:
      return "";
  }
};
  const cryptoColors = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    ADA: "#0033AD",
    DOT: "#E6007A",
    XRP: "#23292F",
    LTC: "#BFBBBB",
    BCH: "#8DC351",
    BNB: "#F3BA2F",
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

     {/* Hero Section */}
<div className="bg-white px-4 sm:px-6 py-8 sm:py-12">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Trade Smarter, Not Harder
        </h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
          Experience seamless trading with our advanced platform. Access
          global markets, trade cryptocurrencies, stocks, and more with
          institutional tools and real-time data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 font-medium rounded text-center cursor-pointer">
            Start Trading
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 font-medium rounded text-center cursor-pointer">
            View Live Market
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4 flex items-center justify-center lg:justify-start gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
            <BiCheckDouble size={14} />
          </span>
          Trusted by over 100+ leading worldwide
        </p>
      </div>

      {/* Right Content (Image) */}
      <div className="relative mt-8 lg:mt-0">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <img
            src="/images/portfolio.png"
            alt="Portfolio Chart"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Steps Section */}
   <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-10xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {coins.map((coin, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-start space-y-2 relative"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6">{coin.icon}</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{coin.name}</span>
                  <span className="text-xs text-gray-400 uppercase">{coin.fullName}</span>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900">{coin.price}</div>
              <div
                className={`text-xs font-medium ${
                  coin.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.change}
              </div>

              {/* Mini Line Chart */}
              <div className="absolute bottom-2 right-2 w-12 h-6">
                <svg
                  viewBox="0 0 100 40"
                  className={`w-full h-full ${
                    coin.positive ? "text-green-400" : "text-red-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d={
                      coin.positive
                        ? "M0 30 L20 20 L40 25 L60 15 L80 10 L100 5" // Up trend
                        : "M0 10 L20 15 L40 20 L60 25 L80 30 L100 35" // Down trend
                    }
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
   {/* Trade Smarter Section */}
<div className="bg-white py-12 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - Image Placeholder */}
      <div className="flex justify-center lg:justify-start">
        <img 
          src="/images/mobile.png" 
          alt="Trade Interface" 
          className="w-full max-w-sm lg:max-w-md rounded-xl shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Trade Smarter, Trade Faster
        </h2>
        <p className="text-gray-600 mb-6">
          Buy and sell crypto seamlessly with real-time price tracking, deep
          liquidity, and ultra-low fees. Start trading in seconds!
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-black-600 text-xl bg-gray"><IoIosCheckmarkCircle /></span>
            <span className="text-gray-800 text-lg">Real-Time Market Prices</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black-600 text-xl"><IoIosCheckmarkCircle /></span>
            <span className="text-gray-800 text-lg">Low Trading Fees</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black-600 text-xl"><IoIosCheckmarkCircle /></span>
            <span className="text-gray-800 text-lg">Secure & Fast Transactions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black-600 text-xl"><IoIosCheckmarkCircle /></span>
            <span className="text-gray-800 text-lg">Trade 100+ Crypto Pairs</span>
          </div>
        </div>

        <button className="mt-8 bg-[#a94c6f] hover:bg-[#923a5c] text-white text-lg font-medium px-8 py-3 rounded-lg shadow-md transition cursor-pointer">
          Start Trading Now
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Market Update Section - Your existing functionality preserved */}
 <div className="bg-gray-50 py-12 sm:py-16">
  <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Market Update</h2>
      <div className="relative w-full sm:w-auto">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Coin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
        />
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">#</th>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">NAME</th>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">LAST PRICE</th>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">CHANGE</th>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">MARKET STATS</th>
              <th className="text-left p-3 sm:p-4 font-medium text-gray-600 text-sm">TRADE</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => {
              const lastPrice = lastPricesRef.current[asset.symbol] || asset.current_price;
              const priceChange =
                asset.current_price > lastPrice
                  ? "up"
                  : asset.current_price < lastPrice
                  ? "down"
                  : "same";
              const changePercent = ((Math.random() - 0.5) * 10).toFixed(2);
              lastPricesRef.current[asset.symbol] = asset.current_price;

              return (
                <tr
                  key={asset.symbol}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 sm:p-4">
                    <span className="text-gray-500 text-sm">{index + 1}</span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
                        style={{
                          backgroundColor: cryptoColors[asset.symbol] || "#6B7280",
                        }}
                      >
                        {asset.icon ? (
                          <img
                            src={`${BASE_URL}${asset.icon}`}
                            alt={asset.symbol}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                          />
                        ) : (
                          cryptoLogos[asset.symbol] || asset.symbol[0]
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {asset.symbol}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                          {asset.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      ${asset.current_price.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div
                      className={`flex items-center gap-1 ${
                        parseFloat(changePercent) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {parseFloat(changePercent) >= 0 ? (
                        <FaArrowUp className="text-xs" />
                      ) : (
                        <FaArrowDown className="text-xs" />
                      )}
                      <span className="font-medium text-sm">
                        {Math.abs(parseFloat(changePercent))}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="w-16 h-6 sm:w-20 sm:h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.slice(0, 5)}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={
                              parseFloat(changePercent) >= 0
                                ? "#10B981"
                                : "#EF4444"
                            }
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <button className="bg-[#A98891] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#93767E] transition text-sm cursor-pointer">
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


 {/* Charts Section */}

<div className="bg-white py-12 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="space-y-6 sm:space-y-8">
      {/* First Row - 3 Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <img src="/images/image1.png" alt="Block 1" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <img src="/images/image2.png" alt="Block 2" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <img src="/images/image3.png" alt="Block 3" className="w-full h-full object-cover" />
        </div>
      </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
  <div className="bg-white shadow-md rounded-xl overflow-hidden h-64 sm:h-72 lg:h-80">
    <img 
      src="/images/image4.png" 
      alt="Block 4" 
      className="w-full h-full object-cover" 
    />
  </div>
<div className="bg-white shadow-md rounded-xl overflow-hidden">
  <img 
    src="/images/image5.png" 
    alt="Block 5" 
    className="w-full object-contain object-center" 
  />
</div>
</div>
    </div>
  </div>
</div>



      {/* Crypto Logos Section */}
<div className="bg-white py-16 relative overflow-hidden">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">

    {/* Rainbow Arc Container */}
    <div className="relative h-[340px] sm:h-[380px] lg:h-[450px] flex items-center justify-center">
      {/* Crypto Logos */}
      {cryptoLogos.map((crypto, i) => (
        <div
          key={crypto.name}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg absolute"
          style={{
            backgroundColor: crypto.color,
            ...getArcStyle(
              i,
              cryptoLogos.length,
              window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 300 : 400 // wider radius
            ),
          }}
        >
          {crypto.symbol}
        </div>
      ))}

      {/* Center Content inside the arc */}
      <div className="text-center relative z-10 px-4 pt-8 sm:pt-10 lg:pt-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          All the chains<br />that matter in one place
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Explore top blockchains like Bitcoin, Ethereum, Cardano, and Solana—secure, scalable,<br />
          and innovative networks shaping the future of crypto.
        </p>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {/* Google Play */}
          <a
            href="#"
            className="bg-gray-900 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors bg-gradient-to-r from-[#A98891] to-[#9D4960]"
          >
            <div className="text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] text-gray-400">Get it on</div>
              <div className="text-white text-sm font-semibold">Google Play</div>
            </div>
          </a>

          {/* App Store */}
          <a
            href="#"
            className="bg-gray-900 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors bg-gradient-to-r from-[#A98891] to-[#9D4960]"
          >
            <div className="text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] text-gray-400">Download on the</div>
              <div className="text-white text-sm font-semibold">App Store</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>



{/* Earn Section */}
<div className="py-6 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-6">

    {/* Left Side Button */}
    <button className="bg-gradient-to-r from-[#8854F6] to-[#A871F8] text-white text-sm font-medium px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
      Create Account
    </button>

    {/* Right Side Text */}
    <div className="text-center sm:text-left">
      <h2 className="text-lg sm:text-xl font-semibold text-black">
        Earn up to ₹ 101
      </h2>
      <p className="text-sm text-gray-700">
        Discover How Specific Cryptocurrencies Work - And Get A Bit Of Each Crypto To Try Out For Yourself.
      </p>
    </div>

  </div>
</div>



      {/* Footer */}
<footer className="bg-white">
  {/* Top Section */}
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-900">
    <div>
      <h4 className="font-semibold mb-4 text-gray-600">Company</h4>
      <ul className="space-y-2">
        <li><a href="#">About us</a></li>
        <li><a href="#">KYC Policy</a></li>
        <li><a href="#">Partners</a></li>
        <li><a href="#">Fees</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-gray-600">Support</h4>
      <ul className="space-y-2">
        <li><a href="#">Support Center</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Disclaimer</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-gray-600">Product</h4>
      <ul className="space-y-2">
        <li><a href="#">Insta Buy</a></li>
        <li><a href="#">Trading</a></li>
        <li><a href="#">BNPL</a></li>
        <li><a href="#">VIP</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4 text-gray-600">Info Hub</h4>
      <ul className="space-y-2">
        <li><a href="#">News</a></li>
        <li><a href="#">Announcement</a></li>
        <li><a href="#">Referral & Reward</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>
  </div>

  {/* Wavy Top Background (Flipped) */}
  <div className="relative h-24 overflow-hidden">
    <svg
      className="absolute top-0 left-0 w-full h-full rotate-180"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path
        fill="#a78bfa"
        fillOpacity="0.2"
        d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,90.7C672,85,768,75,864,80C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
      <path
        fill="#a78bfa"
        fillOpacity="0.3"
        d="M0,96L48,90.7C96,85,192,75,288,80C384,85,480,107,576,117.3C672,128,768,128,864,128C960,128,1056,128,1152,117.3C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  </div>

  {/* Purple Gradient Footer with Socials */}
  <div className="relative bg-gradient-to-b from-[#65558F] to-[#65558F] pt-6 pb-6 px-4 text-white overflow-hidden">
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Social Icons */}
      <div className="flex items-center space-x-4 text-lg">
        <a href="#" className="hover:opacity-80"><FaLinkedinIn /></a>
        <a href="#" className="hover:opacity-80"><FaInstagram /></a>
        <a href="#" className="hover:opacity-80"><FaFacebookF /></a>
        <a href="#" className="hover:opacity-80"><FaTelegramPlane /></a>
        <a href="#" className="hover:opacity-80"><FaTwitter /></a>
        <a href="#" className="hover:opacity-80"><FaRedditAlien /></a>
        <a href="#" className="hover:opacity-80"><FaDiscord /></a>
      </div>

      {/* Copyright */}
      <p className="text-sm">@ 2025 All rights reserved</p>

      {/* Logo */}
      <div className="flex items-center gap-2">
      
        <span className="font-semibold text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" fill="none" viewBox="0 0 220 40"><path fill="#0E1534" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"></path><path fill="#0E1534" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13ZM46.455 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM211.711 12.104c5.591 0 8.289 3.905 8.289 8.428v8.495h-5.851V21.54c0-2.05-.748-3.742-2.893-3.742-2.145 0-2.86 1.692-2.86 3.742v7.486h-5.851V21.54c0-2.05-.715-3.742-2.861-3.742-2.145 0-2.893 1.692-2.893 3.742v7.486h-5.85v-8.495c0-4.523 2.697-8.428 8.288-8.428 3.056 0 5.266 1.204 6.274 3.189 1.072-1.985 3.413-3.19 6.208-3.19ZM180.427 23.82c1.885 0 2.698-1.725 2.698-3.776v-7.29h5.85v8.006c0 4.784-2.795 8.755-8.548 8.755-5.754 0-8.549-3.97-8.549-8.755v-8.006h5.851v7.29c0 2.05.812 3.776 2.698 3.776ZM163.275 29.547c-3.673 0-6.046-1.269-7.444-3.742l4.226-2.376c.585 1.041 1.462 1.562 2.925 1.562 1.203 0 1.755-.423 1.755-.944 0-1.985-8.581.033-8.581-6.28 0-3.06 2.6-5.533 7.021-5.533 3.868 0 5.981 1.887 6.924 3.71l-4.226 2.408c-.357-.976-1.463-1.562-2.568-1.562-.845 0-1.3.358-1.3.846 0 2.018 8.581.163 8.581 6.281 0 3.417-3.348 5.63-7.313 5.63ZM142.833 36.512h-5.851V20.858c0-4.98 3.738-8.592 8.939-8.592 5.071 0 8.939 3.873 8.939 8.592 0 5.207-3.446 8.657-8.614 8.657-1.203 0-2.405-.358-3.413-.912v7.909Zm3.088-12.497c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.124-3.088-3.124s-3.088 1.4-3.088 3.125c0 1.692 1.235 3.124 3.088 3.124ZM131.121 11.03c-1.918 0-3.51-1.595-3.51-3.515 0-1.92 1.592-3.515 3.51-3.515 1.918 0 3.511 1.595 3.511 3.515 0 1.92-1.593 3.515-3.511 3.515Zm-2.925 1.724h5.851v16.273h-5.851V12.754ZM116.97 29.515c-5.071 0-8.939-3.905-8.939-8.657 0-4.719 3.868-8.624 8.939-8.624s8.939 3.905 8.939 8.624c0 4.752-3.868 8.657-8.939 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM96.983 37c-4.03 0-6.956-1.79-8.451-4.98l4.843-2.603c.52 1.107 1.495 2.246 3.51 2.246 2.114 0 3.511-1.335 3.674-3.678-.78.684-2.016 1.204-3.868 1.204-4.519 0-8.16-3.482-8.16-8.364 0-4.718 3.869-8.559 8.94-8.559 5.201 0 8.939 3.613 8.939 8.592v6.444c0 5.858-4.064 9.698-9.427 9.698Zm.39-13.31c1.755 0 3.088-1.205 3.088-2.995 0-1.757-1.332-2.929-3.088-2.929-1.723 0-3.088 1.172-3.088 2.93 0 1.79 1.365 2.993 3.088 2.993ZM78.607 29.515c-5.071 0-8.94-3.905-8.94-8.657 0-4.719 3.869-8.624 8.94-8.624 5.07 0 8.939 3.905 8.939 8.624 0 4.752-3.869 8.657-8.94 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM59.013 7.06v16.434H68.7v5.533H58.2c-3.705 0-5.2-1.953-5.2-5.045V7.06h6.013Z"></path></svg></span>
      </div>
    </div>
  </div>
</footer>





      </div>
      
   
  );
}