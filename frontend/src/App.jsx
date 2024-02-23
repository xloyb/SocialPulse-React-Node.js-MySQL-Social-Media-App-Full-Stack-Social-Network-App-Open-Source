import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import './App.css';


// Pages
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';

// Components
import Navbar from './components/Navbar';
import Leftbar from './components/Leftbar';
import Rightbar from './components/Rightbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query';

function App() {


const { currentUser } = useContext(AuthContext);

const queryClient = new QueryClient()


  const Layout = () => {
    return (
      <div>
        <QueryClientProvider client={queryClient}>

        <Navbar />
        <div style={{ display: 'flex' }}>
         <div style={{flex:2}}>
         <Leftbar />
          </div> 
          <div style={{flex:6}}><Outlet /></div>
          
          <div style={{flex:2}} ><Rightbar /></div>
          
        </div>
        </QueryClientProvider>
      </div>
    );
  };

  console.log(currentUser)
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (currentUser===null) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: <ProtectedRoute>
        <Home />
      </ProtectedRoute>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
