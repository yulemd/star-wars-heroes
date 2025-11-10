import {
  PeopleResponseSchema,
  type PeopleResponseType,
} from '@/schemas/personSchema';
import {
  PlanetsResponseSchema,
  type PlanetsResponseType,
} from '@/schemas/planetsSchema';
import {
  StarshipsResponseSchema,
  type StarshipsResponseType,
} from '@/schemas/starshipsSchema';
import { fetchFromApi } from './client';

export const swapi = {
  getPeople: () =>
    fetchFromApi<PeopleResponseType>('people', PeopleResponseSchema),
  getPlanets: () =>
    fetchFromApi<PlanetsResponseType>('planets', PlanetsResponseSchema),
  getStarships: () =>
    fetchFromApi<StarshipsResponseType>('starships', StarshipsResponseSchema),
};
