import axios from 'axios';
import { type ZodSchema } from 'zod';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const fetchFromApi = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  page = 1,
): Promise<T> => {
  const response = await api.get(`${endpoint}/?page=${page}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    console.error('❌ API validation error:', result.error.flatten());
    throw new Error('API response validation failed');
  }

  return result.data;
};

export const fetchSource = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  id = '1',
): Promise<T> => {
  const response = await api.get(`${endpoint}/${id}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    console.error('❌ API validation error:', result.error.flatten());
    throw new Error('API response validation failed');
  }

  return result.data;
};

export const fetchMultipleWithDelay = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  ids: string[],
  delayMs = 250,
): Promise<T[]> => {
  const results: T[] = [];

  for (const id of ids) {
    try {
      const item = await fetchSource(endpoint, schema, id);
      results.push(item);
    } catch (err) {
      console.warn(`Failed to fetch ${endpoint}/${id}:`, err);
    }
    await new Promise((res) => setTimeout(res, delayMs));
  }

  return results;
};
