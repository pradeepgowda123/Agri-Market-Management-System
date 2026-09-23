import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            🌾 FarmMarket Hub
          </Link>

          {/* Menu */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="hover:text-green-200 transition"
            >
              Home
            </Link>

            <Link
              to="/prices"
              className="hover:text-green-200 transition"
            >
              Today's Prices
            </Link>

            <Link
              to="/markets"
              className="hover:text-green-200 transition"
            >
              Markets
            </Link>

            <Link
              to="/notices"
              className="hover:text-green-200 transition"
            >
              Notices
            </Link>

          </div>

          {/* Login */}

          <Link
            to="/login"
            className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Admin Login
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;