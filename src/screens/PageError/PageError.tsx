import { useRouteError } from 'react-router';

function PageError() {
  const error = useRouteError();
  return (
    <>
      <h1 className={'text-white text-3xl'}>Une erreur est survenue</h1>
      <p>{error.data}</p>
    </>
  );
}

export default PageError;
