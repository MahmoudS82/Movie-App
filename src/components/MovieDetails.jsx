import { useEffect, useRef } from "react";
import MoviePoster from "./MoviePoster";

export default function MovieDetails({ movie, onClose, isSaved, onAdd, onRemove }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current.focus();
    function handleKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const buttons = dialogRef.current.querySelectorAll("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);
  return <div className="modal-overlay" onClick={onClose}>
    <div className="movie-details-modal" role="dialog" aria-modal="true" aria-labelledby="movie-title"
      tabIndex={-1} ref={dialogRef} onClick={(event) => event.stopPropagation()}>
      <button className="close-btn" aria-label="Close movie details" onClick={onClose}>X</button>
      <div className="modal-content"><MoviePoster movie={movie} className="modal-img" />
        <div className="modal-text">
          <h2 id="movie-title">{movie.title}</h2>
          <p className="rating"><span aria-hidden="true">&#11088;</span> {typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A"} / 10</p>
          <p className="release-date">Release Date: {movie.release_date || "Unknown"}</p>
          <p className="movie-overview">{movie.overview || "No overview available."}</p>
          <button onClick={() => isSaved ? onRemove(movie) : onAdd(movie)}>{isSaved ? "Remove From Watchlist" : "Add To Watchlist"}</button>
        </div>
      </div>
    </div>
  </div>;
}
