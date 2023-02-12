import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./pages/Storefront";
import AddItem from "./pages/addItem/AddItem";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderForm from "./pages/orderForm/OrderForm";
import Confirmation from "./pages/confirmation/Confirmation";
import LogInForm from "./pages/Login";
import BakeryHome from "./pages/BakeryHome";

const user = window.localStorage.getItem("user");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orderform",
    element: <OrderForm />,
  },
  {
    path: "/addItem",
    element: <AddItem />,
  },

  {
    path: "/Confirmation",
    element: <Confirmation />,
  },
  { path: "/login", element: <LogInForm /> },

  {
    path: "/addItem",
    element: user === "customer" ? <AddItem /> : <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/bakery",
    element: <BakeryHome />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
