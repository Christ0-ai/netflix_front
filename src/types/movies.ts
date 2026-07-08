export type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string;
  release_date: Date;
  poster_path: string;
  avis: Avis[];
};

export type Avis = {
  id: number;
  note: number;
  comment: string;
  creationDate: Date;
};
