import { swapi } from '@/api/swapi';
import type { PersonType } from '@/schemas/personSchema';
import { useQuery } from '@tanstack/react-query';

export const useStarships = (person: PersonType) => {
  const starshipQueries = useQuery({
    queryKey: ['personStarships', person.id],
    queryFn: () =>
      swapi.getStarshipsByIds([...person.starships.map((id) => `${id}`)]),
    enabled: !!person,
    staleTime: 1000 * 60 * 5,
  });

  return starshipQueries.data;
};
