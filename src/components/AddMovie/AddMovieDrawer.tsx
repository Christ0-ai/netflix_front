import { Button, Drawer, toast } from '@heroui/react';
import { Plus } from '@gravity-ui/icons';
import React from 'react';
import { useRevalidator } from 'react-router';
import { postMovie } from '@/services/movies';
import type { CreateMovieDto } from '@/types/movies';
import { AddMovieForm } from '@/components/AddMovie/AddMovieForm';

interface AddMovieDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMovieDrawer({ isOpen, onOpenChange }: AddMovieDrawerProps) {
  const [isFormValid, setIsFormValid] = React.useState(false);

  // Hook qui permet de demander à react-router de relancer le loader de la page (re-fetch getMovies) après l'ajout d'un film.
  const revalidator = useRevalidator();

  const onSubmit = async (formData: FormData) => {
    try {
      const [day, month, year] = (formData.get('releaseDate') as string).split('-').map(Number);

      const movieFormDto: CreateMovieDto = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        releaseDate: new Date(year, month - 1, day),
        genre: formData.get('genre') as string,
        posterPath: formData.get('posterPath') as string,
      };

      await postMovie(movieFormDto);

      toast.success(`Le film ${movieFormDto.title} a été ajouté avec succès !`);

      // Rafraîchit les données du loader pour que Home affiche bien le nouveau film.
      await revalidator.revalidate();

      onOpenChange(false);
    } catch (error) {
      const errorMessage = (error as Error).message || "Une erreur est survenue lors de l'ajout du film.";
      toast.danger(errorMessage, {
        description: 'Veuillez réessayer.',
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <Button>
        <Plus />
        Ajouter un film
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Ajouter un nouveau film</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <AddMovieForm onSubmit={onSubmit} onValidityChange={setIsFormValid} />
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => onOpenChange(false)} variant="secondary">
                Annuler
              </Button>
              <Button isDisabled={!isFormValid} form="add-movie-form" type="submit">
                Valider
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
