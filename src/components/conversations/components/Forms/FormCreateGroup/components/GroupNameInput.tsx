import React from "react";
import { motion } from "framer-motion";

interface GroupNameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GroupNameInput: React.FC<GroupNameInputProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <h2 className="text-lg text-white mb-2">Nombre del grupo</h2>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Ingrese el nombre del grupo"
        className="bg-dark-800 text-white p-2 rounded-lg w-full"
      />
    </motion.div>
  );
};

export default GroupNameInput;
