import { PersonDetailedCard } from '../PersonDetailedCard';
import { Modal } from './Modal';

import type { PersonType } from '@/schemas/personSchema';

interface PersonDetailedModalProps {
  person: PersonType | null;
  onClose: () => void;
}

export const PersonDetailedModal = ({
  person,
  onClose,
}: PersonDetailedModalProps) => (
  <Modal open={!!person} onClose={onClose}>
    {person && <PersonDetailedCard person={person} onClose={onClose} />}
  </Modal>
);
