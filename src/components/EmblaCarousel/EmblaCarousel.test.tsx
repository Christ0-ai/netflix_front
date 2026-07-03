import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import EmblaCarousel from './EmblaCarousel.tsx';
import anatomieDuneChute from '../../assets/images/movies/anatomieDuneChute.webp';

describe('<EmblaCarousel>', () => {
  it('should render correctly', () => {
    const { container } = render(<EmblaCarousel images={[anatomieDuneChute]} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="embla"
      >
        <div>
          <div
            class="emblaContainer"
            style="transform: translate3d(0px,0px,0px);"
          >
            <div
              class="movie-card"
            >
              <img
                alt=""
                height="250"
                src="/src/assets/images/movies/anatomieDuneChute.webp"
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
