import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SubSidebar from './SubSidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
  const [activeMenu, setActiveMenu] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Determine active menu on route change
  useEffect(() => {
    const menuData = [
      { path: '/performance-appraisals' },
      { path: '/attendance' },
      { path: '/training-management' },
      { path: '/reports-analytics' },
      { path: '/settings' },
    ];
    
    const currentTopLevelPath = menuData.find(menu => location.pathname.startsWith(menu.path));

    if (currentTopLevelPath) {
      if (activeMenu?.path !== currentTopLevelPath.path) {
          const sidebarModule = document.querySelector(`[data-menu-path='${currentTopLevelPath.path}']`);
          if (sidebarModule) {
              setActiveMenu({ path: currentTopLevelPath.path, label: sidebarModule.dataset.menuLabel });
          }
      }
    } else {
      setActiveMenu(null);
    }
  }, [location.pathname]);


  const handleMenuSelect = (menu) => {
    setActiveMenu(prev => (prev && prev.path === menu?.path ? null : menu));
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <div className="flex pt-16">
        <Sidebar 
          onMenuSelect={handleMenuSelect}
          activeMenuKey={activeMenu?.path}
        />
        
        <SubSidebar 
          menu={activeMenu} 
          onClose={() => setActiveMenu(null)} 
        />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${
          activeMenu ? 'ml-88' : 'ml-24'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
