import type { FilmType } from '@/schemas/filmsSchema';
import { PersonDetailedCard } from '../PersonDetailedCard';
import { Modal } from './Modal';

import type { PersonType } from '@/schemas/personSchema';

interface PersonDetailedModalProps {
  episodes: FilmType[] | null;
  person: PersonType | null;
  onClose: () => void;
}

export const PersonDetailedModal = ({
  episodes,
  person,
  onClose,
}: PersonDetailedModalProps) => (
  <Modal open={!!person} onClose={onClose}>
    {person && (
      <PersonDetailedCard
        episodes={episodes}
        person={person}
        onClose={onClose}
      />
    )}
  </Modal>
);
