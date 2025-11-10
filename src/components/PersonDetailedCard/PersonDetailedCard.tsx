import { motion } from 'framer-motion';

import { useStarships } from '@/queries';
import type { FilmType } from '@/schemas/filmsSchema';
import type { PersonType } from '@/schemas/personSchema';

interface PersonDetailedCardProps {
  episodes: FilmType[] | null;
  person: PersonType;
  onClose: () => void;
}

export const PersonDetailedCard = ({
  person,
  person: {
    name,
    gender,
    birth_year,
    height,
    mass,
    homeworld,
    films,
    starships,
  },
  episodes = [],
  onClose,
}: PersonDetailedCardProps) => {
  const starshipsInfo = useStarships(person);
  console.info('starshipsData', starshipsInfo);
  console.info('episodes', episodes);

  return (
    <motion.div
      className="w-full max-w-7xl bg-black/90 backdrop-blur-3xl border-2 border-cyan-400 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-600/70 preserve-3d"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 tracking-widest glitch"
                data-text={name}
              >
                {name.toUpperCase()}
              </h3>
              <p className="text-cyan-300 text-sm md:text-md lg:text-lg font-orbitron mt-3">
                SUBJECT DOSSIER // LEVEL 7 CLEARANCE
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-cyan-400 hover:text-red-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-cyan-100 font-orbitron text-sm md:text-md lg:text-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                ['GENDER', gender],
                ['BIRTH YEAR', birth_year],
                ['HEIGHT', `${height} cm`],
                ['MASS', `${mass} kg`],
                ['HOMEWORLD ID', homeworld],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-0 sm:py-2 md:py-3 lg:py-4 border-b-2 border-cyan-800/60"
                >
                  <span className="text-yellow-300 text-md lg:text-xl tracking-widest">
                    {label}
                  </span>
                  <span className="text-cyan-200 text-md md:text-lg lg:text-2xl">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-yellow-300 mb-2 lg:mb-6 text-md md:text-lg lg:text-xl tracking-widest">
                FILM APPEARANCES
              </p>
              <div className="grid grid-cols-2 gap-3">
                {films.length > 0 ? (
                  films.map((episode) => (
                    <div
                      key={episode}
                      className="bg-cyan-900 winning-glow border-2 border-cyan-600 rounded-xl p-2 text-center text-cyan-200 text-sm md:text-md lg:text-lg font-bold"
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
            <div>
              <p className="text-yellow-300 mb-2 lg:mb-6 text-md md:text-lg lg:text-xl tracking-widest">
                STARSHIPS
              </p>
              <div className="grid grid-cols-2 gap-3">
                {starships.length > 0 ? (
                  starships.map((starship) => (
                    <div
                      key={starship}
                      className="bg-cyan-900 winning-glow border-2 border-cyan-600 rounded-xl p-2 text-center text-cyan-200 text-sm md:text-md lg:text-lg font-bold"
                    >
                      STARSHIP {starship}
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 text-gray-500 italic text-center">
                    NO STARSHIPS
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
};
