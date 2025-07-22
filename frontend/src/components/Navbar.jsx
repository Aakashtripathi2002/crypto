import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaHeadphones, FaSun, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center relative">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span className="text-gray-700 font-semibold text-sm">Logoipsum</span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-8">
        <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
          Home
        </span>
        <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
          Market
        </span>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-900">
          <span className="text-gray-700 text-sm font-medium">Trade</span>
          <svg
            className="w-3 h-3 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
          BNPL
        </span>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex items-center space-x-4">
        <FaHeadphones className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        <FaBell className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        <FaSun className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
          Wallet
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm">Hi User</span>
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">U</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline ml-2"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-gray-600 focus:outline-none"
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-50 border-t border-gray-200 p-4 flex flex-col space-y-4 lg:hidden z-50">
          <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
            Home
          </span>
          <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
            Market
          </span>
          <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
            Trade
          </span>
          <span className="text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900">
            BNPL
          </span>
          <hr />
          <div className="flex items-center space-x-4">
            <FaHeadphones className="w-4 h-4 text-gray-500" />
            <FaBell className="w-4 h-4 text-gray-500" />
            <FaSun className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700 text-sm">Wallet</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-sm">Hi User</span>
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">U</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
