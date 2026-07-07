export const MovieTypes = {
  ANIMATION: 'Animation',
  DRAMA: 'Drama',
  ACTION: 'Action',
  SCIENCE_FICTION: 'Science Fiction',
  FAMILY: 'Family',
  HORROR: 'Horror',
} as const;

export type MovieType = (typeof MovieTypes)[keyof typeof MovieTypes];
