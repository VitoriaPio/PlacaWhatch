import { RouterProvider } from 'react-router-dom';

import routes from './routes/index';

import { AuthProvider } from './context/auth-context';

export default function App() {
  return (

    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );

}
