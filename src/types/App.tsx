import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import APOD from "./pages/APOD";
import MarsRover from "./pages/MarsRover";
import ImageLibrary from "./pages/ImageLibrary";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950 text-slate-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APOD />} />
              <Route path="/mars" element={<MarsRover />} />
              <Route path="/images" element={<ImageLibrary />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="border-t border-white/10 py-8 text-center text-gray-500">
          <p>Built with React, TypeScript, Tailwind CSS & NASA APIs</p>
          <p className="text-sm mt-2">Data provided by NASA's Open APIs</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
