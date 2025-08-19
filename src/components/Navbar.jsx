import React, { useState } from 'react';
import { 
  Menu, 
  Maximize2, 
  Bell, 
  Sun, 
  Moon, 
  Volume2,
  ChevronDown,
  User
} from 'lucide-react';

const Navbar = ({ onMenuClick, theme, toggleTheme }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-base-100 border-b border-base-300 h-16 flex items-center justify-between px-4 fixed w-full top-0 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-base-200 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <button className="p-2 hover:bg-base-200 rounded-lg">
          <Maximize2 size={20} />
        </button>
        <div className="font-semibold text-lg">
          Pro-People
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-base-200 rounded-lg">
          <Volume2 size={20} />
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-base-200 rounded-lg"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 hover:bg-base-200 rounded-lg relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <ChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 py-2">
              <a href="#" className="block px-4 py-2 text-sm hover:bg-base-200">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-base-200">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-base-200">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
