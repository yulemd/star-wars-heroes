import axios from 'axios';
import { type ZodSchema } from 'zod';

const API_BASE_URL = 'https://sw-api.starnavi.io';

export const fetchFromApi = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
): Promise<T> => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    throw new Error('API response validation failed');
  }

  return result.data;
};
