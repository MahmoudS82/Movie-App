const API_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(path, { query, signal } = {}) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) throw new Error("Add VITE_TMDB_API_KEY to .env.local and restart the app to load movies.");
  const url = new URL(API_URL + path);
  url.searchParams.set("api_key", apiKey);
  if (query) url.searchParams.set("query", query);
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(response.status === 401
    ? "Invalid TMDB API key. Check .env.local."
    : "Could not load movies. Please try again.");
  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}
