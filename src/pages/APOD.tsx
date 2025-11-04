import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSkeleton from "../components/LoadingSkeleton";

interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

const fallbackAPOD: APODData = {
  date: new Date().toISOString().split('T')[0],
  explanation: "This is a beautiful fallback image of a nebula. The NASA API might be temporarily unavailable due to high traffic or network issues. You can try refreshing the page or check back later. Meanwhile, enjoy this stunning space imagery!",
  title: "Beautiful Nebula in Space",
  url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop",
  media_type: "image",
  service_version: "v1"
};

export default function APOD() {
  const [apod, setApod] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchAPOD = async (date: string = selectedDate) => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
      
      const data: APODData = await res.json();
      setApod(data);
      console.log('APOD data fetched successfully:', data.title);
      
    } catch (err) {
      console.error('APOD fetch failed:', err);
      setApod(fallbackAPOD);
      setUsingFallback(true);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your internet connection.');
        } else {
          setError(`NASA API unavailable: ${err.message}`);
        }
      } else {
        setError('Failed to fetch astronomy data. Showing fallback image.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchAPOD(newDate);
  };

  const getRandomDate = (): string => {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };

  const handleRandomDate = () => {
    const randomDate = getRandomDate();
    setSelectedDate(randomDate);
    fetchAPOD(randomDate);
  };

  if (loading) return <LoadingSkeleton type="apod" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Card className="bg-maroon-800/50 border border-maroon-600/30">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <label className="text-sm font-medium text-white">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              min="1995-06-16"
              className="px-4 py-2 bg-maroon-800 border border-maroon-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-maroon-500"
            />
          </div>
          <Button variant="outline" onClick={handleRandomDate}>
            🎲 Random Date
          </Button>
        </div>
      </Card>

      {error && (
        <Card className="bg-maroon-800/50 border border-maroon-600/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-maroon-300">API Notice</h3>
              <p className="text-maroon-200 text-sm">{error}</p>
            </div>
          </div>
        </Card>
      )}

      <Card
        title={apod?.title || 'Space Image'}
        image={apod?.url}
        description={apod?.explanation}
      >
        {usingFallback && (
          <div className="bg-maroon-800/30 border border-maroon-500/30 rounded-lg p-3 mb-4">
            <p className="text-maroon-300 text-sm">
              💡 <strong>Demo Mode:</strong> Showing fallback space imagery
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 justify-between items-center mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-500">📅 Date: {apod?.date}</p>
          {apod?.copyright && (
            <p className="text-sm text-gray-500">📷 Copyright: {apod.copyright}</p>
          )}
          <p className="text-sm text-gray-500">
            {apod?.media_type === 'video' ? '🎥 Video' : '🖼️ Image'}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}