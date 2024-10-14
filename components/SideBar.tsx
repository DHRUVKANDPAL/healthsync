import React from "react";
import {
  Home,
  FileText,
  User,
  LogOut,
  Menu,
  Calendar,
  Settings,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";

const Sidebar = ({
  activeSection,
  setActiveSection,
  handleLogout,
  userData,
}: any) => {
  const navItems = [
    { icon: User, label: "Profile", section: "profile" },
    { icon: FileText, label: "Documents", section: "documents" },
    { icon: Calendar, label: "Appointments", section: "appointments" },
    { icon: Settings, label: "Settings", section: "settings" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 justify-evenly">
          <Image
            src={userData?.imageUrl || "/default-avatar.png"}
            alt={userData?.name || "User"}
            width={40}
            height={40}
            className="rounded-full h-12 w-12 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {userData?.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userData?.dob}
            </p>
          </div>
          <DarkModeToggle></DarkModeToggle>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => setActiveSection(item.section)}
                className={`flex items-center w-full p-2 rounded-md transition-colors ${
                  activeSection === item.section
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );

  return (
    <div className="bg-white dark:bg-slate-800 w-64 flex-shrink-0 flex-col shadow-lg">
      <div className="flex flex-col h-full">
        <SidebarContent />
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center pr-4 w-full p-2 rounded-md bg-rose-500 text-teal-50 dark:text-gray-200 hover:bg-rose-600 dark:hover:bg-rose-600 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
