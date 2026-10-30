import MoviePoster from "./MoviePoster";

export default function MovieCard({ movie, onSelect }) {
  return <button className="movie-card" onClick={() => onSelect(movie)}>
    <MoviePoster movie={movie} /><p>{movie.title}</p>
  </button>;
}
