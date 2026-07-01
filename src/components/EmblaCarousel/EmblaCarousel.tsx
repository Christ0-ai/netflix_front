import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './emblaCarousel.css';

type PropType = {
  images: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
  const { images, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div ref={emblaRef}>
        <div className="emblaContainer">
          {images.map((image, index) => (
            <div className="movie-card" key={`movie ${index}`}>
              <img src={image} alt="" height={250} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
