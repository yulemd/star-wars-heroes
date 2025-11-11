import axios from 'axios';
import { type ZodSchema } from 'zod';

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Cache
const cache = new Map<string, unknown>();

// helper sleep
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchFromApi = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  page = 1,
): Promise<T> => {
  const key = `${endpoint}?page=${page}`;

  if (cache.has(key)) {
    return cache.get(key) as T;
  }

  const response = await api.get(`${endpoint}/?page=${page}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    console.error('❌ API validation error:', result.error.flatten());
    throw new Error('API response validation failed');
  }

  cache.set(key, result.data);
  return result.data;
};

export const fetchSource = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  id = '1',
): Promise<T> => {
  const key = `${endpoint}/${id}`;

  if (cache.has(key)) {
    return cache.get(key) as T;
  }

  const response = await api.get(`${endpoint}/${id}`);
  const result = schema.safeParse(response.data);

  if (!result.success) {
    console.error('❌ API validation error:', result.error.flatten());
    throw new Error('API response validation failed');
  }

  cache.set(key, result.data);
  return result.data;
};

// fetchMultipleWithDelay with caching concurrency limit
export const fetchMultipleWithDelay = async <T>(
  endpoint: string,
  schema: ZodSchema<T>,
  ids: string[],
  delayMs = 250,
  concurrency = 3,
): Promise<T[]> => {
  const results: T[] = [];
  let index = 0;

  const worker = async () => {
    while (index < ids.length) {
      const id = ids[index];
      index++;

      try {
        const item = await fetchSource(endpoint, schema, id);
        results.push(item);
      } catch (err) {
        console.warn(`Failed to fetch ${endpoint}/${id}:`, err);
      }

      await sleep(delayMs);
    }
  };

  // Create an array of worker promises
  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  return results;
};
