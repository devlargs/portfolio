import { motion } from "framer-motion";
import { ReactElement } from "react";

const FloatUp = ({ children }: { children: ReactElement }) => (
  <motion.div
    animate={{ y: 15 }}
    transition={{
      yoyo: Infinity,
      duration: 0.9,
    }}
  >
    {children}
  </motion.div>
);

export default FloatUp;
