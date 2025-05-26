import React from "react";
import { motion } from "framer-motion";

interface GroupImageInputProps {
  value: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GroupImageInput: React.FC<GroupImageInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <h2 className="text-lg text-white mb-2">Imagen del grupo</h2>
      <input
        type="file"
        //value={value}
        onChange={onChange}
        accept="image/*"
        className="bg-dark-800 text-white p-2 rounded-lg w-full"
      />
    </motion.div>
  );
};

export default GroupImageInput;
