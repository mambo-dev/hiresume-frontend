import { motion } from "framer-motion";

export default function Toast({ message, className, svg, body }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white w-72 truncate  px-2 p-2  font-medium shadow border  h-14 flex items-center justify-center gap-x-2  rounded ${className}`}
    >
      {message && message.length > 0 && (
        <div className="w-full flex items-center gap-x-3 justify-start overflow-x-hidden">
          {svg}
          <p className="truncate"> {message}</p>
        </div>
      )}
      {body}
    </motion.div>
  );
}
