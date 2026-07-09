import logoNetflix from '@/assets/images/bg-netflix.webp';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '@/types/movies.ts';
import { MovieTypes } from '@/constante.ts';
import { getMovies } from '@/services/movies.ts';
import SearchBar from '@/components/SearchBar/SearchBar.tsx';
import { useState } from 'react';
import { SpinnerBasic } from '@/components/SpinnerBasic.tsx';
import MoviesSearchResult from '@/components/MoviesSearchResult/MoviesSearchResult.tsx';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel.tsx';

function Home() {
  // queries
  const { error, data, isPending } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    select: (movies: Movie[]) => ({
      allMovies: movies,
      animation: movies.filter((m) => m.genre === MovieTypes.ANIMATION),
      scienceFiction: movies.filter((m) => m.genre === MovieTypes.SCIENCE_FICTION),
      horror: movies.filter((m) => m.genre === MovieTypes.HORROR),
      action: movies.filter((m) => m.genre === MovieTypes.ACTION),
      family: movies.filter((m) => m.genre === MovieTypes.FAMILY),
      drama: movies.filter((m) => m.genre === MovieTypes.DRAMA),
    }),
  });

  // useStates
  const [searchMovie, setSearchMovie] = useState<string>('');

  const displayMovies = data?.allMovies.filter((m) => m.title.toLowerCase().includes(searchMovie.toLowerCase())) ?? [];
  const categories = data
    ? [
        {
          title: MovieTypes.ANIMATION,
          movies: data.animation,
        },
        {
          title: MovieTypes.SCIENCE_FICTION,
          movies: data.scienceFiction,
        },
        {
          title: MovieTypes.HORROR,
          movies: data.horror,
        },
        {
          title: MovieTypes.ACTION,
          movies: data.action,
        },
        {
          title: MovieTypes.FAMILY,
          movies: data.family,
        },
        {
          title: MovieTypes.DRAMA,
          movies: data.drama,
        },
      ]
    : [];

  return (
    <>
      <section className="flex justify-center m-10">
        <img src={logoNetflix} width={200} alt="logo netflix" />
      </section>

      <SearchBar setSearchMovie={setSearchMovie} />

      {error && <p>Error: {error.message}</p>}
      {isPending ? (
        <SpinnerBasic />
      ) : searchMovie ? (
        <MoviesSearchResult movies={displayMovies} searchMovie={searchMovie} />
      ) : (
        <>
          {categories.map((category) => (
            <section className="proposeMovie" key={category.title}>
              <h2>{category.title}</h2>
              <EmblaCarousel movies={category.movies} />
            </section>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
