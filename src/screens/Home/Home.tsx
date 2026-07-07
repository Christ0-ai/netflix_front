import logoNetflix from '../../assets/images/bg-netflix.webp';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import './styles.css';
import type { Movie } from '../../types/movies.ts';
import { MovieTypes } from '../../constante.ts';
import { getMovies } from '../../services/movies.ts';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import { useState } from 'react';
import MoviesSearchResult from '../../components/MoviesSearchResult/MoviesSearchResult.tsx';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel.tsx';

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
          title: 'Animation',
          movies: data.animation,
        },
        {
          title: 'Science Fiction',
          movies: data.scienceFiction,
        },
        {
          title: 'Horreur',
          movies: data.horror,
        },
        {
          title: 'Action',
          movies: data.action,
        },
        {
          title: 'Famille',
          movies: data.family,
        },
        {
          title: 'Drame',
          movies: data.drama,
        },
      ]
    : [];

  return (
    <>
      <section id="header">
        <img src={logoNetflix} height={200} alt="logo netflix" />
      </section>

      <SearchBar setSearchMovie={setSearchMovie} />
      {error && <p>Error: {error.message}</p>}

      {isPending ? (
        <div id="spinner">
          <ClipLoader color="#FFF" />
        </div>
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
