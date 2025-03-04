import { createBrowserRouter, 
  // Navigate, 
  RouterProvider } from 'react-router-dom';
import routesPath from '@/constants/routes';
import ErrorPage from '@/pages/ErrorPage';
import PageLayout from './layouts/PageLayout';
import AuthPage from './pages/auth/AuthPage';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/home';
// import { useGetMeQuery } from './services/auth';
// import LoadingPage from './pages/LoadingPage';
const {
  ROOT,
  AUTH
} = routesPath;

// const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
//   const token = localStorage.getItem('auth-token');

//   const { error, isLoading } = useGetMeQuery({});
  

//   if (isLoading) {
//     return <LoadingPage/>;
//   }
//   if (!token || (error && 'status' in error && error.status === 401)) {
//     localStorage.removeItem('auth-token');
//     return <Navigate to="/auth" replace />;
//   }
//   return children;
// };


const routes = createBrowserRouter([

  {
    path: ROOT,
    element: 
    // <PrivateRoute>
      <PageLayout/>
      // </PrivateRoute>
      ,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: AUTH,
    element: <AuthLayout/>,
    children: [
      { index: true, element: <AuthPage /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);


function App() {

  return (
    <RouterProvider router={routes} />
  )
}

export default App;
