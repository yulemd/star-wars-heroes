import { useInfiniteQuery } from '@tanstack/react-query';

import { swapi } from '@/api/swapi';

import type { EndpointMap } from '@/api/types';

const endpointToMethodMap = {
  people: 'getPeople',
  films: 'getFilms',
} as const;

export const useInfiniteApi = <T extends keyof typeof endpointToMethodMap>(
  endpoint: T,
) =>
  useInfiniteQuery<EndpointMap[T], Error>({
    queryKey: [endpoint],
    queryFn: async (context) =>
      swapi[endpointToMethodMap[endpoint]](
        typeof context.pageParam === 'number' ? context.pageParam : 1,
      ) as Promise<EndpointMap[T]>,
    initialPageParam: 1,
    getNextPageParam: (lastPage: { next: string | null }) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
  });
