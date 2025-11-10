import { z } from 'zod';
import { BaseResponseSchema } from './common';

export const FilmSchema = z.object({
  id: z.number(),
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(z.number()),
  planets: z.array(z.number()),
  starships: z.array(z.number()),
  vehicles: z.array(z.number()),
  species: z.array(z.number()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const FilmsResponseSchema = BaseResponseSchema(FilmSchema);
export type FilmType = z.infer<typeof FilmSchema>;
export type FilmsResponseType = z.infer<typeof FilmsResponseSchema>;
