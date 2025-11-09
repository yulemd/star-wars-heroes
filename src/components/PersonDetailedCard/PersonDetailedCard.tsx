import { motion } from 'framer-motion';

import type { PersonType } from '@/schemas/personSchema';

interface PersonDetailedCardProps {
  person: PersonType;
  onClose: () => void;
}

export const PersonDetailedCard = ({
  person,
  onClose,
}: PersonDetailedCardProps) => (
  <motion.div
    className="w-full max-w-5xl bg-black/90 backdrop-blur-3xl border-2 border-cyan-400 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-600/70 preserve-3d"
    initial={{ scale: 0.7, rotateX: -30, y: 200, opacity: 0 }}
    animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
    exit={{ scale: 0.7, rotateX: -25, y: 150, opacity: 0 }}
    transition={{
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div style={{ transform: 'translateZ(70px)' }}>
      <div className="bg-linear-to-r from-cyan-900 via-cyan-700 to-cyan-900 p-7 border-b-4 border-cyan-300">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-6xl font-bold text-yellow-400 tracking-widest glitch"
              data-text={person.name}
            >
              {person.name.toUpperCase()}
            </h3>
            <p className="text-cyan-300 text-lg font-orbitron mt-3">
              SUBJECT DOSSIER // LEVEL 7 CLEARANCE
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-red-400 text-5xl font-bold transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-10 text-cyan-100 font-orbitron text-lg">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              ['GENDER', person.gender],
              ['BIRTH YEAR', person.birth_year],
              ['HEIGHT', `${person.height} cm`],
              ['MASS', `${person.mass} kg`],
              ['HOMEWORLD ID', person.homeworld],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center py-4 border-b-2 border-cyan-800/60"
              >
                <span className="text-yellow-300 text-xl tracking-widest">
                  {label}
                </span>
                <span className="text-cyan-200 text-2xl">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-yellow-300 mb-6 text-xl tracking-widest">
              FILM APPEARANCES
            </p>
            <div className="grid grid-cols-2 gap-3">
              {person.films.length > 0 ? (
                person.films.map((episode) => (
                  <div
                    key={episode}
                    className="bg-cyan-900 winning-glow border-2 border-cyan-600 rounded-xl p-4 text-center text-cyan-200 text-lg font-bold"
                  >
                    EPISODE {episode}
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-gray-500 italic text-center">
                  NO RECORDS
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-80 blur-sm"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  </motion.div>
);
