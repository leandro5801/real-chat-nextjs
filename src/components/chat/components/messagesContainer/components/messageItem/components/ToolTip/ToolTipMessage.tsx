import { motion } from "framer-motion";

const Tooltip = () => {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: -10, x: -20 }}
        animate={{ opacity: 2, x: -5 }}
        transition={{ duration: 0.4 }}
        className="absolute flex right-full text-green-500/95 p-2 rounded-lg shadow-lg"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 9l3 3-3 3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Tooltip;
