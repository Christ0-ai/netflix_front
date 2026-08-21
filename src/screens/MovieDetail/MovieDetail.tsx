import { useLoaderData } from 'react-router';
import type { Movie } from '@/types/movies.ts';
import CardAvis from '@/components/CardAvis/CardAvis.tsx';

interface MovieDetailLoaderData {
  movie: Movie;
}

function MovieDetail() {
  const { movie } = useLoaderData<MovieDetailLoaderData>();

  return (
    <div className={'flex justify-center flex-col items-center'}>
      <img src={movie.posterPath} width={'200'} alt="" />
      <div className={'flex flex-col gap-4 items-center'}>
        <div className={'flex flex-col items-center'}>
          <h1 className={'text-5xl typography--weight-bold'}>{movie.title}</h1>
          <p>{movie.genre}</p>
          <p>{movie.releaseDate.toString()}</p>
        </div>
        <p className="font-extralight w-1/3 text-justify">{movie.description}</p>
      </div>
      <div className={'flex mt-10 gap-4 items-center'}>
        {movie.reviews.map((a) => (
          <CardAvis key={a.id} review={a} />
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
