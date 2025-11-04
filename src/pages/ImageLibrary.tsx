import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSkeleton from "../components/LoadingSkeleton";

interface NASAImage {
  data: {
    title: string;
    nasa_id: string;
    date_created: string;
    description: string;
    keywords?: string[];
  }[];
  links: {
    href: string;
  }[];
}

export default function ImageLibrary() {
  const [images, setImages] = useState<NASAImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchImages = async (query: string = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
      
      const data = await res.json();
      setImages(data.collection.items.slice(0, 9)); // Show first 9 results
      console.log('NASA images fetched successfully:', data.collection.items.length, 'results');
      
    } catch (err) {
      console.error('NASA images search failed:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your internet connection.');
        } else {
          setError(`NASA API unavailable: ${err.message}`);
        }
      } else {
        setError('Failed to search NASA images. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchImages();
  };

  const popularSearches = ["Earth", "Mars", "Moon", "Galaxy", "Nebula", "Solar System"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">NASA Image Library</h1>
        <p className="text-gray-400">
          Search NASA's vast collection of images from space exploration
        </p>
      </div>

      {/* Search Section */}
      <Card className="bg-maroon-800/50 border border-maroon-600/30">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for space images (e.g., Earth, Mars, Galaxy...)"
              className="flex-1 px-4 py-3 bg-maroon-800 border border-maroon-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-maroon-500"
            />
            <Button type="submit" disabled={loading || !searchQuery.trim()}>
              {loading ? "Searching..." : "🔍 Search"}
            </Button>
          </div>
          
          {/* Popular Searches */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-400">Try:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setSearchQuery(term);
                  searchImages(term);
                }}
                className="px-3 py-1 text-sm bg-maroon-700 hover:bg-maroon-600 text-white rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </form>
      </Card>

      {error && (
        <Card className="bg-maroon-800/50 border border-maroon-600/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-maroon-300">Search Error</h3>
              <p className="text-maroon-200 text-sm">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {loading ? (
        <LoadingSkeleton />
      ) : images.length > 0 ? (
        <>
          <div className="text-center">
            <p className="text-gray-400">
              Found {images.length} images for "{searchQuery}"
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.data[0].nasa_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  title={image.data[0].title}
                  image={image.links[0].href}
                  description={image.data[0].description?.substring(0, 150) + '...'}
                >
                  <div className="flex flex-wrap gap-2 justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-500">
                      📅 {new Date(image.data[0].date_created).toLocaleDateString()}
                    </p>
                    <a 
                      href={image.links[0].href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-maroon-400 hover:text-maroon-300 transition-colors"
                    >
                      View Original
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      ) : searchQuery && !loading ? (
        <Card className="text-center bg-maroon-800/30 border border-maroon-500/30">
          <p className="text-maroon-300">
            No images found for "{searchQuery}". Try a different search term.
          </p>
        </Card>
      ) : (
        <Card className="text-center bg-maroon-800/30 border border-maroon-500/30">
          <div className="space-y-4">
            <p className="text-maroon-300 text-lg">
              🌟 Search NASA's Image Library
            </p>
            <p className="text-gray-400 text-sm">
              Enter a search term above to explore thousands of NASA images from space missions, 
              telescopes, and Earth observations.
            </p>
          </div>
        </Card>
      )}
    </motion.div>
  );
}