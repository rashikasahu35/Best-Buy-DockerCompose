import {React, lazy, Suspense , useEffect} from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const  NavBar = lazy(() => import("./components/NavBar"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Search = lazy(() => import('./pages/Search'))
const Contact = lazy(() => import('./pages/Contact'))
const UserProfile = lazy(() => import("./pages/UserProfile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderList = lazy(() => import("./pages/OrderList"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const Payment = lazy(() => import("./pages/Payment"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminProductList = lazy(() => import("./pages/Admin/Products/ProductList"))
const AdminProductCreate = lazy(() => import("./pages/Admin/Products/ProductCreate"))
const AdminProductManage = lazy(() => import("./pages/Admin/Products/ProductManage"))
const AdminUserList = lazy(() => import("./pages/Admin/Users/UserList"))
const AdminUserCreate = lazy(() => import("./pages/Admin/Users/UserCreate"))
const AdminUserManage = lazy(() => import("./pages/Admin/Users/UserManage"))
const AdminOrderList = lazy(() => import("./pages/Admin/Orders/OrderList"))
const AdminOrderManage = lazy(() => import("./pages/Admin/Orders/OrderManage"))
const AdminProductReviewList = lazy(() => import("./pages/Admin/ProductReview/ProductReviewList"))
const AdminProductReviewManage = lazy(() => import("./pages/Admin/ProductReview/ProductReviewManage"))
const AdminCartList = lazy(() => import("./pages/Admin/Cart/CartList"))
const AdminCartManage = lazy(() => import("./pages/Admin/Cart/CartManage"))
import ProtectedRoute from './components/Route/Protected'
import AdminProtectedRoute from './components/Route/AdminProtected'
import { useSelector, useDispatch } from "react-redux";
import {getUserDetailsAsync, CLEAR_USER} from './redux/User/UserSlice'
import {getCartItemsAsync} from './redux/Cart/CartSlice'
import Spinner from './components/Spinner';



function App() {
  const dispatch = useDispatch()
  const { loading, userAuthenticated} = useSelector((state) => state.user)

  useEffect(() => {
    getToken()
    dispatch(getUserDetailsAsync());
    dispatch(getCartItemsAsync());
  }, []);

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return;
    }
    else {
      const { expiry } = JSON.parse(tokenString);
      const currentTime = new Date().getTime();

      if (currentTime > expiry) {
        localStorage.removeItem('token'); // Remove expired token
        dispatch(CLEAR_USER())
      }
    }
  }

  if(loading) {
    return <Spinner/>
  }


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

          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />

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
          <Route path="/changePassword" element={
            <ProtectedRoute><><NavBar/><ChangePassword /></> </ProtectedRoute>} 
          />
          <Route path="/cart" element={
            <ProtectedRoute><> <NavBar/><Cart /></></ProtectedRoute>
          }/>
          <Route path="/checkout" element={
            <ProtectedRoute><> <NavBar/><Checkout /></></ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute><> <NavBar/><OrderList /></></ProtectedRoute>
          }/>
          <Route path="/order/:id" element={
            <ProtectedRoute><> <NavBar/><OrderDetails /></></ProtectedRoute>
          }/>
          <Route path="/order/success" element={
            <ProtectedRoute><> <NavBar/><OrderSuccessPage /></></ProtectedRoute>
          }/>
          <Route path="/payment" element={
            <ProtectedRoute><> <NavBar/><Payment /></></ProtectedRoute>
          }/>


          {/* ------------- ADMIN Routes ---------------- */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute><> <NavBar/><AdminDashboard /></></AdminProtectedRoute>
          }/>


          <Route path="/admin/products" element={
            <AdminProtectedRoute><> <NavBar/><AdminProductList /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/products/create" element={
            <AdminProtectedRoute><> <NavBar/><AdminProductCreate /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/products/manage/:id" element={
            <AdminProtectedRoute><> <NavBar/><AdminProductManage /></> </AdminProtectedRoute>
          }/>
          <Route path="/admin/users" element={
            <AdminProtectedRoute><> <NavBar/><AdminUserList /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/users/create" element={
            <AdminProtectedRoute><> <NavBar/><AdminUserCreate /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/users/manage/:id" element={
            <AdminProtectedRoute><> <NavBar/><AdminUserManage /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/orders" element={
            <AdminProtectedRoute><> <NavBar/><AdminOrderList /></></AdminProtectedRoute>
          }/>
          
          <Route path="/admin/orders/manage/:id" element={
            <AdminProtectedRoute><> <NavBar/><AdminOrderManage /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/productReview" element={
            <AdminProtectedRoute><> <NavBar/><AdminProductReviewList /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/productReview/manage/:id" element={
            <AdminProtectedRoute><> <NavBar/><AdminProductReviewManage /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/cart" element={
            <AdminProtectedRoute><> <NavBar/><AdminCartList /></></AdminProtectedRoute>
          }/>
          <Route path="/admin/cart/manage/:id" element={
            <AdminProtectedRoute><> <NavBar/><AdminCartManage /></></AdminProtectedRoute>
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
