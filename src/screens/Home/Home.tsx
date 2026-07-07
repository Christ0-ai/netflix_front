import logoNetflix from '../../assets/images/bg-netflix.webp';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel.tsx';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import './styles.css';
import type { Movie } from '../../types/movies.ts';
import { MovieTypes } from '../../constante.ts';
import { getMovies } from '../../services/movies.ts';

function Home() {
  // queries
  const { error, data, isPending } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    select: (movies: Movie[]) => ({
      animation: movies.filter((m) => m.genre === MovieTypes.ANIMATION),
      scienceFiction: movies.filter((m) => m.genre === MovieTypes.SCIENCE_FICTION),
      horror: movies.filter((m) => m.genre === MovieTypes.HORROR),
      action: movies.filter((m) => m.genre === MovieTypes.ACTION),
      family: movies.filter((m) => m.genre === MovieTypes.FAMILY),
      drama: movies.filter((m) => m.genre === MovieTypes.DRAMA),
    }),
  });
  return (
    <>
      <section id="header">
        <img src={logoNetflix} height={200} alt="logo netflix" />
      </section>

      {error && <p>Error: {error.message}</p>}

      {isPending ? (
        <div className="spinner">
          <ClipLoader color={'#FFF'} />
        </div>
      ) : (
        <>
          <section className="proposeMovie">
            <h2>Animation</h2>
            <EmblaCarousel movies={data.animation} />
          </section>
          <section className="proposeMovie">
            <h2>Horreur</h2>
            <EmblaCarousel movies={data.horror} />
          </section>
          <section className="proposeMovie">
            <h2>Science-fiction</h2>
            <EmblaCarousel movies={data.scienceFiction} />
          </section>
          <section className="proposeMovie">
            <h2>Action</h2>
            <EmblaCarousel movies={data.action} />
          </section>
          <section className="proposeMovie">
            <h2>Famille</h2>
            <EmblaCarousel movies={data.family} />
          </section>
          <section className="proposeMovie">
            <h2>Drame</h2>
            <EmblaCarousel movies={data.drama} />
          </section>
        </>
      )}
    </>
  );
}

export default Home;
