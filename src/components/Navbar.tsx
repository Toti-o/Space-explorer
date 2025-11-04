import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="flex justify-between items-center p-6 bg-maroon-900 border-b border-white/10 sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-maroon-300 flex items-center gap-2">
        🌌 Space Explorer
      </h1>
      <div className="flex gap-6">
        <Link 
          to="/" 
          className={`hover:text-maroon-300 transition-colors ${
            isActive("/") ? "text-maroon-300 font-semibold" : "text-slate-300"
          }`}
        >
          Home
        </Link>
        <Link 
          to="/apod" 
          className={`hover:text-maroon-300 transition-colors ${
            isActive("/apod") ? "text-maroon-300 font-semibold" : "text-slate-300"
          }`}
        >
          APOD
        </Link>
        <Link 
          to="/mars" 
          className={`hover:text-maroon-300 transition-colors ${
            isActive("/mars") ? "text-maroon-300 font-semibold" : "text-slate-300"
          }`}
        >
          Mars Rover
        </Link>
      </div>
      <Link 
  to="/images" 
  className={`hover:text-maroon-300 transition-colors ${
    isActive("/images") ? "text-maroon-300 font-semibold" : "text-slate-300"
  }`}
>
  Image Library
</Link>
    </nav>
  );
}
