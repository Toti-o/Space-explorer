import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Button from "../components/Button";

interface MarsPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

const fallbackMarsPhotos: MarsPhoto[] = [
  {
    id: 1,
    sol: 1000,
    camera: { id: 1, name: "FHAZ", rover_id: 5, full_name: "Fallback Camera" },
    img_src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&h=300&fit=crop",
    earth_date: "2015-05-30",
    rover: { id: 5, name: "Curiosity", landing_date: "2012-08-06", launch_date: "2011-11-26", status: "active" }
  },
  {
    id: 2,
    sol: 1000,
    camera: { id: 2, name: "RHAZ", rover_id: 5, full_name: "Fallback Camera Right" },
    img_src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    earth_date: "2015-05-30",
    rover: { id: 5, name: "Curiosity", landing_date: "2012-08-06", launch_date: "2011-11-26", status: "active" }
  },
  {
    id: 3,
    sol: 1000,
    camera: { id: 3, name: "MAST", rover_id: 5, full_name: "Fallback Camera Mast" },
    img_src: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=300&fit=crop",
    earth_date: "2015-05-30",
    rover: { id: 5, name: "Curiosity", landing_date: "2012-08-06", launch_date: "2011-11-26", status: "active" }
  }
];

export default function MarsRover() {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY",
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
      
      const data = await res.json();
      setPhotos(data.photos.slice(0, 9));
      console.log('Mars photos fetched successfully:', data.photos.length, 'photos');
      
    } catch (err) {
      console.error('Mars photos fetch failed:', err);
      setPhotos(fallbackMarsPhotos);
      setUsingFallback(true);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your internet connection.');
        } else {
          setError(`NASA API unavailable: ${err.message}`);
        }
      } else {
        setError('Failed to fetch Mars photos. Showing fallback images.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Mars Rover Photos</h1>
        <p className="text-gray-400">
          Exploring the Martian surface through the eyes of NASA's rovers
        </p>
      </div>

      {error && (
        <Card className="bg-maroon-800/50 border border-maroon-600/50">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-maroon-300">API Notice</h3>
                <p className="text-maroon-200 text-sm">{error}</p>
              </div>
            </div>
            <Button variant="outline" onClick={fetchPhotos}>
              🔄 Retry
            </Button>
          </div>
        </Card>
      )}

      {usingFallback && (
        <Card className="bg-maroon-800/30 border border-maroon-500/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-maroon-300">Demo Mode</h3>
              <p className="text-maroon-200 text-sm">Showing fallback Mars imagery</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              title={photo.camera.full_name}
              image={photo.img_src}
              description={`Rover: ${photo.rover.name} | Earth Date: ${photo.earth_date}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}