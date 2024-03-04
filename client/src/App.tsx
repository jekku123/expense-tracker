import { RouterProvider } from 'react-router-dom';

import { createBrowserRouter } from 'react-router-dom';

import './index.css';

import PersistLogin from './components/persist-login.tsx';
import RequireAuth from './components/require-auth.tsx';
import Home from './pages/home.tsx';
import Layout from './pages/layout.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Tracker from './pages/tracker.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        element: <PersistLogin />,
        children: [
          {
            index: true,
            element: <Home />,
          },

          {
            element: <RequireAuth />,
            children: [
              {
                path: 'tracker',
                element: <Tracker />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
