import { motion } from 'framer-motion';
import { useState } from 'react';

import { Loader } from '../Loader';
import { PersonDetailedModal } from '../modal';
import { PeopleGrid } from './PeopleGrid';
import { usePeople } from './usePeople';

import { useInfiniteApi } from '@/queries/useInfiniteApi';
import type { PersonType } from '@/schemas/personSchema';

export const PeopleList = () => {
  const { items, loadMoreRef, isFetchingNextPage, hasNextPage, status } =
    usePeople();
  const { data: filmsData } = useInfiniteApi('films');
  const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);

  const filmsList = filmsData?.pages.flatMap((page) => page.results) ?? [];

  const episodes = selectedPerson
    ? filmsList.reduce<typeof filmsList>((acc, film) => {
        if (!selectedPerson.films.includes(film.id)) return acc;

        const matchedStarships = film.starships.filter((s) =>
          selectedPerson.starships.includes(s),
        );

        acc.push({ ...film, starships: matchedStarships });
        return acc;
      }, [])
    : [];

  if (status === 'pending')
    return (
      <p className="text-yellow-400 animate-pulse text-2xl font-orbitron tracking-widest text-center mt-20">
        ACCESSING HOLONET...
      </p>
    );

  if (status === 'error')
    return (
      <p className="text-red-500 text-xl font-orbitron text-center mt-20">
        ERROR: CONNECTION LOST
      </p>
    );

  return (
    <>
      <div className="relative max-w-[70vw] mx-auto px-4 py-12">
        {/* Slow top scanner */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60 blur-sm"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <PeopleGrid people={items} onSelect={setSelectedPerson} />

        <Loader
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage}
          loadMoreRef={loadMoreRef}
          variant="infinite"
        />
      </div>

      <PersonDetailedModal
        key={selectedPerson?.id}
        episodes={episodes}
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </>
  );
};
