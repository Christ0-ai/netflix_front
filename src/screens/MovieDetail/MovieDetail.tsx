import { useParams } from 'react-router';

function MovieDetail() {
  const { id } = useParams();
  return <p>Movie Detail {id}</p>;
}

export default MovieDetail;
