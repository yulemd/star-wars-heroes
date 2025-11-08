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
  getPeople: (page = 1) =>
    fetchFromApi<PeopleResponseType>('people', PeopleResponseSchema, page),
  getPlanets: (page = 1) =>
    fetchFromApi<PlanetsResponseType>('planets', PlanetsResponseSchema, page),
  getStarships: (page = 1) =>
    fetchFromApi<StarshipsResponseType>(
      'starships',
      StarshipsResponseSchema,
      page,
    ),
};
