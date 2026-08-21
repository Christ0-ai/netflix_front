export const MovieTypes = {
  ANIMATION: 'Animation',
  DRAMA: 'Drama',
  ACTION: 'Action',
  SCIENCE_FICTION: 'Science Fiction',
  FAMILY: 'Family',
  HORROR: 'Horror',
  COMEDY: 'Comedy',
  MUSIC: 'Music',
  THRILLER: 'Thriller',
  ADVENTURE: 'Adventure',
  CRIME: 'Crime',
  FANTASY: 'Fantasy',
} as const satisfies Record<string, string>;

// Type des clés (= ce que l'API renvoie, ex: "SCIENCE_FICTION")
export type MovieGenre = keyof typeof MovieTypes;

// Type des libellés (= ce qui est affiché, ex: "Science Fiction")
export type MovieGenreLabel = (typeof MovieTypes)[MovieGenre];
