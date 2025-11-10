import type { PersonType } from '@/schemas/personSchema';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface PersonCardProps {
  person: PersonType;
  onClick: () => void;
}

export const PersonCard = memo(
  ({
    person: { name, gender, height, mass, birth_year },
    onClick,
  }: PersonCardProps) => (
    <motion.div
      onClick={onClick}
      className={`
      relative w-full h-full p-6 rounded-xl cursor-pointer
      bg-linear-to-br from-black/70 via-cyan-900/20 to-black/70
      backdrop-blur-xl border border-cyan-500/60
      shadow-2xl shadow-cyan-500/30
      transition-all duration-700
      hover:border-cyan-300 hover:shadow-cyan-400/50
      preserve-3d
    `}
      whileHover={{
        z: 70,
        rotateY: 12,
        rotateX: 8,
        scale: 1.07,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(25px)' }}>
        <h2
          className="text-xl font-bold text-yellow-400 tracking-widest mb-3 glitch"
          data-text={name}
        >
          {name.toUpperCase()}
        </h2>
        <div className="space-y-1.5 text-cyan-200 text-xs leading-relaxed">
          <p>
            <span className="text-yellow-300">GENDER:</span>{' '}
            {gender !== 'unknown' ? gender : 'N/A'}
          </p>
          <p>
            <span className="text-yellow-300">HEIGHT:</span>{' '}
            {height !== 'unknown' ? `${height} cm` : 'N/A'}
          </p>
          <p>
            <span className="text-yellow-300">MASS:</span>{' '}
            {mass !== 'unknown' ? `${mass} kg` : 'N/A'}
          </p>
          <p>
            <span className="text-yellow-300">BORN:</span>{' '}
            {birth_year !== 'unknown' ? birth_year : 'N/A'}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-70 blur-xs"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="absolute inset-x-4 -bottom-4 h-8 bg-cyan-500/20 blur-2xl scale-75"
        style={{ transform: 'translateZ(-15px)' }}
      />
    </motion.div>
  ),
  (prev, next) => prev.person.id === next.person.id,
);
