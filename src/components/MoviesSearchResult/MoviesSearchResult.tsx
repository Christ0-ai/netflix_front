import type { Movie } from '@/types/movies.ts';
import './styles.css';

interface MoviesSearchResultProps {
  movies: Movie[];
  searchMovie: string;
}

function MoviesSearchResult({ movies, searchMovie }: Readonly<MoviesSearchResultProps>) {
  return movies.length === 0 ? (
    <p id="unknownMovie">Aucun film trouvé via votre recherche: {searchMovie}</p>
  ) : (
    <section id="movies">
      {movies.map((m) => (
        <section className="searchMovie" key={`movie-${m.id}`}>
          <div>
            <img src={m.poster_path} alt={m.title} height={250} />
          </div>
        </section>
      ))}
    </section>
  );
}

export default MoviesSearchResult;
