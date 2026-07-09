import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './emblaCarousel.css';
import type { Movie } from '@/types/movies.ts';

interface EmblaCarouselProps {
  movies: Movie[];
  options?: EmblaOptionsType;
}

const EmblaCarousel = ({ movies, options }: Readonly<EmblaCarouselProps>) => {
  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div>
      <div ref={emblaRef}>
        <div className="flex gap-2 ">
          {movies.map((movie) => (
            <div className="movie-card flex-none" key={movie.id}>
              <img src={movie.poster_path} width={'200'} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
