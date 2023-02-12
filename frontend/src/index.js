import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import AddItem from "./AddItem";
import Signup from "./Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderForm from "./orderForm";
import Confirmation from "./Confirmation";
// import { Navigate } from "react-router-dom";
import LogInForm from "./login";
import BakeryHome from "./BakeryHome";

// const storage = localStorage.getItem('user')
// console.log('this is storage', storage)
console.log("this is user from Index", window.localStorage.getItem("user"));
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
    // element: <AddItem />
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
