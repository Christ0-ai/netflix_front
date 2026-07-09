import type { Movie } from '@/types/movies.ts';

interface MoviesSearchResultProps {
  movies: Movie[];
  searchMovie: string;
}

function MoviesSearchResult({ movies, searchMovie }: Readonly<MoviesSearchResultProps>) {
  return movies.length === 0 ? (
    <p className="text-center mt-10">Aucun film trouvé via votre recherche: {searchMovie}</p>
  ) : (
    <section className="flex flex-row flex-wrap justify-center gap-2 mt-10">
      {movies.map((m) => (
        <section key={`movie-${m.id}`}>
          <div>
            <img src={m.poster_path} alt={m.title} width={250} />
          </div>
        </section>
      ))}
    </section>
  );
}

export default MoviesSearchResult;
