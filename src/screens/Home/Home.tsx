import logoNetflix from '../../assets/images/bg-netflix.webp';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel.tsx';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import './styles.css';

function Home() {
  // queries
  const { error, data, isPending } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetch('http://localhost:3000/movies').then((r) => r.json()),
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <section id="header">
        <img src={logoNetflix} height={200} alt="logo netflix" />
      </section>
      {isPending ? (
        <div className="spinner">
          <ClipLoader color={'#FFF'} />
        </div>
      ) : (
        <>
          <section className="proposeMovie">
            <h2>Notre sélection du jour pour vous</h2>
            <EmblaCarousel movies={data} />
          </section>
          <section className="proposeMovie">
            <h2>Documentaire</h2>
            <EmblaCarousel movies={data} />
          </section>
          <section className="proposeMovie">
            <h2>Science-fiction</h2>
            <EmblaCarousel movies={data} />
          </section>
        </>
      )}
    </>
  );
}

export default Home;
