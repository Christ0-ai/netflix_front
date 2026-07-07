import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './emblaCarousel.css';
import type { Movie } from '../../types/movies.ts';

type PropType = {
  movies: Movie[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
  const { movies, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div ref={emblaRef}>
        <div className="emblaContainer">
          {movies.map((movie, index) => (
            <div className="movie-card" key={`movie ${index}`}>
              <img src={movie.poster_path} alt="" height={250} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
