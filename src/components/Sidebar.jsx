import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  LogOut,
  Settings,
  BarChart3,
  Fingerprint,
  Award,
  // Filled-style icons for active state
  HomeIcon,
  BookMarked,
  Cog,
  AreaChart,
  Fingerprint as FingerprintFilled,
  Award as AwardFilled
} from 'lucide-react';

const menuData = [
    { icon: Home, filledIcon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
    { 
      icon: Award, 
      filledIcon: AwardFilled,
      label: 'Performance', 
      path: '/performance-appraisals',
      submenu: []
    },
    { 
      icon: Fingerprint, 
      filledIcon: FingerprintFilled,
      label: 'Attendance', 
      path: '/attendance',
      submenu: []
    },
    { 
      icon: BookOpen, 
      filledIcon: BookMarked,
      label: 'Training', 
      path: '/training-management',
      submenu: []
    },
    {
      icon: BarChart3,
      filledIcon: AreaChart,
      label: 'Reports',
      path: '/reports-analytics',
      submenu: []
    },
    {
      icon: Settings,
      filledIcon: Cog,
      label: 'Settings',
      path: '/settings',
      submenu: []
    }
];

const Sidebar = ({ onMenuSelect, activeMenuKey }) => {
  const location = useLocation();

  const isActiveRoute = (path) => {
    if (path === '/dashboard') return location.pathname === path || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item) => {
    const isActive = isActiveRoute(item.path);
    const IconComponent = isActive ? item.filledIcon : item.icon;
    
    const commonClasses = `flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors w-full h-20`;
    const activeClasses = 'bg-primary/10 text-primary';
    const inactiveClasses = 'text-base-content/60 hover:bg-base-200 hover:text-base-content';

    if (item.path !== '/dashboard') {
      return (
        <button
          onClick={() => onMenuSelect(item)}
          className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
          data-menu-path={item.path}
          data-menu-label={item.label}
        >
          <IconComponent size={24} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      );
    }

    return (
      <Link
        to={item.path}
        onClick={() => onMenuSelect(null)} // Close sub-sidebar when navigating to a top-level item
        className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <IconComponent size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-xs font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-base-100 border-r border-base-300 w-24 z-40">
      <div className="p-2 h-full flex flex-col">
        <nav className="space-y-2 flex-1">
          {menuData.map((item) => (
            <div key={item.path}>
              {renderMenuItem(item)}
            </div>
          ))}
        </nav>
        
        <div className="p-2">
          <button className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg text-base-content/60 hover:bg-base-200 hover:text-base-content w-full h-20">
            <LogOut size={24} />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
