import { Description, FieldError, Input, Label, TextField } from '@heroui/react';
import { MovieTypes } from '@/constante';
import React from 'react';

interface AddMovieFormProps {
  onSubmit: (formData: FormData) => void;
  onValidityChange: (isValid: boolean) => void;
}

export function AddMovieForm({ onSubmit, onValidityChange }: AddMovieFormProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('');
  const [posterPath, setPosterPath] = React.useState('');

  const isDateFormatValid = (dateString: string): boolean => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    return regex.test(dateString);
  };

  const isRealCalendarDate = (dateString: string): boolean => {
    const [day, month, year] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const isRealCalendarDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    return isRealCalendarDate;
  };

  const isValidImageUrl = (imageUrl: string): boolean => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl);
  };

  const isFormValid =
    title.trim() !== '' &&
    description.trim() !== '' &&
    description.trim().length >= 10 &&
    releaseDate.trim() !== '' &&
    isDateFormatValid(releaseDate) &&
    isRealCalendarDate(releaseDate) &&
    genre.trim() !== '' &&
    posterPath.trim() !== '' &&
    isValidImageUrl(posterPath);

  // Hook pour notifier le parent (AddMovieDrawer) du changement de validité du form
  React.useEffect(() => {
    onValidityChange(isFormValid);
  }, [isFormValid, onValidityChange]);

  return (
    <form id="add-movie-form" className="flex flex-col gap-4" action={onSubmit}>
      <TextField isRequired className="w-full" name="title" type="text">
        <Label>Titre</Label>
        <Input placeholder="Entrer le titre du film" variant="secondary" onChange={(e) => setTitle(e.target.value)} />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        className="w-full"
        name="description"
        type="text"
        validate={(value) => {
          if (value.trim().length > 0 && value.trim().length < 10) {
            return 'La description doit contenir au moins 10 caractères.';
          }
        }}
      >
        <Label>Description</Label>
        <Input
          placeholder="Ajouter une description au film"
          variant="secondary"
          onChange={(e) => setDescription(e.target.value)}
        />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        className="w-full"
        name="releaseDate"
        type="text"
        validate={(value) => {
          if (value.trim().length === 0) {
            return;
          }

          if (isDateFormatValid(value) === false) {
            return 'La date de sortie doit être au format JJ-MM-AAAA.';
          }

          if (!isRealCalendarDate(value)) {
            return "La date renseignée n'est pas une date valide.";
          }
        }}
      >
        <Label>Date de sortie</Label>
        <Input placeholder="jj-mm-aaaa" variant="secondary" onChange={(e) => setReleaseDate(e.target.value)} />
        <Description>Format attendu : JJ-MM-AAAA</Description>
        <FieldError />
      </TextField>

      <TextField isRequired className="w-full">
        <Label>Genre</Label>
        <select
          required
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2"
          name="genre"
          defaultValue=""
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="" disabled>
            Sélectionner un genre
          </option>
          {Object.entries(MovieTypes).map(([genreType, genreLabel]) => (
            <option key={genreType} value={genreType}>
              {genreLabel}
            </option>
          ))}
        </select>
      </TextField>

      <TextField
        isRequired
        className="w-full"
        name="posterPath"
        type="text"
        validate={(value) => {
          if (value.trim().length > 0 && !isValidImageUrl(value)) {
            return "L'URL de l'affiche doit être une URL valide pointant vers une image.";
          }
        }}
      >
        <Label>URL de l'affiche</Label>
        <Input
          placeholder="Entrer l'url de l'affiche"
          variant="secondary"
          onChange={(e) => setPosterPath(e.target.value)}
        />
        <FieldError />
      </TextField>
    </form>
  );
}
