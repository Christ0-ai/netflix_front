import logoNetflix from '@/assets/images/bg-netflix.webp';
import type { Movie } from '@/types/movies.ts';
import { type MovieType, MovieTypes } from '@/constante.ts';
import SearchBar from '@/components/SearchBar/SearchBar.tsx';
import { useState } from 'react';
import { SpinnerBasic } from '@/components/SpinnerBasic.tsx';
import MoviesSearchResult from '@/components/MoviesSearchResult/MoviesSearchResult.tsx';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel.tsx';
import { useLoaderData, useNavigation } from 'react-router';

interface HomeLoaderData {
  movies: Movie[];
}

function Home() {
  const { movies } = useLoaderData<HomeLoaderData>();
  const { state } = useNavigation();
  // useStates
  const [searchMovie, setSearchMovie] = useState<string>('');

  const displayMovies = (movies ?? []).filter((m) => m.title.toLowerCase().includes(searchMovie.toLowerCase()));

  // functions
  function getMoviesByGenre(genre: MovieType) {
    return (movies ?? []).filter((m) => m.genre === genre);
  }

  const categories = movies
    ? [
        {
          title: MovieTypes.ANIMATION,
          movies: getMoviesByGenre(MovieTypes.ANIMATION),
        },
        {
          title: MovieTypes.SCIENCE_FICTION,
          movies: getMoviesByGenre(MovieTypes.SCIENCE_FICTION),
        },
        {
          title: MovieTypes.HORROR,
          movies: getMoviesByGenre(MovieTypes.HORROR),
        },
        {
          title: MovieTypes.ACTION,
          movies: getMoviesByGenre(MovieTypes.ACTION),
        },
        {
          title: MovieTypes.FAMILY,
          movies: getMoviesByGenre(MovieTypes.FAMILY),
        },
        {
          title: MovieTypes.DRAMA,
          movies: getMoviesByGenre(MovieTypes.DRAMA),
        },
      ]
    : [];

  return (
    <>
      <section className="flex justify-center m-10">
        <img src={logoNetflix} width={200} alt="logo netflix" />
      </section>

      <SearchBar setSearchMovie={setSearchMovie} />

      {state === 'loading' ? (
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
