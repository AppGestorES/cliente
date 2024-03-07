// ** IMPORTAMOS DEPENDENCIAS ** //
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// ** IMPORTAMOS PAGINAS ** //
import Inicio from './pages/App';

// ** IMPORTAMOS ESTILOS ** //
import './styles/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />,
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
