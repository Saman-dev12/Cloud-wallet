import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth} from '../atom/useratom';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(auth);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear the authentication state and token
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        
        navigate('/');
      } else {
        console.log('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-white text-2xl font-bold">
              Sol Wallet
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-white hover:bg-blue-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/wallet"
                    className="text-white hover:bg-blue-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Wallet
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
