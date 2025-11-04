import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary: "bg-maroon-600 hover:bg-maroon-700 text-white shadow-lg shadow-maroon-600/25",
  secondary: "bg-maroon-800 hover:bg-maroon-700 text-white",
  outline: "border border-maroon-400 text-maroon-400 hover:bg-maroon-400 hover:text-white",
};

export default function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  disabled = false,
  type = "button"
}: ButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
        variants[variant]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}