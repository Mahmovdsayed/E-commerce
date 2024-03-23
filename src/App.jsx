import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile/Profile";
import Wishlist from "./Components/Wishlist/Wishlist";
import Address from "./Components/Address/Address";
import AllOrdars from "./Components/AllOrdars/AllOrdars";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetUserPassword from "./Components/ResetUserPassword/ResetUserPassword";
import Err from "./Components/err/Err";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "Brands",
      //   element: (
      //     <ProtectedRoute>
      //       <Brands />
      //     </ProtectedRoute>
      //   ),
      // },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "reset-password", element: <ResetUserPassword /> },
      { path: "forget-password", element: <ForgetPassword /> },
      {
        path: "Productdetails/:productid",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "Address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrdars />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Err /> },
    ],
  },
]);

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
      <Toaster />
    </CartContextProvider>
  );
}

export default App;
