import { z } from 'zod';
import { BaseResponseSchema } from './common';

export const PersonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.number().nullable(),
  films: z.array(z.number()),
  species: z.array(z.number()),
  vehicles: z.array(z.number()),
  starships: z.array(z.number()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const PeopleResponseSchema = BaseResponseSchema(PersonSchema);
export type PersonType = z.infer<typeof PersonSchema>;
export type PeopleResponseType = z.infer<typeof PeopleResponseSchema>;
