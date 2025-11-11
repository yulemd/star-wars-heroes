import { motion } from 'framer-motion';

export const InfiniteLoader = () => (
  <div className="flex items-center gap-3 text-cyan-400">
    <div className="flex gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
    <span className="text-sm font-orbitron tracking-wider">
      SCANNING SECTOR...
    </span>
  </div>
);
