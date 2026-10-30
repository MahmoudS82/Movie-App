import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieApi";

export default function useMovies(path, query, delay = 0) {
  const [state, setState] = useState({ movies: [], loading: Boolean(path), error: "" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!path) {
      setState({ movies: [], loading: false, error: "" });
      return;
    }
    const controller = new AbortController();
    setState({ movies: [], loading: true, error: "" });
    const timer = setTimeout(async () => {
      try {
        const movies = await fetchMovies(path, { query, signal: controller.signal });
        if (!controller.signal.aborted) setState({ movies, loading: false, error: "" });
      } catch (error) {
        if (!controller.signal.aborted) setState({ movies: [], loading: false, error: error.message });
      }
    }, delay);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [path, query, delay, attempt]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
