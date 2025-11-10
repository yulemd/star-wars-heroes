import type { PersonType } from '@/schemas/personSchema';
import { motion } from 'framer-motion';
import { PersonCard } from '../PersonCard';

interface PeopleGridProps {
  people: PersonType[];
  onSelect: (person: PersonType) => void;
}

export const PeopleGrid = ({ people, onSelect }: PeopleGridProps) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {people.map((person, idx) => (
      <motion.li
        key={person.id}
        className="relative preserve-3d"
        initial={{ opacity: 0, y: 60, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: idx * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <PersonCard person={person} onClick={() => onSelect(person)} />
      </motion.li>
    ))}
  </ul>
);
