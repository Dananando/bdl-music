export const API_CONFIG = {
  RAPID_API_KEY: import.meta.env.VITE_RAPID_API_KEY,
  RAPID_API_HOST: import.meta.env.VITE_RAPID_API_HOST,
  RAPID_API_URL: import.meta.env.VITE_RAPID_API_URL,
} as const;

interface SearchParams {
  keyword?: string;
  types?: string;
  [key: string]: string | undefined;
}

export const createEventSearchConfig = (params: SearchParams) => ({
  method: "GET",
  url: API_CONFIG.RAPID_API_URL,
  params: {
    types: "event",
    ...params,
  },
  headers: {
    "x-rapidapi-key": API_CONFIG.RAPID_API_KEY,
    "x-rapidapi-host": API_CONFIG.RAPID_API_HOST,
  },
});
