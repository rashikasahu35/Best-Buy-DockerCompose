import {React, lazy, Suspense , useEffect} from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const  NavBar = lazy(() => import("./components/NavBar"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Search = lazy(() => import('./pages/Search'))
const Contact = lazy(() => import('./pages/Contact'))
const UserProfile = lazy(() => import("./pages/UserProfile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Cart = lazy(() => import("./pages/Cart"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
import ProtectedRoute from './components/Route/Protected'
import { useSelector, useDispatch } from "react-redux";
import {getUserDetailsAsync, CLEAR_USER} from './redux/User/UserSlice'
import {getCartItemsAsync} from './redux/Cart/CartSlice'

function App() {
  const dispatch = useDispatch()
  const { loading, userAuthenticated} = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUserDetailsAsync());
    dispatch(getCartItemsAsync());
  }, []);
  console.log("url",import.meta.env.VITE_APP_SERVER_URL)


  return (
    <>
    <Suspense fallback={<></>}>
      <Router>    
      <div className="app">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
                background: "#F5F2F2",
            },
            success: {  
              icon: "✅",
            },
            error: {
              icon: "❌",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<> <NavBar/><Home /> </>} />

          <Route path="/register" element={(!loading && !userAuthenticated)? <Register />:<Navigate to='/'/>} />
          <Route path="/login" element={(!loading && !userAuthenticated)? <Login />:<Navigate to='/'/>} />

          <Route path="/products" element={<> <NavBar/><ProductList /> </>} />
          <Route path="/product/:id" element={<> <NavBar/><ProductDetails /></>} />
          <Route path="/search" element={<> <NavBar/><Search /></>} />
          <Route path="/contact" element={<> <NavBar/><Contact /></>} />
    

          {/*---------------  Protected Routes ---------------- */}
          <Route path="/me" element={
            <ProtectedRoute><> <NavBar/><UserProfile /></></ProtectedRoute>
          }/>
          <Route path="/editProfile" element={ 
            <ProtectedRoute><> <NavBar/><EditProfile /></></ProtectedRoute>
          }/>
          <Route path="/cart" element={
            <ProtectedRoute><> <NavBar/><Cart /></></ProtectedRoute>
          }/>

          <Route path="*" element={<><NavBar/><PageNotFound /></>} />
        </Routes>
      </div>
    </Router>
    </Suspense>
    </>
  );
}

export default App;
