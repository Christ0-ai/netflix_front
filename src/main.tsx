import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MovieDetail from '@/screens/MovieDetail/MovieDetail.tsx';
import PageError from '@/screens/PageError/PageError.tsx';
import { getMovieById, getMovies } from '@/services/movies.ts';
import Home from '@/screens/Home/Home';
import { ToastProvider } from '@heroui/react';
import { Layout } from '@/components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        loader: async () => {
          return { movies: await getMovies() };
        },
        Component: Home,
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
    <ToastProvider />
  </StrictMode>,
);
