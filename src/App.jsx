import { useState } from "react";
import Header from "./components/Header";
import MovieSection from "./components/MovieSection";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./components/Watchlist";
import useWatchlist from "./hooks/useWatchlist";

const sections = [
  { title: "Trending", path: "/trending/movie/day" },
  { title: "Popular", path: "/movie/popular" },
  { title: "Top Rated", path: "/movie/top_rated" },
];

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const { watchlist, addMovie, removeMovie } = useWatchlist();
  return (
    <div className="app-container">
      <div className="app">
        <Header onSelect={setSelectedMovie} onNavigate={setShowWatchlist} showWatchlist={showWatchlist} />
        {showWatchlist ? (
          <Watchlist movies={watchlist} onRemove={removeMovie} onSelect={setSelectedMovie} onBack={() => setShowWatchlist(false)} />
        ) : (
          <main>{sections.map((section) => <MovieSection key={section.path} {...section} onSelect={setSelectedMovie} />)}</main>
        )}
      </div>
      {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)}
        isSaved={watchlist.some((movie) => movie.id === selectedMovie.id)} onAdd={addMovie} onRemove={removeMovie} />}
    </div>
  );
}
