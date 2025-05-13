import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import NotFound from "./Components/NotFound/NotFound";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./Components/ProtectedRoute/AuthProtectedRoute";
import { authContext } from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import Orders from "./Components/Orders/Orders";
import Address from "./Components/Address/Address";
import CartContextProvider from "./Context/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import SubCategories from "./Components/SubCategories/SubCategories";
import ForgetPassword from "./Components/Password/ForgetPassword/ForgetPassword";
import VerifyPassword from "./Components/Password/VerifyPassword/VerifyPassword";
import ResetPassword from "./Components/Password/ResetPassword/ResetPassword";

function App() {
  const queryClient = new QueryClient();

  const { setUserIsLoggedIn } = useContext(authContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "subcategories/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <SubCategories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <Orders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              {" "}
              <Address />{" "}
            </ProtectedRoute>
          ),
        },

        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <AuthProtectedRoute>
              <ForgetPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "verifyresetcode",
          element: (
            <AuthProtectedRoute>
              <VerifyPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <AuthProtectedRoute>
              <ResetPassword />
            </AuthProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUserIsLoggedIn(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </CartContextProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
