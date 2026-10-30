# FilmFlix

A frontend-only React and Vite movie browser with trending, popular, and top-rated movies, search, movie details, and a browser-local watchlist.

## Getting started

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_TMDB_API_KEY` to your TMDB API key.
4. Run `npm run dev`.

The browser calls TMDB directly. No server, database, or authentication setup is required.
Vite includes `VITE_*` variables in the public browser bundle. Use a TMDB key intended for this frontend app; never put database credentials or JWT secrets here.

Without a key, movie sections display setup instructions. Existing saved watchlists still work.
Watchlists use the existing `watchlist` localStorage key and stay on the current browser/device.
If storage is unavailable, the watchlist works in memory for the current session.

## Structure

- `src/components/`: header, search, movie rows, cards, posters, details, and watchlist view.
- `src/hooks/`: cancellable movie fetching and persistent watchlist state.
- `src/services/movieApi.js`: TMDB requests, configuration, and error handling.
- `src/styles/`: base, layout, movies, modal, and watchlist styles.
- `src/App.jsx`: view switching and shared selection.
- `src/index.css`: stylesheet imports.

## Commands

- `npm run dev`: development server.
- `npm run lint`: lint source.
- `npm run build`: production build.
- `npm run preview`: preview the production build.

Deploy `dist/` to a static host. Set `VITE_TMDB_API_KEY` before building; changing it requires rebuilding.
