import { useQuery } from '@tanstack/react-query';

import { swapi } from '@/api/swapi';
import type { EndpointMap } from '@/api/types';

const endpointToMethodMap = {
  people: 'getPeople',
  planets: 'getPlanets',
  starships: 'getStarships',
} as const;

export const useApi = <T extends keyof typeof endpointToMethodMap>(
  endpoint: T,
) =>
  useQuery<EndpointMap[T], Error>({
    queryKey: [endpoint],
    queryFn: () =>
      swapi[endpointToMethodMap[endpoint]]() as Promise<EndpointMap[T]>,
  });
