import { describe, expect, it } from 'vitest';
import type { Review } from '@/types/movies.ts';
import CardAvis from '@/components/CardAvis/CardAvis.tsx';
import { render } from '@testing-library/react';

describe('<CardAvis>', () => {
  it('should render correctly', () => {
    const avis: Review = {
      id: 769,
      rating: 5,
      comment: 'un commentaire',
      creationDate: new Date(),
      user: {
        id: 0,
        name: 'user',
        email: '',
        password: '',
        role: '',
        reviews: [],
      },
    };

    const { container } = render(<CardAvis review={avis} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="flex flex-wrap gap-4"
      >
        <div
          class="card card--default gap-2"
          data-slot="card"
        >
          <img
            alt="Indie Hackers community"
            class="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          />
          <div
            class="card__header"
            data-slot="card-header"
          >
            <h3
              class="card__title"
              data-slot="card-title"
            >
              user
            </h3>
            <p
              class="card__description"
              data-slot="card-description"
            >
              un commentaire
            </p>
          </div>
          <div
            class="card__footer flex gap-2"
            data-slot="card-footer"
          >
            <div>
              <span>
                ⭐
              </span>
              <span>
                ⭐
              </span>
              <span>
                ⭐
              </span>
              <span>
                ⭐
              </span>
              <span>
                ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
