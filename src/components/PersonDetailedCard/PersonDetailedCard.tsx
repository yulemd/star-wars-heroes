import type { FilmType } from '@/schemas/filmsSchema';
import type { PersonType } from '@/schemas/personSchema';
import { motion } from 'framer-motion';
import { PersonGraph } from './PersonGraph';
import { usePersonGraphNodes } from './usePersonGraphNodes';

interface PersonDetailedCardProps {
  episodes: FilmType[];
  person: PersonType;
  onClose: () => void;
}

export const PersonDetailedCard = ({
  episodes,
  person,
  onClose,
}: PersonDetailedCardProps) => {
  const { nodes, edges } = usePersonGraphNodes(person, episodes);

  return (
    <motion.div
      className="relative w-full h-[600px] bg-black/90 border-2 border-cyan-400 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-600/70"
      style={{ pointerEvents: 'all' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-cyan-400 hover:text-red-400 text-3xl font-bold z-10 cursor-pointer"
      >
        ×
      </button>

      <Suspense fallback={<Loader />}>
        <PersonGraph nodes={nodes} edges={edges} />
      </Suspense>
    </motion.div>
  );
};
