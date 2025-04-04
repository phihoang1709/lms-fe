import { createBrowserRouter, 
  Navigate, 
  // Navigate, 
  RouterProvider, 
  useLocation} from 'react-router-dom';
import routesPath from '@/constants/routes';
import ErrorPage from '@/pages/ErrorPage';
import PageLayout from './layouts/PageLayout';
import AuthPage from './pages/auth';
import AuthLayout from './layouts/AuthLayout';
import HomePage from './pages/chat';
import LoadingPage from './pages/LoadingPage';
import { useRef } from 'react';
import { useGetMeQuery, useLazyGetMeQuery } from './services/auth';
import AuthCallback from './pages/auth/components/AuthCallback';
// import { useGetMeQuery } from './services/auth';
// import LoadingPage from './pages/LoadingPage';
const {
  ROOT,
  AUTH
} = routesPath;

const PrivateRoute = ({ children }: {children: React.ReactNode}) => {
  const token = localStorage.getItem('auth-token');

  const { error, isLoading } = useGetMeQuery({});
  
  if (isLoading) {
    return <LoadingPage/>;
  }
  if (!token || (error && 'status' in error && error.status === 401)) {
    localStorage.removeItem('auth-token');
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('auth-token');
  const location = useLocation();
  const [getMe, { isLoading, error }] = useLazyGetMeQuery();
  const isGetMeCalled = useRef(false);

  if (token && !isGetMeCalled.current) {
    getMe({});
    isGetMeCalled.current = true;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (location.pathname === '/auth/callback') {
    return children;
  }

  if (token && !(error && 'status' in error && error.status === 401)) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const routes = createBrowserRouter([

  {
    path: ROOT,
    element: 
    <PrivateRoute>
      <PageLayout/>
      </PrivateRoute>
      ,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: AUTH,
    element: <PublicRoute><AuthLayout/></PublicRoute>,
    children: [
      { index: true, element: <AuthPage /> },
      { path: "callback", element: <AuthCallback /> },
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
