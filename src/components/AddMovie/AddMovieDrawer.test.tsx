import { AddMovieDrawer } from '@/components/AddMovie/AddMovieDrawer';
import { postMovie } from '@/services/movies';
import { toast } from '@heroui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRevalidator } from 'react-router';
import { describe, it, vi, expect, beforeEach } from 'vitest';

// Mock de useRevalidator, useNavigate  et toast pour les tests
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useRevalidator: vi.fn(() => ({
      revalidate: vi.fn(),
      state: 'idle',
    })),
  };
});

vi.mock('@heroui/react', async () => {
  const actual = await vi.importActual('@heroui/react');
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      danger: vi.fn(),
    },
  };
});

vi.mock('@/services/movies', () => ({
  postMovie: vi.fn(),
}));

describe('Before each', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('<AddMovieDrawer> Component', () => {
    it('should render the drawer correctly', () => {
      const { container } = render(<AddMovieDrawer isOpen={true} onOpenChange={vi.fn()} />);

      const cancelButton = screen.getByText('Annuler');
      const submitButton = screen.getByText('Valider');

      expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-controls="react-aria-_r_0_"
        aria-expanded="true"
        class="button button--md button--primary"
        data-pressed="true"
        data-rac=""
        data-react-aria-pressable="true"
        data-slot="button"
        id="react-aria-_r_1_"
        tabindex="0"
        type="button"
      >
        <svg
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
        Ajouter un film
      </button>
    `);

      expect(cancelButton).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });

    it('should call useRevalidator hook when movie successfuly added', async () => {
      // 1. Configuration du mock postMovie (maintenant qu'il existe)
      vi.mocked(postMovie).mockResolvedValueOnce({
        id: 1,
        title: 'Test Movie',
        description: 'This is a test movie.',
        releaseDate: new Date(2024, 0, 1),
        genre: 'ACTION',
        posterPath: 'https://example.com/poster.jpg',
        reviews: [],
      });

      // 2. Mock de revalidator
      const mockRevalidate = vi.fn();
      vi.mocked(useRevalidator).mockReturnValue({
        revalidate: mockRevalidate,
        state: 'idle',
      });

      // 3. Mock de onOpenChange
      const mockOnOpenChange = vi.fn();

      // 4. Render du composant
      render(<AddMovieDrawer isOpen={true} onOpenChange={mockOnOpenChange} />);

      // 5. Remplir le formulaire
      const form = document.getElementById('add-movie-form') as HTMLFormElement;

      const titleInput = screen.getByPlaceholderText('Entrer le titre du film');
      const descriptionInput = screen.getByPlaceholderText('Ajouter une description au film');
      const releaseDateInput = screen.getByPlaceholderText('jj-mm-aaaa');
      const genreSelect = screen.getByRole('combobox');
      const posterPathInput = screen.getByPlaceholderText("Entrer l'url de l'affiche");

      fireEvent.change(titleInput, { target: { value: 'Test Movie' } });

      fireEvent.change(descriptionInput, { target: { value: 'This is a test movie.' } });

      fireEvent.change(releaseDateInput, { target: { value: '01-01-2024' } });

      fireEvent.change(genreSelect, { target: { value: 'ACTION' } });

      fireEvent.change(posterPathInput, { target: { value: 'https://example.com/poster.jpg' } });

      // 6. Soumettre le formulaire

      fireEvent.submit(form);

      await waitFor(() => {
        expect(postMovie).toHaveBeenCalledWith({
          title: 'Test Movie',
          description: 'This is a test movie.',
          releaseDate: new Date(2024, 0, 1),
          genre: 'ACTION',
          posterPath: 'https://example.com/poster.jpg',
        });

        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(mockRevalidate).toHaveBeenCalledTimes(1);
        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  //TODO ajouter en cas d'erreur
});
