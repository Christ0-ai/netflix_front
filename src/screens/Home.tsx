import logoNetflix from '../assets/images/bg-netflix.webp';
import anatomieDuneChute from '../assets/images/movies/anatomieDuneChute.webp';
import asterix from '../assets/images/movies/asterix.jpg';
import avatar from '../assets/images/movies/avatar.webp';
import avengers from '../assets/images/movies/avengers.webp';
import dune from '../assets/images/movies/dune.jpg';
import interstellar from '../assets/images/movies/interstellar.jpg';
import joker from '../assets/images/movies/joker.webp';
import jurassicWorld from '../assets/images/movies/jurassicWorld.webp';
import laNonne from '../assets/images/movies/laNonne.webp';
import oppenheimer from '../assets/images/movies/oppenheimer.webp';
import theBatman from '../assets/images/movies/theBatman.jpg';
import thePursuitOfHappyness from '../assets/images/movies/thePursuitOfHappyness.webp';
import theShinning from '../assets/images/movies/theShinning.jpg';
import titanic from '../assets/images/movies/titanic.webp';
import uncharted from '../assets/images/movies/uncharted.jpg';
import veryBadTrip from '../assets/images/movies/veryBadTrip.webp';
import EmblaCarousel from '../components/EmblaCarousel/EmblaCarousel.tsx';

function Home() {
  const images = [
    anatomieDuneChute,
    asterix,
    avatar,
    avengers,
    dune,
    interstellar,
    joker,
    jurassicWorld,
    laNonne,
    oppenheimer,
    theBatman,
    thePursuitOfHappyness,
    theShinning,
    titanic,
    uncharted,
    veryBadTrip,
  ];

  return (
    <>
      <section id="header">
        <img src={logoNetflix} height={200} alt="logo netflix" />
      </section>
      <section className="proposeMovie">
        <h2>Notre sélection du jour pour vous</h2>
        <EmblaCarousel images={images} />
      </section>
      <section className="proposeMovie">
        <h2>Documentaire</h2>
        <EmblaCarousel images={images} />
      </section>
      <section className="proposeMovie">
        <h2>Science-fiction</h2>
        <EmblaCarousel images={images} />
      </section>
    </>
  );
}

export default Home;
