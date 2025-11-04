import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  image?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export default function Card({ title, image, description, children, className = "" }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-maroon-900 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-maroon-400/30 transition-all duration-300 ${className}`}
    >
      {image && (
        <img 
          src={image} 
          alt={title || "Image"} 
          className="rounded-xl mb-4 w-full h-64 object-cover"
        />
      )}
      {title && <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>}
      {description && <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>}
      {children}
    </motion.div>
  );
}