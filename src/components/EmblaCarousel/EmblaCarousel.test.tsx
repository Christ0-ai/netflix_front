import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import EmblaCarousel from './EmblaCarousel.tsx';
import type { Movie } from '@/types/movies.ts';

describe('<EmblaCarousel>', () => {
  it('should render correctly', () => {
    const movies: Movie[] = [
      {
        id: 1275779,
        title: 'Disclosure Day',
        description:
          "A cybersecurity expert becomes a whistleblower after uncovering secrets about aliens, putting him on the run from a corporation. Meanwhile, a meteorologist experiencing strange phenomena joins forces with him to prove there's life beyond our understanding.",
        genre: 'Science Fiction',
        release_date: new Date(),
        poster_path: 'https://image.tmdb.org/t/p/w500/AnJ8IQJI23hNpYXVNaythu061Ru.jpg',
        avis: [
          {
            id: 769,
            note: 5,
            comment: 'un commentaire',
            creationDate: new Date(),
          },
        ],
      },
      {
        id: 1339713,
        title: 'Obsession',
        description:
          'After breaking the mysterious "One Wish Willow" to win his crush\'s heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.',
        genre: 'Horror',
        release_date: new Date(),
        poster_path: 'https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg',
        avis: [
          {
            id: 1636,
            note: 5,
            comment: 'un commentaire',
            creationDate: new Date(),
          },
        ],
      },
    ];

    const { container } = render(<EmblaCarousel movies={movies} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class="flex gap-2 "
            style="transform: translate3d(0px,0px,0px);"
          >
            <div
              class="movie-card flex-none"
            >
              <img
                alt=""
                src="https://image.tmdb.org/t/p/w500/AnJ8IQJI23hNpYXVNaythu061Ru.jpg"
                width="200"
              />
            </div>
            <div
              class="movie-card flex-none"
            >
              <img
                alt=""
                src="https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg"
                width="200"
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
