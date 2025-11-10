import { z } from 'zod';
import { BaseResponseSchema } from './common';

export const PlanetSchema = z.object({
  id: z.number(),
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(z.number()),
  films: z.array(z.number()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export const PlanetsResponseSchema = BaseResponseSchema(PlanetSchema);
export type PlanetType = z.infer<typeof PlanetSchema>;
export type PlanetsResponseType = z.infer<typeof PlanetsResponseSchema>;
