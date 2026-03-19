import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/buy-insurance', label: 'Buy Insurance' },
    { to: '/claims', label: 'Claims' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Dashboard' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  const handleLogout = () => {
    const role = user?.role;
    logout();
    navigate(role === 'admin' ? '/admin-login' : '/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-1.5">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">GigShield</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  location.pathname === link.to
                    ? 'bg-white text-blue-700'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {user && (
              <span className="hidden md:inline text-blue-200 text-sm">
                {user.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                location.pathname === link.to
                  ? 'bg-white text-blue-700'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
