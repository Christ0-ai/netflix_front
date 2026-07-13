import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MovieDetail from '@/screens/MovieDetail/MovieDetail.tsx';
import App from '@/App.tsx';
import PageError from '@/screens/PageError/PageError.tsx';
import { getMovieById, getMovies } from '@/services/movies.ts';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Outlet,
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        loader: async () => {
          return { movies: await getMovies() };
        },
        Component: App,
      },
      {
        path: 'movie/:id',
        loader: async ({ params }) => {
          return { movie: await getMovieById(Number(params.id)) };
        },
        Component: MovieDetail,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
