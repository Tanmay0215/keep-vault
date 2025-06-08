import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuthStore } from '../../store/auth.store';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-blur-2xl bg-black/80 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-6 bg-indigo-600">
            <div className="flex items-center justify-between text-white">
              <Link to="/" className="text-xl font-bold" onClick={onClose}>
                Keep Vault
              </Link>
              <button onClick={onClose} className="p-2">
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
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-600 hover:text-indigo-600"
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/notes"
                      className="block text-gray-600 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      My Notes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notes/new"
                      className="block text-gray-600 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      New Note
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block text-gray-600 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block text-gray-600 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Footer */}
          {isAuthenticated && (
            <div className="border-t border-gray-200 px-4 py-6">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
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
