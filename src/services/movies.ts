import type { CreateMovieDto, Movie } from '@/types/movies.ts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/movies`);

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des films');
  }

  return response.json();
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies/${id}`);

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des films');
  }

  return response.json();
};

export const postMovie = async (movieDto: CreateMovieDto): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...movieDto, avis: [] }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage || "Erreur lors de l'ajout du film");
  }

  return response.json();
};
