import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Form from './components/Form';
import AdminPortal from './components/AdminPortal';
import Ticket from './components/Ticket';
import FilterModal from './components/FilterModal';
import TicketModal from './components/TicketModal';

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
    {/* <RouterProvider router={router} /> */}
    {/* <App /> */}
    {/* <AdminPortal /> */}
    <FilterModal />
    {/* <TicketModal /> */}
  </StrictMode>
);
