export type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string;
  releaseDate: Date;
  posterPath: string;
  reviews: Review[];
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  creationDate: Date;
  user: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  reviews: Review[];
};

export type CreateMovieDto = {
  title: string;
  description: string;
  genre: string;
  releaseDate: Date;
  posterPath: string;
};
