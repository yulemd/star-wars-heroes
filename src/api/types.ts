import { type FilmsResponseType } from '@/schemas/filmsSchema';
import { type PeopleResponseType } from '@/schemas/personSchema';
import { type StarshipsResponseType } from '@/schemas/starshipsSchema';

export interface EndpointMap {
  people: PeopleResponseType;
  films: FilmsResponseType;
  starships: StarshipsResponseType;
}
