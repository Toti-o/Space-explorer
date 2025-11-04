import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <section className="text-center space-y-6 py-8">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold bg-gradient-to-r from-maroon-300 to-maroon-500 bg-clip-text text-transparent"
        >
          Welcome to Space Explorer 🌌
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Dive into NASA's incredible data. Explore today's Astronomy Picture of the Day, 
          discover Mars rover photos, and journey through the cosmos.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link to="/apod">
            <Button>🚀 Explore APOD</Button>
          </Link>
          <Link to="/mars">
            <Button variant="secondary">🪐 See Mars Photos</Button>
          </Link>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card
          title="Astronomy Picture of the Day"
          description="Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured."
          className="text-center"
        >
          <Link to="/apod">
            <Button variant="outline" className="w-full mt-4">
              Explore APOD
            </Button>
          </Link>
        </Card>

        <Card
          title="Mars Rover Photos"
          description="View the latest images from NASA's Curiosity, Perseverance, and other Mars rovers."
          className="text-center"
        >
          <Link to="/mars">
            <Button variant="outline" className="w-full mt-4">
              View Mars Photos
            </Button>
          </Link>
        </Card>

        <Card
  title="NASA Image Library"
  description="Search NASA's vast collection of images, videos, and audio files from space exploration."
  className="text-center"
>
  <Link to="/images">
    <Button variant="outline" className="w-full mt-4">
      🔍 Search Images
    </Button>
  </Link>
</Card>
      </section>
    </motion.div>
  );
}
