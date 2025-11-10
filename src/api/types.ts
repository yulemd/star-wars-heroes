import { type PeopleResponseType } from '@/schemas/personSchema';
import { type PlanetsResponseType } from '@/schemas/planetsSchema';
import { type StarshipsResponseType } from '@/schemas/starshipsSchema';

export interface EndpointMap {
  people: PeopleResponseType;
  planets: PlanetsResponseType;
  starships: StarshipsResponseType;
}
