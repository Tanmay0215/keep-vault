import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl transform transition-all duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
            <div className="flex items-center justify-between text-white">
              <Link to="/" className="text-xl font-bold" onClick={onClose}>
                Keep Vault
              </Link>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/notes"
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>My Notes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notes/new"
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>New Note</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Register</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleThemeToggle}
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 w-full p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group"
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          {isAuthenticated && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-6">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};