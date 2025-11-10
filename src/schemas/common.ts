import { z } from 'zod';

export const BaseResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });
