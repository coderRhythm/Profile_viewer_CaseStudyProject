import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import AdminPage from './pages/AdminPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profile/:id',
        element: <ProfileDetailPage />,
      },
      {
        path: 'admin/new',
        element: <AdminPage />,
      },
      {
        path: 'admin/edit/:id',
        element: <AdminPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  );
}

export default App;
