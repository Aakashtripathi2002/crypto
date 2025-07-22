import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../utils/api";
import { io } from "socket.io-client";
import AdminSidebar from "../components/AdminSidebar";
import AdminTokens from "./AdminTokens";
import AddToken from "./AddToken";
import { BASE_URL } from "../utils/baseUrl";

const socket = io(BASE_URL);

export default function AdminDashboard() {
  const [tokens, setTokens] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTokens();
    socket.on("priceUpdate", (data) => setTokens(data));
    return () => socket.off("priceUpdate");
  }, []);

  const fetchTokens = async () => {
    const { data } = await API.get("/crypto");
    setTokens(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const renderContent = () => {
    if (activePage === "dashboard") {
      return (
        <div className="p-4 sm:p-6 bg-white shadow rounded-md">
          <AdminTokens />
        </div>
      );
    }
    if (activePage === "add-token") {
      return (
        <div className="p-4 sm:p-6 bg-white shadow rounded-md">
          <AddToken />
        </div>
      );
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      <AdminSidebar setActivePage={setActivePage} activePage={activePage} />

      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white shadow">
          {/* Search Bar */}
          <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-md">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search or type command..."
              className="flex-1 outline-none text-sm"
            />
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              ⌘K
            </span>
          </div>

          {/* Profile & Logout */}
          <div className="flex items-center gap-4 ml-4">
            <img
              src="/profile-icon.png" // Replace with profile image
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 transition-all duration-300 flex-1">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
