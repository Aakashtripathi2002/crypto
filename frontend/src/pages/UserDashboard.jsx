import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import API from "../utils/api";
import { FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const socket = io("http://localhost:5000");

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

  // Mock data for charts
  const chartData = [
    { time: '9', value: 45000 },
    { time: '10', value: 47000 },
    { time: '11', value: 46500 },
    { time: '12', value: 48000 },
    { time: '1', value: 49000 },
    { time: '2', value: 47500 },
    { time: '3', value: 50000 },
  ];

  const cryptoLogos = {
    'BTC': '₿',
    'ETH': 'Ξ',
    'ADA': '₳',
    'DOT': '●',
    'XRP': 'X',
    'LTC': 'Ł',
    'BCH': '₿',
    'BNB': 'B'
  };

  const cryptoColors = {
    'BTC': '#F7931A',
    'ETH': '#627EEA',
    'ADA': '#0033AD',
    'DOT': '#E6007A',
    'XRP': '#23292F',
    'LTC': '#BFBBBB',
    'BCH': '#8DC351',
    'BNB': '#F3BA2F'
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Trade Smarter, Not Harder
              </h1>
              <p className="text-gray-600 mb-8">
                Experience seamless trading with our advanced platform. Access 
                global markets, trade cryptocurrencies, stocks, and more with 
                institutional tools and real-time data.
              </p>
              <div className="flex gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                  Start Trading
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium">
                  View Live Market
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                ● Trusted by over 100+ leading worldwide
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Portfolio</h3>
                    <span className="text-green-500 text-sm">+2.4%</span>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {[
              { icon: '👤', title: 'Create Account', desc: 'Sign up in minutes' },
              { icon: '💰', title: 'Fund Account', desc: 'Deposit securely' },
              { icon: '📊', title: 'Start Trading', desc: 'Trade instantly' },
              { icon: '📈', title: 'Grow Portfolio', desc: 'Watch profits grow' },
              { icon: '🎯', title: 'Advanced Tools', desc: 'Pro features' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg mx-auto mb-3">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trade Smarter Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>BTC/USD</span>
                  <span className="text-green-400">$48,234.56</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>ETH/USD</span>
                  <span className="text-red-400">$3,234.78</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>ADA/USD</span>
                  <span className="text-green-400">$1.23</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>DOT/USD</span>
                  <span className="text-red-400">$24.56</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mt-8 font-medium">
                Start Trading Now
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trade Smarter, Trade Faster
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Real-Time Market Prices</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Low Trading Fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Secure & Fast Transactions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Trade 100+ Crypto Pairs</span>
                </div>
              </div>
              <p className="text-gray-600 mt-6">
                Buy and sell crypto seamlessly with real-time price tracking, deep 
                liquidity, and ultra-low fees. Start trading in seconds!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Update Section - Your existing functionality preserved */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Market Update</h2>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Coin"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">#</th>
                    <th className="text-left p-4 font-medium text-gray-600">NAME</th>
                    <th className="text-left p-4 font-medium text-gray-600">LAST PRICE</th>
                    <th className="text-left p-4 font-medium text-gray-600">CHANGE</th>
                    <th className="text-left p-4 font-medium text-gray-600">MARKET STATS</th>
                    <th className="text-left p-4 font-medium text-gray-600">TRADE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset, index) => {
                    const lastPrice = lastPricesRef.current[asset.symbol] || asset.current_price;
                    const priceChange = asset.current_price > lastPrice ? "up" : asset.current_price < lastPrice ? "down" : "same";
                    const changePercent = ((Math.random() - 0.5) * 10).toFixed(2);
                    lastPricesRef.current[asset.symbol] = asset.current_price;

                    return (
                      <tr key={asset.symbol} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <span className="text-gray-500">{index + 1}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: cryptoColors[asset.symbol] || '#6B7280' }}
                            >
                              {asset.icon ? (
                                <img 
                                  src={`http://localhost:5000${asset.icon}`} 
                                  alt={asset.symbol} 
                                  className="w-6 h-6 rounded-full" 
                                />
                              ) : (
                                cryptoLogos[asset.symbol] || asset.symbol[0]
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{asset.symbol}</div>
                              <div className="text-sm text-gray-500">{asset.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">
                            ${asset.current_price.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center gap-1 ${
                            parseFloat(changePercent) >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {parseFloat(changePercent) >= 0 ? (
                              <FaArrowUp className="text-xs" />
                            ) : (
                              <FaArrowDown className="text-xs" />
                            )}
                            <span className="font-medium">{Math.abs(parseFloat(changePercent))}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="w-20 h-8">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData.slice(0, 5)}>
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={parseFloat(changePercent) >= 0 ? "#10B981" : "#EF4444"}
                                  strokeWidth={1.5}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </td>
                        <td className="p-4">
                          <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
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
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Price Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Base Trade</h3>
                  <div className="flex gap-2">
                    <span className="text-2xl font-bold text-gray-900">$47,243</span>
                    <span className="text-green-500 text-sm">+2.4%</span>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                      <XAxis dataKey="time" />
                      <YAxis />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg mt-4 font-medium">
                  Best Trade - Place Buy Order
                </button>
              </div>
            </div>

            {/* Side Stats */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy Slow Pay Later</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">$</div>
                  <p className="text-gray-600 text-sm">
                    Get up to $1000 of Bitcoin, Ethereum, Cardano, and Solana—secure, scalable,
                    and accessible blockchain shaping the future of crypto.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Watch</h3>
                <div className="space-y-3">
                  {['Bitcoin', 'Ethereum', 'Cardano'].map((coin, index) => (
                    <div key={coin} className="flex justify-between items-center">
                      <span className="text-gray-600">{coin}</span>
                      <span className={index % 2 === 0 ? 'text-green-500' : 'text-red-500'}>
                        {index % 2 === 0 ? '+' : '-'}{(Math.random() * 5).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seamless Crypto Trading Experience</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Advanced trading tools</p>
                  <p>• Real-time market data</p>
                  <p>• Secure wallet integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Logos Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              All the chains that matter in one place
            </h2>
            <p className="text-gray-400">
              Explore top blockchains like Bitcoin, Ethereum, Cardano, and Solana—secure, scalable,
              and accessible blockchain shaping the future of crypto.
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-8 mb-8">
            {[
              { name: 'Bitcoin', color: '#F7931A', symbol: '₿' },
              { name: 'Ethereum', color: '#627EEA', symbol: 'Ξ' },
              { name: 'Cardano', color: '#0033AD', symbol: '₳' },
              { name: 'Polkadot', color: '#E6007A', symbol: '●' },
              { name: 'Tether', color: '#26A17B', symbol: '₮' },
              { name: 'Binance', color: '#F3BA2F', symbol: 'B' },
              { name: 'XRP', color: '#23292F', symbol: 'X' },
              { name: 'Dogecoin', color: '#C2A633', symbol: 'Ð' }
            ].map((crypto) => (
              <div 
                key={crypto.name}
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: crypto.color }}
              >
                {crypto.symbol}
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                Download App
              </button>
              <button className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Earn Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Earn up to 7.1%</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Discover how Specific Cryptocurrency Work—And Get A Bit Of Each Crypto To Try Out For Yourself.
          </p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
            Create Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li>Trading</li>
                <li>Wallet</li>
                <li>API</li>
                <li>Institutional</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li>Twitter</li>
                <li>Discord</li>
                <li>Telegram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 LogoIpsum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}