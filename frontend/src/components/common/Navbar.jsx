import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="border-b bg-gray-50 border-gray-100 px-6 sm:px-12 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg" onClick={() => setMenuOpen(false)}>
          <img src='logo.png' className='h-20 w-48'></img>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6 text-lg">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-500 hover:text-blue-500">Dashboard</Link>
              <Link to="/analyze" className="text-gray-500 hover:text-blue-500">New analysis</Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-blue-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
              <Link to="/signup" className="bg-black text-white px-3 py-1.5 rounded-md">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-sm text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-3 mt-4 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/analyze" onClick={() => setMenuOpen(false)}>New analysis</Link>
              <button onClick={handleLogout} className="text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}