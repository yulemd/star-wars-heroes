import { motion } from 'framer-motion';

export const DefaultLoader = () => (
  <div className="flex items-center justify-center h-24">
    <div className="flex items-center gap-3 text-cyan-400">
      <motion.div
        className="w-3 h-3 bg-cyan-400 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="text-sm font-orbitron tracking-wider">LOADING...</span>
    </div>
  </div>
);
