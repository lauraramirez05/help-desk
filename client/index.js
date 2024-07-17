import React from 'react';
import './styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Form from './components/Form';
import AdminPortal from './components/AdminPortal';
import { disabledReactDevTools } from '@fvilers/disable-react-devtools';
import Ticket from './components/Ticket';
import FilterModal from './components/FilterModal';
import TicketModal from './components/TicketModal';

if (process.env.NODE_ENV === 'production') disabledReactDevTools;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />,
  },

  {
    path: '/admin',
    element: <AdminPortal />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* <AdminPortal /> */}
    {/* <FilterModal /> */}
    {/* <TicketModal /> */}
  </StrictMode>
);
