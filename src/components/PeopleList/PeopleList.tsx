import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useInfiniteApi } from '@/queries/useInfiniteApi';
import { PersonDetailedModal } from '../modal';
import { PersonCard } from '../PersonCard';

import type { PersonType } from '@/schemas/personSchema';

export const PeopleList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteApi('people');

  const { data: filmsData } = useInfiniteApi('films');

  const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const items = data?.pages.flatMap((page) => page.results) ?? [];

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

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '400px' },
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

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

        {/* Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((person, idx) => (
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
              <PersonCard
                person={person}
                onClick={() => setSelectedPerson(person)}
              />
            </motion.li>
          ))}
        </ul>

        {/* Loader */}
        <div
          ref={loadMoreRef}
          className="h-24 flex justify-center items-center mt-16"
        >
          {isFetchingNextPage && (
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
          )}
          {!hasNextPage && (
            <p className="text-gray-500 font-orbitron text-sm tracking-widest">
              END OF DATA STREAM
            </p>
          )}
        </div>
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
