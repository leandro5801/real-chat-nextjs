import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
}

const ButtonForm: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <motion.button
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      type={type}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      {children}
    </motion.button>
  );
};

export default ButtonForm;
