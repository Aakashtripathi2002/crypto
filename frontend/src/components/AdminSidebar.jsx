import { useState } from "react";
import { FaBars, FaTachometerAlt, FaPlusCircle, FaTimes } from "react-icons/fa";

export default function AdminSidebar({ setActivePage, activePage }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { key: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { key: "add-token", icon: <FaPlusCircle />, label: "Token Management" },
  ];

  const SidebarContent = ({ isMobile }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
        {!collapsed && (
          <img
            src="/logoipsum.svg" // Replace with your logo path
            alt="Logo"
            className="h-6"
          />
        )}
        <button
          onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          {isMobile ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
        </button>
      </div>

      {/* Menu */}
      <div className="mt-4 px-4 text-xs font-semibold text-gray-400">
        MENU
      </div>
      <nav className="flex-1 mt-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md transition ${
                activePage === item.key
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Sidebar for Desktop */}
      <div
        className={`hidden sm:flex bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`sm:hidden fixed inset-0 bg-black bg-opacity-40 z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleMobileSidebar}
      >
        <div
          className="bg-white w-64 min-h-screen p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent isMobile />
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="sm:hidden fixed top-4 left-4 p-2 bg-gray-100 rounded shadow z-50"
      >
        <FaBars className="text-gray-600" />
      </button>
    </>
  );
}
