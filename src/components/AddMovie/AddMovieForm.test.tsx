import { AddMovieForm } from '@/components/AddMovie/AddMovieForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

describe('<AddMovieForm> Component', () => {
  it('should render the form correctly with all fields', () => {
    const { container } = render(<AddMovieForm onSubmit={vi.fn()} onValidityChange={vi.fn()} />);

    // Récupérer les éléments APRÈS le render
    const titleInput = screen.getByLabelText('Titre');
    const descriptionInput = screen.getByLabelText('Description');
    const releaseDateInput = screen.getByLabelText('Date de sortie');
    const genreSelect = screen.getByText('Genre');
    const posterPathInput = screen.getByLabelText("URL de l'affiche");

    expect(container.firstChild).toMatchInlineSnapshot(`
      <form
        action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        class="flex flex-col gap-4"
        id="add-movie-form"
      >
        <div
          class="textfield w-full"
          data-rac=""
          data-required="true"
          data-slot="textfield"
        >
          <label
            class="label"
            data-slot="label"
            for="react-aria-_r_0_"
            id="react-aria-_r_1_"
          >
            Titre
          </label>
          <input
            aria-labelledby="react-aria-_r_1_"
            class="input input--secondary"
            data-rac=""
            data-slot="input"
            id="react-aria-_r_0_"
            name="title"
            placeholder="Entrer le titre du film"
            required=""
            tabindex="0"
            title=""
            type="text"
            value=""
          />
        </div>
        <div
          class="textfield w-full"
          data-rac=""
          data-required="true"
          data-slot="textfield"
        >
          <label
            class="label"
            data-slot="label"
            for="react-aria-_r_5_"
            id="react-aria-_r_6_"
          >
            Description
          </label>
          <input
            aria-labelledby="react-aria-_r_6_"
            class="input input--secondary"
            data-rac=""
            data-slot="input"
            id="react-aria-_r_5_"
            name="description"
            placeholder="Ajouter une description au film"
            required=""
            tabindex="0"
            title=""
            type="text"
            value=""
          />
        </div>
        <div
          class="textfield w-full"
          data-rac=""
          data-required="true"
          data-slot="textfield"
        >
          <label
            class="label"
            data-slot="label"
            for="react-aria-_r_a_"
            id="react-aria-_r_b_"
          >
            Date de sortie
          </label>
          <input
            aria-describedby="react-aria-_r_d_"
            aria-labelledby="react-aria-_r_b_"
            class="input input--secondary"
            data-rac=""
            data-slot="input"
            id="react-aria-_r_a_"
            name="releaseDate"
            placeholder="jj-mm-aaaa"
            required=""
            tabindex="0"
            title=""
            type="text"
            value=""
          />
          <span
            class="description"
            data-slot="description"
            id="react-aria-_r_d_"
            slot="description"
          >
            Format attendu : JJ-MM-AAAA
          </span>
        </div>
        <div
          class="textfield w-full"
          data-rac=""
          data-required="true"
          data-slot="textfield"
        >
          <label
            class="label"
            data-slot="label"
            for="react-aria-_r_f_"
            id="react-aria-_r_g_"
          >
            Genre
          </label>
          <select
            class="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2"
            name="genre"
            required=""
          >
            <option
              disabled=""
              selected=""
              value=""
            >
              Sélectionner un genre
            </option>
            <option
              value="ANIMATION"
            >
              Animation
            </option>
            <option
              value="DRAMA"
            >
              Drama
            </option>
            <option
              value="ACTION"
            >
              Action
            </option>
            <option
              value="SCIENCE_FICTION"
            >
              Science Fiction
            </option>
            <option
              value="FAMILY"
            >
              Family
            </option>
            <option
              value="HORROR"
            >
              Horror
            </option>
            <option
              value="COMEDY"
            >
              Comedy
            </option>
            <option
              value="MUSIC"
            >
              Music
            </option>
            <option
              value="THRILLER"
            >
              Thriller
            </option>
            <option
              value="ADVENTURE"
            >
              Adventure
            </option>
            <option
              value="CRIME"
            >
              Crime
            </option>
            <option
              value="FANTASY"
            >
              Fantasy
            </option>
          </select>
        </div>
        <div
          class="textfield w-full"
          data-rac=""
          data-required="true"
          data-slot="textfield"
        >
          <label
            class="label"
            data-slot="label"
            for="react-aria-_r_k_"
            id="react-aria-_r_l_"
          >
            URL de l'affiche
          </label>
          <input
            aria-labelledby="react-aria-_r_l_"
            class="input input--secondary"
            data-rac=""
            data-slot="input"
            id="react-aria-_r_k_"
            name="posterPath"
            placeholder="Entrer l'url de l'affiche"
            required=""
            tabindex="0"
            title=""
            type="text"
            value=""
          />
        </div>
      </form>
    `);

    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(releaseDateInput).toBeTruthy();
    expect(genreSelect).toBeTruthy();
    expect(posterPathInput).toBeTruthy();
  });

  it('shows error when description input is too short', () => {
    render(<AddMovieForm onSubmit={vi.fn()} onValidityChange={vi.fn()} />);

    const descriptionInput = screen.getByLabelText('Description');

    fireEvent.change(descriptionInput, { target: { value: 'Texte court' } });
    fireEvent.blur(descriptionInput);

    const errorMessage = screen.findByText('la description doit contenir au moins 10 caractères');
    expect(errorMessage).toBeTruthy();
  });

  it('shows error when realease date input is not a real calendar date', () => {
    render(<AddMovieForm onSubmit={vi.fn()} onValidityChange={vi.fn()} />);

    const releaseDateInput = screen.getByLabelText('Date de sortie');

    fireEvent.change(releaseDateInput, { target: { value: '31-02-2024' } });
    fireEvent.blur(releaseDateInput);

    const errorMessage = screen.findByText("la date renseignée n'est pas une date valide");
    expect(errorMessage).toBeTruthy();
  });

  it('shows error when release date format is invalid', () => {
    render(<AddMovieForm onSubmit={vi.fn()} onValidityChange={vi.fn()} />);

    const releaseDateInput = screen.getByLabelText('Date de sortie');

    fireEvent.change(releaseDateInput, { target: { value: '2024/01/01' } });
    fireEvent.blur(releaseDateInput);

    const errorMessage = screen.findByText('la date de sortie doit être au format jj-mm-aaaa');
    expect(errorMessage).toBeTruthy();
  });

  it('shows error when poster URL input is invalid', () => {
    render(<AddMovieForm onSubmit={vi.fn()} onValidityChange={vi.fn()} />);

    const posterPathInput = screen.getByLabelText("URL de l'affiche");

    fireEvent.change(posterPathInput, { target: { value: 'invalid-url' } });
    fireEvent.blur(posterPathInput);

    const errorMessage = screen.findByText("l'url de l'affiche doit être une url valide");
    expect(errorMessage).toBeTruthy();
  });
});
