import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import MoviesSearchResult from '@/components/MoviesSearchResult/MoviesSearchResult.tsx';
import type { Movie } from '@/types/movies.ts';
import { MemoryRouter } from 'react-router';

describe('<MoviesSearchResult>', () => {
  it('renders correctly when searchMovie found movies', () => {
    const movies: Movie[] = [
      {
        id: 1452,
        title: 'Superman Returns',
        description:
          'Superman returns to discover his 5-year absence has allowed Lex Luthor to walk free, and that those he was closest to felt abandoned and have moved on. Luthor plots his ultimate revenge that could see millions killed and change the face of the planet forever, as well as ridding himself of the Man of Steel.',
        release_date: new Date(),
        genre: 'Science Fiction',
        poster_path: 'https://image.tmdb.org/t/p/w500/385XwTQZDpRX2d3kxtnpiLrjBXw.jpg',
        avis: [
          {
            id: 3716,
            note: 5,
            comment: 'un commentaire',
            creationDate: new Date(),
            user: {
              id: 0,
              name: '',
              email: '',
              password: '',
              role: '',
              avis: [],
            },
          },
        ],
      },
      {
        id: 1081003,
        title: 'Supergirl',
        description:
          'When an unexpected and ruthless adversary strikes too close to home, Kara Zor-El, aka Supergirl, reluctantly joins forces with an unlikely companion on an epic, interstellar journey of vengeance and justice.',
        genre: 'Action',
        release_date: new Date(),
        poster_path: 'https://image.tmdb.org/t/p/w500/niSvU02l2BONH9ivubV6K1a5QiK.jpg',
        avis: [
          {
            id: 315,
            note: 5,
            comment: 'un commentaire',
            creationDate: new Date(),
            user: {
              id: 0,
              name: '',
              email: '',
              password: '',
              role: '',
              avis: [],
            },
          },
        ],
      },
    ];

    const { container } = render(
      <MemoryRouter>
        <MoviesSearchResult movies={movies} searchMovie={'super'} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <section
        class="flex flex-row flex-wrap justify-center gap-2 mt-10"
      >
        <section>
          <div
            class="movie-card"
          >
            <img
              alt="Superman Returns"
              src="https://image.tmdb.org/t/p/w500/385XwTQZDpRX2d3kxtnpiLrjBXw.jpg"
              width="250"
            />
          </div>
        </section>
        <section>
          <div
            class="movie-card"
          >
            <img
              alt="Supergirl"
              src="https://image.tmdb.org/t/p/w500/niSvU02l2BONH9ivubV6K1a5QiK.jpg"
              width="250"
            />
          </div>
        </section>
      </section>
    `);
  });

  it('renders correctly when searchMovie notfound movies', () => {
    const { container } = render(
      <MemoryRouter>
        <MoviesSearchResult movies={[]} searchMovie={'super'} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <p
        class="text-center mt-10"
      >
        Aucun film trouvé via votre recherche: 
        super
      </p>
    `);
  });
});
