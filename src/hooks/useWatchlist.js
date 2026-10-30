import { useEffect, useState } from "react";

function readWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    return Array.isArray(saved) ? saved.filter((movie) => movie && typeof movie.id === "number" && typeof movie.title === "string") : [];
  } catch { return []; }
}

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(readWatchlist);
  useEffect(() => {
    try { localStorage.setItem("watchlist", JSON.stringify(watchlist)); }
    catch { /* Keep the watchlist usable in memory if storage is unavailable. */ }
  }, [watchlist]);
  function addMovie(movie) {
    setWatchlist((current) => current.some((item) => item.id === movie.id) ? current : [...current, movie]);
  }
  function removeMovie(movie) {
    setWatchlist((current) => current.filter((item) => item.id !== movie.id));
  }
  return { watchlist, addMovie, removeMovie };
}
