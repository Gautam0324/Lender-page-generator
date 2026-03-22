import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Edit, Menu, X, Bell, Search } from 'lucide-react';
import { getStorageItem, removeStorageItem, INITIAL_DATA } from '../store/localStorage';

export const AdminSidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeStorageItem('admin_logged_in');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'CMS / Content', path: '/admin/cms', icon: <Edit size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-[var(--color-primary-light)] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <span className="text-2xl font-bold text-white font-heading">
            Admin Panel
          </span>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-[var(--color-secondary)] text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export const AdminTopbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const settings = getStorageItem('settings', INITIAL_DATA.settings);

  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-4"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold mr-3">
            A
          </div>
          <div className="hidden md:block">
            <span className="block text-sm font-semibold text-gray-800">Admin User</span>
            <span className="block text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = getStorageItem('admin_logged_in', false);
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar toggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
