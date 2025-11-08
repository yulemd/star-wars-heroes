import { useInfiniteApi } from '@/hooks/useInfiniteApi';
import { useEffect, useRef } from 'react';

export const PeopleList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteApi('people');

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '200px' },
    );

    const el = loadMoreRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  if (status === 'pending') return <p className="text-gray-500">Loading...</p>;
  if (status === 'error')
    return <p className="text-red-500">Error loading data</p>;

  const items = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="max-w-[68vw] mx-auto">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(({ id, name, gender, height, mass, birth_year }) => (
          <li key={id} className="bg-gray-50 p-4 text-sm font-medium">
            <h2 className="font-semibold text-lg text-red-900">{name}</h2>
            <p className="text-sm text-gray-600">Gender: {gender}</p>
            <p className="text-sm text-gray-600">Height: {height} cm</p>
            <p className="text-sm text-gray-600">Mass: {mass} kg</p>
            <p className="text-sm text-gray-600">Born: {birth_year}</p>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && (
          <span className="text-gray-500">Loading more...</span>
        )}
        {!hasNextPage && <span className="text-gray-400">No more results</span>}
      </div>
    </div>
  );
};
