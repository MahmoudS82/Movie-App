import SearchBar from "./SearchBar";

export default function Header({ onSelect, onNavigate, showWatchlist }) {
  return <header className="header-container"><div className="header-content">
    <div className="left-side">
      <h1 className="logo">FILM<span>FLIX</span></h1>
      <nav aria-label="Main navigation"><ul className="nav-links">
        <li className={!showWatchlist ? "active" : ""}><button aria-current={!showWatchlist ? "page" : undefined} onClick={() => onNavigate(false)}>Explore</button></li>
        <li className={showWatchlist ? "active" : ""}><button aria-current={showWatchlist ? "page" : undefined} onClick={() => onNavigate(true)}>My Watchlist</button></li>
      </ul></nav>
    </div>
    <div className="right-side"><SearchBar onSelect={onSelect} /></div>
  </div></header>;
}
