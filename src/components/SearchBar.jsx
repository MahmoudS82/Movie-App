import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MoviePoster from "./MoviePoster";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const search = query.trim();
  const { movies, loading, error } = useMovies(search ? "/search/movie" : null, search, 500);
  return (
    <div className="search-container" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setDismissed(true);
    }}>
      <div className="search-bar">
        <span className="search-icon" aria-hidden="true">&#128269;</span>
        <input type="search" aria-label="Search for movies" placeholder="Search for movies..." value={query}
          onFocus={() => setDismissed(false)}
          onKeyDown={(event) => { if (event.key === "Escape") setDismissed(true); }}
          onChange={(event) => { setQuery(event.target.value); setDismissed(false); }} />
      </div>
      {search && !dismissed && <ul className="suggestions-dropdown" aria-label="Search results">
        {loading && <li className="search-status" role="status">Searching...</li>}
        {error && <li className="search-status" role="alert">{error}</li>}
        {!loading && !error && movies.length === 0 && <li className="search-status">No movies found.</li>}
        {movies.slice(0, 5).map((movie) => <li key={movie.id}>
          <button className="suggestion-item" onClick={() => { onSelect(movie); setQuery(""); setDismissed(true); }}>
            <MoviePoster movie={movie} size="w92" className="suggestion-img" />
            <span className="suggestion-info"><span className="suggestion-title">{movie.title}</span>
              <span className="suggestion-year">{movie.release_date?.substring(0, 4) || "N/A"}</span></span>
          </button>
        </li>)}
      </ul>}
    </div>
  );
}
