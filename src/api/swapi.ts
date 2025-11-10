import {
  FilmsResponseSchema,
  type FilmsResponseType,
} from '@/schemas/filmsSchema';
import {
  PeopleResponseSchema,
  type PeopleResponseType,
  PersonSchema,
  type PersonType,
} from '@/schemas/personSchema';
import { StarshipSchema, type StarshipType } from '@/schemas/starshipsSchema';
import { fetchFromApi, fetchMultipleWithDelay, fetchSource } from './client';

export const swapi = {
  getPeople: (page = 1) =>
    fetchFromApi<PeopleResponseType>('people', PeopleResponseSchema, page),

  getFilms: (page = 1) =>
    fetchFromApi<FilmsResponseType>('films', FilmsResponseSchema, page),

  getPersonById: (id: string) =>
    fetchSource<PersonType>('people', PersonSchema, id),

  getStarshipsByIds: (ids: string[]) =>
    fetchMultipleWithDelay<StarshipType>('starships', StarshipSchema, ids, 250),
};
