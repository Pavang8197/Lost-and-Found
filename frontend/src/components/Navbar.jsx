import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
        bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-500
        shadow-lg border-b border-white/20">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-white drop-shadow flex items-center gap-2"
        >
          Lost & Found 🔍
        </Link>

        {/* DESKTOP NAV + SEARCH */}
        <div className="hidden md:flex items-center space-x-6">

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-l-xl bg-white text-black shadow 
                        focus:outline-none w-52"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 shadow rounded-r-xl hover:bg-yellow-300"
            >
              🔍
            </button>
          </form>

          <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
          <Link to="/lost" className="text-white hover:text-yellow-300">Lost</Link>
          <Link to="/found" className="text-white hover:text-yellow-300">Found</Link>
          <Link to="/report" className="text-white hover:text-yellow-300">Report</Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-yellow-400 rounded-xl text-black shadow hover:bg-yellow-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-green-400 rounded-xl text-black shadow hover:bg-green-300"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-400"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-purple-800/90 backdrop-blur-xl p-6 space-y-4 text-white font-semibold">

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded-l-xl bg-white text-black w-full"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-yellow-400 rounded-r-xl shadow"
            >
              🔍
            </button>
          </form>

          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/lost" onClick={toggleMenu}>Lost Items</Link>
          <Link to="/found" onClick={toggleMenu}>Found Items</Link>
          <Link to="/report" onClick={toggleMenu}>Report Item</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="block text-yellow-300">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block text-green-300">Register</Link>
            </>
          ) : (
            <button
              onClick={() => { handleLogout(); toggleMenu(); }}
              className="block text-red-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
