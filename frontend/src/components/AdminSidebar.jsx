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
           <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 text-[#7A7097] rounded flex items-center justify-center">
            <span className="text-[#7A7097]text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40"><path fill="#7A7097" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path><path fill="#7A7097" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg></span>
          </div>
          <span className="text-[#7A7097] font-bold text-sm">Logoipsum</span>
        </div>
      </div>
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
                  ? " text-blue-700"
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
