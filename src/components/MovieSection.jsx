import { useRef } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, path, onSelect }) {
  const { movies, loading, error, retry } = useMovies(path);
  const rowRef = useRef(null);
  function scroll(direction) {
    const row = rowRef.current;
    row?.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  }
  return (
    <section className="movie-section" aria-label={title}>
      <h2 className="section-title">{title}</h2>
      {loading && <p role="status">Loading movies...</p>}
      {error && <div role="alert"><p>{error}</p><button className="retry-btn" onClick={retry}>Try again</button></div>}
      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
      {movies.length > 0 && <div className="row-container">
        <button className="arrow-btn left-arrow" aria-label={`Previous ${title} movies`} onClick={() => scroll(-1)}>&#10094;</button>
        <div className="movies-row" ref={rowRef}>{movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />)}</div>
        <button className="arrow-btn right-arrow" aria-label={`Next ${title} movies`} onClick={() => scroll(1)}>&#10095;</button>
      </div>}
    </section>
  );
}
