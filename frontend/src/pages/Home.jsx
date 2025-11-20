import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-center px-6 py-20">
      
      <div className="max-w-3xl text-center animate-fadeIn">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Lost Something in BMSCE? 🔍  
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 opacity-90">
          Or maybe you found something? Let's help you connect!
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-10 opacity-90">
          A modern, easy-to-use Lost & Found system made specially for BMS College students.  
          Post items, upload images, view lost/found listings — all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">

          <Link
            to="/lost"
            className="px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300"
          >
            View Lost Items
          </Link>

          <Link
            to="/found"
            className="px-8 py-3 rounded-xl bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-lg shadow-md hover:bg-white/30 transition-all duration-300"
          >
            View Found Items
          </Link>

          <Link
            to="/report"
            className="px-8 py-3 rounded-xl bg-yellow-300 text-gray-900 font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Report an Item
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 flex justify-center gap-8 text-lg font-medium opacity-90">
          <div>
            🎒 300+ Lost Items Reported  
          </div>
          <div>
            🔑 120+ Items Returned  
          </div>
        </div>
      </div>

    </div>
  );
}
