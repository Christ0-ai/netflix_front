import { isRouteErrorResponse, useRouteError } from 'react-router';

function PageError() {
  const error = useRouteError();
  let messageError;

  if (isRouteErrorResponse(error)) {
    messageError = error.data;
  } else if (error instanceof Error) {
    messageError = error.message;
  } else {
    messageError = error;
  }

  return (
    <>
      <h1 className={'text-white text-3xl'}>Une erreur est survenue</h1>
      <p>{messageError}</p>
    </>
  );
}

export default PageError;
