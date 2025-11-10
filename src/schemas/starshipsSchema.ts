import { z } from 'zod';
import { BaseResponseSchema } from './common';

export const StarshipSchema = z.object({
  id: z.number(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(z.number()),
  films: z.array(z.number()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const StarshipsResponseSchema = BaseResponseSchema(StarshipSchema);
export type StarshipType = z.infer<typeof StarshipSchema>;
export type StarshipsResponseType = z.infer<typeof StarshipsResponseSchema>;
