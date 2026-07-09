import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MovieDetail from '@/screens/MovieDetail/MovieDetail.tsx';
import App from '@/App.tsx';
import PageError from '@/screens/PageError/PageError.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
