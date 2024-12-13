import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
  <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
