import { useState } from "react";

export default function MoviePoster({ movie, className = "", size = "w500" }) {
  const [failedPath, setFailedPath] = useState(null);
  if (!movie.poster_path || failedPath === movie.poster_path) {
    return <div className={`poster-placeholder ${className}`} role="img" aria-label={`No poster for ${movie.title}`}>No image available</div>;
  }
  return <img src={`https://image.tmdb.org/t/p/${size}${movie.poster_path}`} alt={movie.title}
    className={className} loading="lazy" onError={() => setFailedPath(movie.poster_path)} />;
}
