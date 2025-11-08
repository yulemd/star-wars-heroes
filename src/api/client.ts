import axios from 'axios';
import { type ZodSchema } from 'zod';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFromApi = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  page = 1,
): Promise<T> => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}/?page=${page}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    throw new Error('API response validation failed');
  }

  return result.data;
};
