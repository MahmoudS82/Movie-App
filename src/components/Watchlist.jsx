import MoviePoster from "./MoviePoster";

export default function Watchlist({ movies, onRemove, onSelect, onBack }) {
  return <main className="watchlist-page">
    <button onClick={onBack}>&#8592; Back to Explore</button><h2>My Watchlist</h2>
    {movies.length === 0 ? <p>Your watchlist is empty.</p> : <div className="watchlist-container">
      {movies.map((movie) => <article key={movie.id} className="watchlist-movie">
        <button className="watchlist-poster" aria-label={`View details for ${movie.title}`} onClick={() => onSelect(movie)}><MoviePoster movie={movie} /></button>
        <h3>{movie.title}</h3><button onClick={() => onRemove(movie)}>Remove</button>
      </article>)}
    </div>}
  </main>;
}
