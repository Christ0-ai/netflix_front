import type { Movie } from '@/types/movies.ts';

export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch('http://localhost:3000/movies');

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des films');
  }

  return response.json();
};
