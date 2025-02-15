import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Write from './components/Write';
import SinglePost from './components/SinglePost';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Footer from './components/Footer';
import UserDtls from './components/UserDtls';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
// RootLayout Component
function RootLayout() {
  return (
    <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-40'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      
        path:'/',
        element: <HomePage/>,
      },
      {
      path: '/',
      element: <RootLayout />, 
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/write',
          element: <Write />,
        },
        {
          path: '/singlePost/:id',
          element: <SinglePost />,
        },
        {
          path:'/user',
          element: <UserDtls/>
        },
        {
          path:'/profile',
          element:<Profile/>
        }
      ],
    },

    {
      path: '/login',
      element: <Login/>,
    },
    {
      path:'/register',
      element: <Register/>,
    },
    {
      path:'/reset-password',
      element: <ResetPassword/>,
    }
  ]);


  return(
    <div>
    <ToastContainer />
         <RouterProvider router={router}>
           <Outlet />
         </RouterProvider>
    </div>
  )
}

export default App;
